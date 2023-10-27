import {BrowserRouter , Routes, Route} from 'react-router-dom'

import './App.css';
import Home from './Components/Home';
import FormPage from './Components/FormPage';
import Userform from './Components/UserForm/Userform';
import Login from './Components/LoginForm';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/form/:id' Component={FormPage} />
        <Route path='/' Component={Home} />
        <Route path="/form/fill/:id" Component={Userform} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
