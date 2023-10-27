import React from "react";
import { Component } from "react";
import { useParams } from "react-router-dom";
// import {
//   CropOriginal as CropOriginalIcon,
//   CheckBox as CheckBoxIcon,
//   ShortText as ShortTextIcon,
//   Subject as SubjectIcon,
//   MoreVert as MoreVertIcon,
//   FilterNone as FilterNoneIcon,
//   Close as CloseIcon,
//   AddCircleOutline as AddCircleOutlineIcon,
//   AddCircle as AddCircleIcon,
//   OndemandVideo as OndemandVideoIcon,
//   TextFields as TextFieldsIcon,
//   DragIndicator as DragIndicatorIcon,
//   RadioButtonChecked as RadioIcon
// } from "@material-ui/icons";
import {
//   Select,
//   Switch,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
  Button,
  // Radio,
  FormControlLabel,
  Typography,
//   MenuItem,
} from "@material-ui/core";

import axios from "axios"

import "./user_form.css";


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class QuestionForm extends Component {
  state = {
    
    
    questions: [
      {
        questionText: "which is the capital of TamilNadu",
        questionType: "radio",
        options: [
          { optionText: "Bengaluru" },
          { optionText: "Chennai" },
          { optionText: "Vijayawada" },
          { optionText: "Hyderabad" },
        ],
        paraText :'Enter the Answer',
        answer : false,
        answerKey : "",
        points:0,
        open: true,
        required: false,
        enteredAnswer : '',
      },
    ],
    
    documentName : 'Untitled Document',
    description : 'Add Description',
  };

componentDidMount(){
  this.getData()
}

  getData = async ()=>{
    
    const {params} = this.props
    const {id} = params
    const url = `http://localhost:9000/data/${id}`
    const options = {
      method : `GET`,
    }
    
    try {
      const response = await axios(url,options)
      const {data} = response
      console.log(data)
      this.setState({
        questions : data.questions,
        documentName : data.document_name,
        description : data.doc_desc
      })
    } catch (e) {
      console.log(e)
    }
  }

  setDocName = event =>{
    this.setState({documentName : event.target.value})
  }

  setDesCon = event =>{
    this.setState({description : event.target.value})
  }

  changeQuestion = (text, i) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = questions.map((each, z) =>
        z === i ? { ...each, questionText: text } : each
      );
      return { questions: list };
    });
  };

  enteredAnswer = (e, i) =>{
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = questions.map((each, z) =>
        z === i ? { ...each, enteredAnswer: e } : each
      );
      return { questions: list };
    });
  }

  addQuestionType = (i, type) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = questions.map((each, z) =>
        z === i ? { ...each, questionType: type } : each
      );
      return { questions: list };
    });
  };

  changeOptionValue = (text, i, j) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = questions.map((each, z) => {
        if (z === i) {
          var opList = each.options.map((eo, y) =>
            y === j ? { ...eo, optionText: text } : eo
          );
          return { ...each, options: opList };
        }
        return each;
      });
      return { questions: list };
    });
  };

  removeOption = (i, j) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var newQuestion = [...questions];
      if (newQuestion[i].options.length > 1) {
        newQuestion[i].options.splice(j, 1);
      }
      return newQuestion;
    });
  };

  addOption = (i) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var newQuestion = [...questions];
      if (newQuestion[i].options.length < 5) {
        newQuestion[i].options.push({
          optionText: "option" + (newQuestion[i].options.length + 1),
        });
      } else {
        console.log("max 5 options");
      }
      return newQuestion;
    });
  };

  copyQuestion = (i) => {
    this.expandCloseAll()
    this.setState((prevState) => {
      const { questions } = prevState;
      var newQuestion = questions[i];
      return { questions: [...questions, newQuestion] };
    });
  };

  deleteQuestion = (i) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var list =
        questions.length > 1
          ? questions.filter((each, z) => z !== i)
          : questions;
      return { questions: list };
    });
  };

  requiredQuestion = (i) => {
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = questions.map((each, z) =>( z === i ? { ...each, required: !each.required } : each));
      return { questions: list };
    });
  };

  addMoreQuestionField = () => {
    
    this.expandCloseAll()
    this.setState((prevState) => {
      const { questions } = prevState;
      var list = [
        ...questions,
        {
          questionText: "Question",
          questionType: "radio",
          options: [{ optionText: "Option 1" }],
          answer : false,
        answerKey : "",
        points:0,
          open: true,
          required: false,
          enteredAnswer : '',
        },
      ];
      return { questions: list };
    });
  };

  onDragEnd = (result) =>{
    if(!result.destination){
        return
    }
    this.setState(prevState =>{
        const {questions} = prevState
        var list = [...questions]
        const newOrderedList = this.reorder(list, result.source.index, result.destination.index)
        return ({questions : newOrderedList})
    })
  }

  reorder = (list , startIndex, endIndex) =>{
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex,0,removed)
    return result
  }

  expandCloseAll =()=>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map(each => ({...each, open : false}))
      return ({questions : updatedList})
    })
  }

  handleExpand = (i) =>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map((each , j )=> ( i=== j ? ({...each , open : true}) : ({...each, open : false}) ))
      return ({questions : updatedList})
    })
  }

  setOptionAnswer = (a ,q)=>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map((each , z ) => (q === z ? ({...each, answerKey : a}) : each) )
      return({questions : updatedList})
    })
  }

  doneAnswer = (i) =>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map((each , z ) => (i === z ? ({...each, answer : !each.answer}) : each) )
      return({questions : updatedList})
    })
  }

  addAnswer = (i) =>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map((each , z ) => (i === z ? ({...each, answer : !each.answer}) : each) )
      return({questions : updatedList})
    })
  }

  setOptionPoints = (p,q) =>{
    this.setState(prevState=>{
      const {questions} = prevState
      const updatedList = questions.map((each , z ) => (q === z ? ({...each, points : p}) : each) )
      return({questions : updatedList})
    })
  }

  clearText = (i) =>{
    this.setState({paraText : ''})
  }

  changeParaText = (e, i) =>{
    this.setState({paraText : e})
  }

  

  questionsUi = () => {
    const { questions } = this.state;
    return questions.map((q, i) => 
    (<div className="saved-questions">
    <Typography className="question-typo">
      <p className="c-q">{i + 1}. {questions[i].questionText}</p>
    </Typography>
    {q.questionType === "text"? (
      <div style={{ display: "flex" }}> 
          <FormControlLabel
            style={{ marginLeft: "5px", marginBottom: "5px" }}
            
            control={
              <input
                type="Text"
                color="primary"
                style={{ marginRight: "3px" }}
                className="ans-text-con"
                value={q.enteredAnswer}
                placeholder="Enter the answer"
                onChange={(e)=>{this.enteredAnswer(e.target.value , i)}}
              />
            }
            // label={
            //   <Typography
            //     style={{
            //       fontFamily: "Roboto,Arial,Sans-serif",
            //       fontSize: "15px",
            //       fontWeight: "400",
            //       letterSpacing: ".2px",
            //       lineHeight: "20px",
            //       color: "#202124",
            //     }}
            //   >
            //     {q.paraText}
            //   </Typography>
            // }
          />
        </div>
    ) : 
      q.options.map((op, j) => (
      <div key={j}>
        <div style={{ display: "flex" , alignItems:'center'}}>
          <FormControlLabel
            style={{ marginLeft: "5px", marginBottom: "5px" }}
            // disabled
            control={
              <input
                type={q.questionType}
                color="primary"
                name={`q${i}`}
                id={j}
                onChange={(e)=>{this.enteredAnswer(e.target.value,i)}}
                style={{ marginRight: "10px",marginBottom:"5px", }}
                required={q.type}
              />
            }
            label={
              <Typography
                style={{
                  fontFamily: "Roboto,Arial,Sans-serif",
                  fontSize: "15x",
                  fontWeight: "500",
                  letterSpacing: ".2px",
                  lineHeight: "20px",
                  marginBottom:"5px",
                  color: "#202124",
                }}
              >
                {q.options[j].optionText}
              </Typography>
            }
          />
        </div>
      </div>
    ))
    }
  </div>)  );
  }

  
  commitToDB =async () =>{
    const {id} = this.props.params
    console.log("im in")
    const {questions , documentName, description} = this.state
    const response = await axios.post(`http://localhost:9000/add_question/${id}`,{
      "document_name" : documentName,
      "doc_desc" : description,
      "questions" : questions
    })
    console.log(response)
  }


  render(){

    const {documentName, description} = this.state
    return (
      <div className="question-form">
        <br />
        <div className="sec">
          <div className="question-title-sec">
            <div className="question-form-top">
              <h1 className="question-form-top-name">{documentName}</h1>
              <h4 className="question-form-top-desc">{description}</h4>
            </div>
          </div>
          {this.questionsUi()}
          <div className="save_form">
            <Button variant="contained" color="primary" onClick={this.commitToDB} style={{fontSize:'14px'}}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(QuestionForm)
