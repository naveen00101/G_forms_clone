import React from "react";
import FormHeader from "../FormHeader";
import CenteredTabs from "../Tabs";
import QuestionForm from "../QuestionFrom";
// import withRouter from "react-router-dom"

function FormPage(){
    return(
        <div>
            <FormHeader/>
            <CenteredTabs/>
            {/* <QuestionForm /> */}
        </div>
    )
}

export default (FormPage)