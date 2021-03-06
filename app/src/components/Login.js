import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Post Here
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const initialFormValues = {
  credentials: {
    username: "",
    password: "",
  },
};

const initialCreateAccountFormValues = {
  credentials: 
  {
    username : "",
    password : "",
  }
};


const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [ createAccountValues, setCreateAccountValue ] = useState( initialCreateAccountFormValues );

  const { push } = useHistory();
  const classes = useStyles();

  const [ open, setOpen ] = React.useState( false );

  const openModalHandler = () => { setOpen( true ) };
  
  const closeModalHandler = () => { setOpen( false ) };

  const handleChange = ( event ) => {
    setFormValues( { ...formValues, [event.target.name]: event.target.value } );
  };

  const createAccountOnChange = e => { setCreateAccountValue( { ...createAccountValues, [ e.target.name ] : e.target.value } ) };
  

  const login = ( event ) => {
    event.preventDefault();
    axiosWithAuth()
      .post( "api/login" , formValues.credentials )
      .then( ( res )  => {
        console.log("Login -> res", res);
        window.localStorage.setItem( "token", res.data.payload );
        push( "/PostHere" );
      })
      .catch( ( err ) => console.log( err ) );
  };

  const createAccount = e => 
  {
    e.preventDefault();
    axiosWithAuth()
      .post( "api/create" , createAccountValues.credentials )
      .then( ( res )  => {
        console.log("Login -> res", res);
        window.localStorage.setItem( "token", res.data.payload );
        push( "/PostHere" );
      })
      .catch( ( err ) => console.log( err ) );
  };



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit = { login } className = { classes.form } noValidate>
          <TextField value = { formValues.username } onChange = { handleChange } type = "text" variant = "outlined" fullWidth
            margin = "normal" required id = "username" label = "Username" name = "username" autoComplete = "username" autoFocus />

          <TextField
            value={formValues.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick = { openModalHandler }>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>


        <Dialog open = { open } onClose={ closeModalHandler } aria-labelledby = "alert-dialog-title" aria-describedby = "alert-dialog-description">
          <DialogContent>
          
            <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5"> Create Account</Typography>
                  
            <form onSubmit = { createAccount } className = { classes.form } noValidate>
              
              <TextField value = { createAccountValues.username } onChange = { createAccountOnChange } type = "text" variant = "outlined"
                margin = "normal" required fullWidth id = "username" label = "Username" name = "username" autoComplete = "username" autoFocus />

              <TextField value={ createAccountValues.password } onChange={ createAccountOnChange } variant = "outlined" margin = "normal" required 
                fullWidth name = "password" label = "Password" type = "password" id = "password" autoComplete = "current-password" />

              <FormControlLabel control = { <Checkbox value = "remember" color="primary" /> } label="Remember me" />

              <Button type = "submit" fullWidth variant = "contained" color = "primary" className = { classes.submit } >
                Sign Up
              </Button>

            </form>
        
          </DialogContent>

          <DialogActions>
            <Button onClick={ closeModalHandler } color="primary"> Cancel </Button>
          </DialogActions>
        </Dialog>

      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

     


    </Container>
  );
};

export default Login;