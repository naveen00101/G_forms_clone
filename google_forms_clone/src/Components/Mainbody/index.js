import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import StorageIcon from '@material-ui/icons/Storage'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import FolderOperIcon from '@material-ui/icons/FolderOpen'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import recent_1 from '../../images/recent_1.png'
import { Link } from "react-router-dom";
import './index.css'
import axios from "axios";

class Mainbody extends Component {
    state = {
        files: []
    }

    componentDidMount() {
        this.filenames();
    }

    filenames = async () => {
        try {
            const response = await axios.get("http://localhost:9000/get_all_filenames");
            const filesDetails = response.data;
            const list = Object.values(filesDetails);
            this.setState({ files: list });
        } catch (error) {
            console.error("Error fetching filenames:", error);
        }
    }

    navigate_to(docName) {
        const navigate = this.props;
        var fname = docName.split(".");
        navigate("/form/" + fname[0]);
    }

    render() {
        const { files } = this.state;
        return (
            <div className="main-body">
                {/* ... rest of your code ... */}
                <div className="mainbody-docs">
                    {files.map(each => {
                        var fname = each.fileName.split(".");
                        const path = "/form/" + fname[0];
                        const obj = each.content ? JSON.parse(each.content) : {}; // Parse content if available
                        return (
                            <Link to={path} className="link-item" key={each.fileName}>
                                <div className="doc-card">
                                    <img src={obj.thumbnail} className="doc-img" alt="recent" />
                                    <div className="doc-card-con">
                                        <h5 style={{ overflow: "ellipsis" }}>{obj.document_name || "Untitled Doc"}</h5>
                                        <div className="doc-content" style={{ fontSize: "12px", color: "grey" }}>
                                            <div className="content-left">
                                                <StorageIcon className="docs-icon-1" />
                                            </div>
                                            <MoreVertIcon className="docs-icon-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Mainbody;
