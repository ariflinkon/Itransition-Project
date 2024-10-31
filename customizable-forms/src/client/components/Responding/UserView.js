import React from 'react';
import { Grid, Paper, Typography, AppBar, Toolbar, Button, IconButton, RadioGroup, Divider, FormControlLabel, Radio } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import formService from '../../services/formService';
import auth from '../../services/authService';

const StyledAppBar = styled(AppBar)`
  background-color: teal;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 20px 0;
  padding: 20px;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

function UserView(props) {
  const [userId, setUserId] = React.useState('');
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (auth.isAuthenticated()) {
      const userr = auth.getCurrentUser();
      setUserId(userr.id);
    } else {
      const anonymousUserId =
        'anonymous' +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setUserId(anonymousUserId);
    }
  }, []);

  const handleRadioChange = (j, i) => {
    const questionId = questions[i]._id;
    const optionId = questions[i].options[j]._id;

    const data = {
      questionId,
      optionId,
    };

    setValue(j);

    const fakeRData = [...responseData];
    const indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }
  };

  React.useEffect(() => {
    const formId = props.match.params.formId;

    formService.getForm(formId).then(
      (data) => {
        setFormData(data);
        setQuestions(data.questions);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }, [props.match.params.formId]);

  function submitResponse() {
    const submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };

    formService.submitResponse(submissionData).then(
      (data2) => {
        setIsSubmitted(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Velocity Forms</Typography>
        </StyledToolbar>
      </StyledAppBar>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} sm={5} style={{ width: '100%' }}>
          <StyledPaper elevation={2}>
            <Typography variant="h4" style={{ marginBottom: '15px' }}>
              {formData.name}
            </Typography>
            <Typography variant="subtitle1">{formData.description}</Typography>
          </StyledPaper>

          {!isSubmitted ? (
            <div>
              <Grid>
                {questions.map((ques, i) => (
                  <div key={i}>
                    <StyledPaper>
                      <Typography variant="subtitle1">
                        {i + 1}. {ques.questionText}
                      </Typography>

                      {ques.questionImage && (
                        <img src={ques.questionImage} width="80%" height="auto" />
                      )}

                      <RadioGroup
                        aria-label="quiz"
                        name="quiz"
                        value={value}
                        onChange={(e) => {
                          handleRadioChange(e.target.value, i);
                        }}
                      >
                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <StyledFormControlLabel
                              value={j}
                              control={<Radio />}
                              label={op.optionText}
                            />
                            {op.optionImage && (
                              <img src={op.optionImage} width="64%" height="auto" />
                            )}
                            <Divider />
                          </div>
                        ))}
                      </RadioGroup>
                    </StyledPaper>
                  </div>
                ))}
              </Grid>
              <StyledButton variant="contained" color="primary" onClick={submitResponse}>
                Submit
              </StyledButton>
            </div>
          ) : (
            <div>
              <Typography variant="body1">Form submitted</Typography>
              <Typography variant="body2">Thanks for submitting the form</Typography>
              <Button onClick={reloadForAnotherResponse}>Submit another response</Button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserView;