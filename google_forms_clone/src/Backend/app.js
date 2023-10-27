const fs = require('fs');
const express = require('express');
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const path = require('path')

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '10mb'})); // Fix: Call bodyParser.json() as a function
app.use(cors());

const dbPath = path.join(__dirname, "./userData.db");
let db = null;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const initializeServerAndDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite.Database,
    });
    app.listen(9000, () => {
      console.log("Hey buddy , I am running on port 9000");
    });
  } catch (e) {
    console.log(`DB GOT AN ERROR${e.message}`);
    process.exit(1);
  }
};

initializeServerAndDB();

const secretKey = 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

app.post('/register', async (request, response) => {
  const { username, password } = request.body;

  const query = `SELECT * FROM user 
    WHERE username = '${username}';`;

  const checkUSER = await db.get(query);

  if (checkUSER === undefined) {
    if (password.length >= 5) {
      const hashedPass = await bcrypt.hash(password, 10);
      const registerQuery = `INSERT INTO user (username, password) VALUES ('${username}', '${hashedPass}')`;
      const result = await db.run(registerQuery);
console.log(result)
      // Generate and send JWT token upon successful registration
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      response.status(200);
      response.json({ message: 'User created successfully', token });
    } else {
      response.status(400);
      response.send('Password is too short');
    }
  } else {
    response.status(400);
    response.send('User already exists');
  }
});

app.post('/login', async (request, response) => {
  const { username, password } = request.body;
  const checkUSER = await db.get(
    `select * from user where username = '${username}'`
  );
  if (checkUSER === undefined) {
    response.status(400);
    response.send('Invalid user');
  } else {
    const checkPASS = await bcrypt.compare(password, checkUSER.password);
    if (checkPASS) {
      // Generate and send JWT token upon successful login
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      response.status(200);
      response.json({ message: 'Login success!', token });
    } else {
      response.status(400);
      response.send('Invalid password');
    }
  }
});

app.put('/change-password', verifyToken, async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  const checkUSER = await db.get(
    `select * from user where username = '${username}'`
  );

  const checkPass = await bcrypt.compare(oldPassword, checkUSER.password);
  if (checkPass) {
    if (newPassword.length >= 5) {
      const hashedPASS = await bcrypt.hash(newPassword, 10);
      const passChangeQuery = `UPDATE user SET password = '${hashedPASS}' WHERE username = '${username}';`;
      const result = await db.run(passChangeQuery);
      response.status(200);
      response.send('Password updated');
    } else {
      response.status(400);
      response.send('Password is too short');
    }
  } else {
    response.status(400);
    response.send('Invalid current password');
  }
});

app.post('/add_question/:doc_id', verifyToken,(req, res) => {
  const docs_data = req.body;
  const name = req.params.doc_id;
  console.log(docs_data);
  const data = JSON.stringify(docs_data);
  fs.writeFileSync(`files/${name}.json`, data);
  res.send('Question added successfully.'); // You should send a response here
});

app.post('/add_recent_File/:doc_id', verifyToken,(req, res) => {
  const docs_data = req.body;
  const name = req.params.doc_id;
  console.log(docs_data);
  const data = JSON.stringify(docs_data);
  fs.writeFileSync(`recentFiles/${name}.json`, data);
  res.send('recents added successfully.'); // You should send a response here
})

app.get('/data/:doc_id', verifyToken,(req, res) => {
  const docId = req.params.doc_id;
  fs.readFile(`files/${docId}.json`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading the file.');
      return;
    }
    const ques_data = JSON.parse(data);
    console.log(req.params.doc_id);
    res.send(ques_data);
  });
});



app.get("/get_all_filenames", verifyToken ,(req,res)=>{
    const directoryPath = path.join(__dirname, '/recentFiles')

    fs.readdir(directoryPath,function(err, files){
        if(err){
            return console.log('unable to scan directory:'+ err)
        }
        const fileData = [];
console.log("im in")
    
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return res.status(500).send(`Error reading file: ${file}`);
        }

        fileData.push({ fileName: file, content: data });

        // If all files have been read, send the response
        if (fileData.length === files.length) {
          res.send(fileData);
          // console.log({files: fileData})
        }
      });
    });

    })
})
