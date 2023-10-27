import React from "react";
import { Component } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer, IconButton, ListItemText } from "@material-ui/core";
import { List, ListItem, Divider } from "@material-ui/core/";

import formImage from "../../images/Google_Forms.png";
import docsImage from "../../images/Google_Docs.png";
import sheetsImage from "../../images/Google_Sheets.png";
import slidesImage from "../../images/Google_Slides.png";
import driveImage from "../../images/Google_Drive.png";

import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";

import "./index.css";

class TemporaryDrawer extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (anchor, open) => (event) => {
    this.setState({ [anchor]: open });
  };

  render() {
    const { left } = this.state;
    return (
      <div>
        <React.Fragment>
          <IconButton onClick={this.toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            open={left}
            onClose={this.toggleDrawer("left", false)}
            anchor={"left"}
          >
            <div
              style={{ width: "250px", marginTop: "30px" }}
              role="presentation"
            >
              <List>
                <ListItem>
                  <ListItemText style={{ fontSize: "48px", marginLeft: "5px" }}>
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      G
                    </span>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "500",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      o
                    </span>
                    <span
                      style={{
                        color: "yellow",
                        fontWeight: "500",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      o
                    </span>
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "500",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      g
                    </span>
                    <span
                      style={{
                        color: "green",
                        fontWeight: "500",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      l
                    </span>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "500",
                        fontSize: "22px",
                        marginRight: "10px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      e
                    </span>
                    <span
                      style={{
                        color: "#5f6368",
                        fontWeight: "500",
                        fontSize: "22px",
                        fontFamily: "'product sans',Arial,sans-serif",
                      }}
                    >
                      Docs
                    </span>
                  </ListItemText>
                </ListItem>
              </List>
            </div>

            <Divider />

            <div>
              <List
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "15px",
                }}
              >
                <ListItem className="list-item">
                  <img
                    src={docsImage}
                    style={{ height: "30px", width: "20px" }}
                    alt="docs"
                  />
                  <div className="side-bar-option-text">Docs</div>
                </ListItem>
                <ListItem className="list-item">
                  <img
                    src={sheetsImage}
                    style={{ height: "30px", width: "20px" }}
                    alt="Sheets"
                  />
                  <div className="side-bar-option-text">Sheets</div>
                </ListItem>
                <ListItem className="list-item">
                  <img
                    src={slidesImage}
                    style={{ height: "30px", width: "20px" }}
                    alt="Slides"
                  />
                  <div className="side-bar-option-text">Slides</div>
                </ListItem>
                <ListItem className="list-item">
                  <img
                    src={formImage}
                    style={{ height: "30px", width: "20px" }}
                    alt="forms"
                  />
                  <div className="side-bar-option-text">Forms</div>
                </ListItem>
              </List>
            </div>
            <Divider />
            <div>
              <List
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "15px",
                }}
              >
                <ListItem className="list-item">
                  <FiSettings style={{ height: "20px", width: "20px" }} />
                  <div className="side-bar-option-text">Settings</div>
                </ListItem>

                <ListItem className="list-item">
                  <BsQuestionCircle style={{ height: "20px", width: "20px" }} />
                  <div className="side-bar-option-text">Help & Feedback</div>
                </ListItem>
              </List>
            </div>
            <Divider />
            <div>
              <List
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "15px",
                }}
              >
                <ListItem className="list-item">
                  <img
                    src={driveImage}
                    style={{ height: "30px", width: "30px" }}
                    alt="forms"
                  />
                  <div className="side-bar-option-text">Drive</div>
                </ListItem>
              </List>
            </div>

            <Divider />
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default TemporaryDrawer;
