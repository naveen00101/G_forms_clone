{/* <div key={i}>
          <Accordion expanded={q.open} className={q.open ? "add-border" : ""}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1}
              style={{ width: "100%" }}
            >
              {!questions[i].open ? (
                <div className="saved-questions">
                  <Typography className="question-typo">
                    {i + 1}. {questions[i].questionText}
                  </Typography>
                  {q.options.map((op, j) => (
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
                  ))}
                </div>
              ) : (
                ""
              )}
            </AccordionSummary>
            <div className="question-boxes">
              <AccordionDetails className="add-question">
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
                    style={{ color: "#5f6368", fontSize: "13px" }}
                  >
                    <MenuItem
                      id="text"
                      value="text"
                      onClick={() => {
                        this.addQuestionType(i, "text");
                      }}
                    >
                      <SubjectIcon style={{ marginRight: "10px" }} /> Paragraph{" "}
                    </MenuItem>
                    <MenuItem
                      id="checkbox"
                      value="checkbox"
                      onClick={() => {
                        this.addQuestionType(i, "checkbox");
                      }}
                    >
                      <CheckBoxIcon
                        style={{ marginRight: "10px", color: "#70757a" }}
                        checked
                      />
                      Checkboxes{" "}
                    </MenuItem>
                    <MenuItem
                      id="radio"
                      value="radio"
                      onClick={() => {
                        this.addQuestionType(i, "radio");
                      }}
                    >
                      <Radio
                        style={{ marginRight: "10px", color: "#70757a" }}
                        checked
                      />{" "}
                      Multiple Choice
                    </MenuItem>
                  </Select>
                </div>
                {q.options.map((op, j) => (
                  <div className="add-question-body" key={j}>
                    {q.questionType !== "text" ? (
                      <input
                        type={q.questionType}
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      <ShortTextIcon style={{ marginRight: "10px" }} />
                    )}
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
                ))}

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
                      checked
                      onClick={() => {
                        this.requiredQuestion(i);
                      }}
                    />
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              </AccordionDetails>
              <div className="question-edit">
                <AddCircleOutlineIcon
                  onClick={this.addMoreQuestionField}
                  className="edit"
                />
                <OndemandVideoIcon className="edit" />
                <CropOriginalIcon className="edit" />
                <TextFieldsIcon className="edit" />
              </div>
            </div>
          </Accordion>
        </div> */}