import React from 'react'; 
import formService from '../../services/formService';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Define styled component for table
const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

// Dummy data function remains the same
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// Sample rows remain the same
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ResponseTab(props) {
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    // Update state with provided formData
    if (props.formData) {
      setQuestions(props.formData.questions);
      setFormData(props.formData);
    }

    const formId = props.formId;
    if (formId) {
      formService.getResponse(formId)
        .then((data) => {
          setResponseData(data);
        })
        .catch((error) => {
          const resMessage = error.response?.data?.message || error.message || error.toString();
          console.error(resMessage);
        });
    }
  }, [props.formId, props.formData]);

  function getSelectedOption(qId, i, j) {
    const oneResData = responseData[j];
    const selectedOp = oneResData.response.find((qss) => qss.questionId === qId);
    
    if (selectedOp) {
      const finalOption = questions[i].options.find((oo) => oo._id === selectedOp.optionId);
      return finalOption.optionText;
    } else {
      return "Not attempted";
    }
  }

  return (
    <div>
      <p>Responses</p>
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              {questions.map((ques, i) => (
                <TableCell key={i} align="right">{ques.questionText}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.map((rs, j) => (
              <TableRow key={j}>
                <TableCell component="th" scope="row">
                  {rs.userId}
                </TableCell>
                {questions.map((ques, i) => (
                  <TableCell key={i} align="right">{getSelectedOption(ques._id, i, j)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
}

export default ResponseTab;
