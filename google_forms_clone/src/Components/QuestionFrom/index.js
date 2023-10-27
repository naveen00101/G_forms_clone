import React from "react";
import { Component } from "react";
import { useParams } from "react-router-dom";
import {
  CropOriginal as CropOriginalIcon,
  CheckBox as CheckBoxIcon,
  ShortText as ShortTextIcon,
  Subject as SubjectIcon,
  MoreVert as MoreVertIcon,
  FilterNone as FilterNoneIcon,
  Close as CloseIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  AddCircle as AddCircleIcon,
  OndemandVideo as OndemandVideoIcon,
  TextFields as TextFieldsIcon,
  DragIndicator as DragIndicatorIcon,
  RadioButtonChecked as RadioIcon
} from "@material-ui/icons";
import {
  Select,
  Switch,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  // Radio,
  FormControlLabel,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { BsTrash, BsFileText } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios"
import html2canvas from 'html2canvas';
import "./index.css";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class QuestionForm extends Component {
  state = {
    
    
    questions: [
      {
        questionText: "Question",
        questionType: "radio",
        options: [
          { optionText: "Bengaluru" },
        ],
        answer : false,
        answerKey : "",
        enteredAnswer :'',
        points:0,
        open: true,
        required: false,
      },
    ],
     
    documentName : 'Untitled Document',
    description : 'Add Description',
    thumbnail : '',
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

  getThumbnail = async ()=>{
    try {
      const input = document.getElementById("question-form");
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const cropOptions = {
      // width:screenWidth,
      // height: screenHeight,
      scale : 5,
    }
    const canvas = await html2canvas(input, cropOptions)
    const thumbnail = canvas.toDataURL("image/png")
    console.log(thumbnail)
    this.setState({thumbnail:thumbnail},this.commitToDB)
    } catch (error) {
      console.log(error)
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


  questionsUi = () => {
    const { questions } = this.state;
    return questions.map((q, i) => {
      // console.log(questions)
      return (
        <Draggable key={i} draggableId={i+'id'} index={i}>
            {(provided, snapshot) =>(
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <div>
                        <div style={{marginBottom : '0px'}} >
                            <div style={{width : '100%' , marginBottom : '0px'}}>
                                <DragIndicatorIcon style={{transform : 'rotate(-90deg)', color:'#dae0e2', position:'relative', left:'300px'}} fontSize="small"/>
                            </div>
                            <div key={i}>
          <Accordion expanded={q.open} onChange={()=>{this.handleExpand(i)}} className={q.open ? "add-border" : ""}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1}
              style={{ width: "100%"}}
            >
              {!questions[i].open ? (
                <div className="saved-questions">
                  <Typography className="question-typo">
                    <p className="c-q">{i + 1}. {questions[i].questionText}</p>
                  </Typography>
                  {q.questionType === "text"? (
                    <div style={{ display: "flex" }}> 
                        <FormControlLabel
                          style={{ marginLeft: "5px", marginBottom: "5px" }}
                          disabled
                          control={
                            <input
                              type="Text"
                              color="primary"
                              style={{ marginRight: "3px" }}
                              className="ans-text-con"
                            />
                          }
                          label={
                            <Typography
                              style={{
                                fontFamily: "Roboto,Arial,Sans-serif",
                                fontSize: "15px",
                                fontWeight: "400",
                                letterSpacing: ".2px",
                                lineHeight: "20px",
                                color: "#202124",
                              }}
                            >
                              
                            </Typography>
                          }
                        />
                      </div>
                  ) : 
                    q.options.map((op, j) => (
                    <div key={j}>
                      <div style={{ display: "flex" }}>
                        <FormControlLabel
                          style={{ marginLeft: "5px", marginBottom: "5px" }}
                          disabled
                          control={
                            <input
                              type={q.questionType}
                              color="primary"
                              style={{ marginRight: "3px" }}
                              required={q.type}
                            />
                          }
                          label={
                            <Typography
                              style={{
                                fontFamily: "Roboto,Arial,Sans-serif",
                                fontSize: "13px",
                                fontWeight: "400",
                                letterSpacing: ".2px",
                                lineHeight: "20px",
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
                </div>
              ) : (
                ""
              )}
            </AccordionSummary>
            <div className="question-boxes">
        { !q.answer ? (<AccordionDetails className="add-question">
                <div className="add-question-top">
                  <input
                    type="text"
                    className="question"
                    placeholder="question"
                    value={q.questionText}
                    onChange={(e) => {
                      this.changeQuestion(e.target.value, i);
                    }}
                  />
                  <CropOriginalIcon style={{ color: "#5f6368" }} />
                  <Select
                    className="select"
                    style={{ color: "#5f6368", fontSize: "14px" }}
                    defaultValue={"radio"}
                                      >
                    <MenuItem
                      id="text"
                      value="text"
                      onClick={() => {
                        this.addQuestionType(i, "text");
                      }}
                    >
                    <div className="type-opt">
                      <SubjectIcon style={{ marginRight: "10px" }} /> Paragraph{" "}
                      </div>
                    </MenuItem>
                    <MenuItem
                      id="checkbox"
                      value="checkbox"
                      onClick={() => {
                        this.addQuestionType(i, "checkbox");
                      }}
                    >
                    <div className="type-opt">
                    <CheckBoxIcon
                        style={{ marginRight: "10px", color: "#70757a" }}
                        checked
                      />
                      Checkboxes
                      </div>
                      
                    </MenuItem>
                    <MenuItem
                      id="radio"
                      value="radio"
                      onClick={() => {
                        this.addQuestionType(i, "radio");
                      }}
                    >
                    <div className="type-opt">
                    <RadioIcon
                        style={{ marginRight: "10px", marginLeft:"0px", color: "#70757a" }}
                        checked
                      />{" "}
                      Multiple Choice
                      </div>
                      
                    </MenuItem>
                  </Select>
                </div>
                
                {q.questionType === "text" ? (
                  
                  <div className="add-question-body" >
                  <ShortTextIcon style={{ marginRight: "10px" }} />     
                    
                    <div>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="option"
                        // value={q.paraText}
                        // onChange={(e) => {
                        //   this.changeParaText(e.target.value, i);
                        // }}
                      />
                    </div>

                    <CropOriginalIcon style={{ color: "#5f6368" }} />

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        this.clearText(i);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                      ) : 
                   
                      q.options.map((op, j) =>  (
                  <div className="add-question-body" key={j}>
                  <input
                        type={q.questionType}
                        style={{ marginRight: "10px" }}
                      />
                    
                    <div>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="option"
                        value={q.options[j].optionText}
                        onChange={(e) => {
                          this.changeOptionValue(e.target.value, i, j);
                        }}
                      />
                    </div>

                    <CropOriginalIcon style={{ color: "#5f6368" }} />

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        this.removeOption(i, j);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))
                      }

                

                {q.options.length < 5 ? (
                  <div className="add-question-body">
                    <FormControlLabel
                      disabled
                      control={
                        q.questionType !== "text" ? (
                          <input
                            type={q.questionType}
                            color="primary"
                            inputprops={{ "arial-label": "Secondary checkbox" }}
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                            disabled
                          />
                        ) : (
                          <ShortTextIcon style={{ marginRight: "10px" }} />
                        )
                      }
                      label={
                        <div>
                          <input
                            type="text"
                            className="text-input"
                            style={{ fontSize: "13px", width: "60px" }}
                            placeholder="Add other"
                          />
                          <Button
                            size="small"
                            style={{
                              textTransform: "none",
                              color: "#4285f4",
                              fontSize: "13px",
                              fontWeight: "600",
                            }}
                            onClick={() => {
                              this.addOption(i);
                            }}
                          >
                            Add option
                          </Button>
                        </div>
                      }
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="add-footer">
                  <div className="add-question-bottom-left">
                    <Button
                      size="small"
                      style={{
                        textTransform: "none",
                        color: "#4285f4",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                      onClick={()=>{this.addAnswer(i)}}
                    >
                      <FcRightUp
                        style={{
                          border: "2px solid #4285f4",
                          padding: "2px",
                          marginRight: "8px",
                        }}
                      />{" "}
                      Answer key
                    </Button>
                  </div>

                  <div className="add-question-bottom">
                    <IconButton
                      aria-label="copy"
                      onClick={() => {
                        this.copyQuestion(i);
                      }}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        this.deleteQuestion(i);
                      }}
                    >
                      <BsTrash />
                    </IconButton>
                    <span style={{ color: "#5f6368", fontSize: "13px" }}>
                      Required{" "}
                    </span>{" "}
                    <Switch
                      name="checkedA"
                      color="primary"
                      checked = {questions[i].required}
                      onClick={() => {
                        this.requiredQuestion(i);
                      }}
                    />
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              </AccordionDetails> ) : (<AccordionDetails className="add-question">
                <div className="top-header">
                  Choose Correct Answer
                </div>
                <div>
                  <div className="add-question-top">
                    <input type="text" className="question" placeholder="question" value={q.questionText} disabled />
                    <input type="number" className="points" placeholder="0" min={0} step={1} max={5} onChange={(e)=>{this.setOptionPoints(e.target.value, i)}} />

                  </div>
                  {q.options.map((op, j) => (
                    <div className="add-question-body" key={j} style={{marginLeft:"8px", marginBottom:"10px", marginTop:"5px"}}>
                        <div key={j}>
                          <div style={{display:'flex'}} className="">
                            <div className="form-check">
                              <label style={{fontSize:'13px'}} onClick={()=>{this.setOptionAnswer(q.options[j].optionText, i)}} >
                              {(q.questionType !=="text") ? <input type={q.questionType} name={q.questionText} value="option3" className="form-check-input" required={q.required} style={{marginRight: "10px", marginBottom: "10px", marginTop:"10px"}}/> : <ShortTextIcon style={{marginRight:"10px"}}/>}

                              {q.options[j].optionText}
                              
                              </label>
                              
                            </div>
                          </div>
                        </div>
                    </div>
                  ))}
                  <div className="add-question-body">
                    <Button size="small" style={{textTransform : 'none', color:'#4285f4', fontSize:'13px', fontWeight:'600'}} >
                      <BsFileText style={{fontSize:'20px', marginRight:'8px'}} /> Add Answer Feedback
                    </Button>
                    <div className="add-question-bottom">
                      <Button variant="outlined" color="primary" style={{textTransform : 'none', color : '#4285f4', fontSize:'12px', marginTop:'12px', fontWeight:'600'}} onClick={ ()=>{this.doneAnswer(i)}}>
                      Done
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionDetails>)}
                
              {!q.answer ? (<div className="question-edit">
                <AddCircleOutlineIcon
                  onClick={this.addMoreQuestionField}
                  className="edit"
                />
                <OndemandVideoIcon className="edit" />
                <CropOriginalIcon className="edit" />
                <TextFieldsIcon className="edit" />
              </div>) : ""}
            </div>
          </Accordion>
        </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
      );
    });
  }

  
  commitToDB =async () =>{
    const {id} = this.props.params
    console.log("im in")
    const {questions , documentName, description, thumbnail} = this.state
    const response = await axios.post(`http://localhost:9000/add_question/${id}`,{
      "document_name" : documentName,
      "doc_desc" : description,
      "questions" : questions,
    })
    const response2 = await axios.post(`http://localhost:9000/add_recent_File/${id}`,{
      "document_name" : documentName,
      "thumbnail" : thumbnail,
    })
    console.log(response)
    console.log(response2)
  }


  render(){

    const {documentName, description} = this.state
    return (
      <div className="question-form" id="question-form">
        <br />
        <div className="sec">
          <div className="question-title-sec">
            <div className="question-form-top">
              <input
                type="text"
                className="question-form-top-name"
                placeholder="Untitled document"
                value={documentName}
                onChange={this.setDocName}
              />
              <input
                type="text"
                className="question-form-top-desc"
                placeholder="Form Description"
                value={description}
                onChange={this.setDesCon}
              />
            </div>
          </div>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.questionsUi()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="save_form">
            <Button variant="contained" color="primary" onClick={async()=>{
               this.getThumbnail()
              
              }} style={{fontSize:'14px'}}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(QuestionForm)
