import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { 
  Grid, Paper, Typography, Tabs, Tab, Box, AppBar, Toolbar, Button, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Snackbar, IconButton 
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useParams } from 'react-router-dom'; 

import QuestionsTab from './QuestionsTab';
import ResponseTab from '../Response/ResponseTab';
import formService from '../../services/formService';
import auth from '../../services/authService';

// Styled components
const Root = styled('div')({
  flexGrow: 1,
});

const ToolbarContent = styled(Toolbar)(({ theme }) => ({
  minHeight: 128,
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
}));

const Title = styled(Typography)({
  flexGrow: 1,
  alignSelf: 'flex-end',
  justifySelf: 'center',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

function EditForm() {
  const { formId } = useParams();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [formID, setFormID] = React.useState("");
  const [formDetails, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  React.useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  React.useEffect(() => {
    if (formId) {
      setFormID(formId);
      formService.getForm(formId)
        .then((data) => {
          setFormDetails(data);
        })
        .catch((error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        });
    }
  }, [formId]);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + "/s/" + formDetails._id);
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenOfAlert(false);
  };

  const sendForm = () => {
    handleClickOpen();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     {/*  {formDetails.createdBy === user.id ? ( */}
        <div>
          <Root>
            <AppBar position="static" style={{ backgroundColor: 'white' }} elevation={2}>
              <ToolbarContent>
                <IconButton
                  edge="start"
                  aria-label="form icon"
                  style={{ color: '#140078' }}
                >
                  <ViewListIcon />
                </IconButton>
                <Title variant="h6" noWrap style={{ marginTop: '8.5px', color: 'black' }}>
                  {formDetails.name}
                </Title>

                <IconButton aria-label="star">
                  <StarBorderIcon />
                </IconButton>

                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Questions" />
                  <Tab label="Responses" />
                </Tabs>
                <IconButton aria-label="send form" onClick={sendForm}>
                  <SendIcon />
                </IconButton>
                <IconButton aria-label="palette">
                  <PaletteIcon />
                </IconButton>
                <IconButton aria-label="visibility">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="settings">
                  <SettingsIcon />
                </IconButton>

                <IconButton aria-label="more actions" edge="end">
                  <MoreIcon />
                </IconButton>
                <IconButton aria-label="account" edge="end">
                  <AccountCircleIcon />
                </IconButton>
              </ToolbarContent>
            </AppBar>
          </Root>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
            <DialogContent>
              <StyledPaper>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{window.location.origin + "/s/" + formDetails._id}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="copy link" onClick={clipToClipboard}>
                      <FilterNoneIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </StyledPaper>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openOfAlert}
            autoHideDuration={3000}
            onClose={handleCloseOfAlert}
            message="Copied to clipboard"
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseOfAlert}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

          <TabPanel value={value} index={0}>
            <QuestionsTab formData={formDetails} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ResponseTab formData={formDetails} formId={formID} />
          </TabPanel>
        </div>
{/*       ) : (
        <p>You're not the owner of the form</p>
      )} */}
    </div>
  );
}

export default EditForm;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
