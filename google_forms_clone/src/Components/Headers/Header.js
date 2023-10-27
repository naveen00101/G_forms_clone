import React from "react"
import {IconButton} from '@material-ui/core'
import form from '../../images/forms.png'
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from "@material-ui/icons/Apps"
import Avatar from "@material-ui/core/Avatar"
import AvatarImg from "../../images/profile_img.jpg"
import "./Headers.css"
import TemporaryDrawer from "../TemoporaryDrawer"

function Header() {
    return(
        <div className="header-con">
            <div className="header-info">
                <TemporaryDrawer />
                <img src={form} style={{height:'40px', width:'40px'}} alt="forms logo" className="form-logo"/>
                <div className="info">
                    Forms
                </div>
            </div>
            <div className="header-search">
            <IconButton><SearchIcon /></IconButton>
            <input type="text" name="search" placeholder="Search"/>
            </div>
            <div className="header-right">
            <IconButton>
            <AppsIcon />
            </IconButton>
            <IconButton>
                <Avatar src={AvatarImg} alt="profile picture"/>
            </IconButton>
            </div>
        </div>
    )
}

export default Header