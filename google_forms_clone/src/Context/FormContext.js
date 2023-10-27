import React from 'react'

const FormContext = React.createContext({
  questions: [{
          questionText: "Question",
          questionType: "radio",
          options: [{ optionText: "Option 1" }],
          answer : false,
          answerKey : "",
          points:0,
          open: true,
          required: false,
           },],
  addQuestions: () => {},
})

export default FormContext