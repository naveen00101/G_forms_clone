import React from 'react'
import formImg from "../../images/forms.png";
import {FiStar, FiSettings} from "react-icons/fi"
import {AiOutlineEye} from "react-icons/ai"
import {IconButton} from '@material-ui/core'
import avatarImg from "../../images/profile_img.jpg"
import {IoMdFolderOpen} from "react-icons/io"
import ColorLensIcon from "@material-ui/icons/ColorLens"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Button from '@material-ui/core/Button'
import Avatar from "@material-ui/core/Avatar"


import './index.css'
import { Link, useParams } from 'react-router-dom';

function FormHeader(){
const {id} = useParams()
    return(
        <div className='form-header'>
            <div className='form-header-left'>
                <Link to={'/'}  className='link-item'>
                <img src={formImg} className='form-logo' alt='forms-logo'/>
                </Link>
                <input type="text" placeholder='Untitled form' className='form-name'  />
                <IoMdFolderOpen className='form-header-icon' />
                <FiStar className='form-header-icon' />
                <span style={{fontSize:"12px",fontWeight:"600"}}>All Changes saved in Drive</span>
            </div>
            <div className='form-header-right'>
                <IconButton>
                    <ColorLensIcon size="small" className="form-header-icon"/>
                </IconButton>
                <Link to={`/form/fill/${id}`} target='_blank' className='link-item'>
                <IconButton>
                    <AiOutlineEye className='form-header-icon'/>
                </IconButton>
                </Link>
                <IconButton>
                    <FiSettings className='form-header-icon'/>
                </IconButton>
                <Button variant='contained' color='primary' href='#contained-buttons'>Send</Button>
                <IconButton>
                    <MoreVertIcon className='form-header-icon'/>
                </IconButton>
                <IconButton>
                    <Avatar style={{height:"30px",width:"30px"}} src={avatarImg}/>
                </IconButton>
            </div>
        </div>
    )
}

export default FormHeader