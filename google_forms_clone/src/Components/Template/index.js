import React from "react"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton } from "@material-ui/core"
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore"
import uuid from 'react-uuid'
import {useNavigate} from 'react-router-dom/'
import './index.css'

import blank from '../../images/forms-blank-googlecolors.png'
import party from '../../images/party_invite.png'
import contact from '../../images/contact_info.png'


function Template() {
    const navigate = useNavigate()

    const createForm = () =>{
        console.log("im in!")
        const id = uuid()
        console.log(id)
        navigate("form/"+id)
    }

    return(
        <div className="template-section">
            <div className="template-top">
                <div className="template-left">
                    <span style={{fontSize:"16px",color:"#202124"}}>Start New Form</span>
                </div>
                <div className="template-right">
                    <div className="gallery-button">
                        Template gallery
                        <UnfoldMoreIcon/>
                    </div>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="template-body">
                <div className="card" onClick={createForm}>
                    <img src={blank} alt="blank" className="card-img"/>
                    <p className="card-title">Blank</p>
                </div>
                <div className="card">
                    <img src={party} alt="blank" className="card-img"/>
                    <p className="card-title">Party Invitation</p>
                </div>
                <div className="card">
                    <img src={contact} alt="blank" className="card-img"/>
                    <p className="card-title">Contact Information</p>
                </div>
            </div>
        </div>
    )
}

export default Template