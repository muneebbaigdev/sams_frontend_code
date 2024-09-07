import { useReducer, useState } from "react";
import { AuthData } from "./AuthWrapper"
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import logo from '../assets/img/logo.png'
import { apiaddress } from "./apiaddress";
import bg1 from '../assets/img/wallpapers/1.jpg'
import bg2 from '../assets/img/wallpapers/2.jpg'
import bg3 from '../assets/img/wallpapers/3.jpg'
import bg4 from '../assets/img/wallpapers/4.jpg'
import bg5 from '../assets/img/wallpapers/5.jpeg'
import bg6 from '../assets/img/wallpapers/6.jpg'
import bg7 from '../assets/img/wallpapers/7.jpg'
import bg8 from '../assets/img/wallpapers/8.jpg'
import bg9 from '../assets/img/wallpapers/9.jpg'
import bg10 from '../assets/img/wallpapers/10.jpg'

const images = [bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9,bg10]
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
const bgimg = getRandomItem(images);
const bgimg1 = getRandomItem(images);
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Cyber Dreams
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createMuiTheme();
const Login = () => {
     const [index, setIndex] = useState(0);
     const handleSelect = (selectedIndex) => {
       setIndex(selectedIndex);
     };
const { login } = AuthData();
const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
const [ errorMessage, setErrorMessage ] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const doLogin = async () => {
    try {   
         await login(formData.userName, formData.password)

    } catch (error) {
         setErrorMessage(error)         
    }
  }


  return (
    <MuiThemeProvider theme={defaultTheme}>
      <Grid container component="main" style={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: 'url('+bgimg+')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: defaultTheme.palette.type === 'light' ? defaultTheme.palette.grey[50] : defaultTheme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box id="loginpage"
            style={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 20px',
            }}
          >
            <img src={logo} style={{width:'40%',height:'20%',marginTop:'25%'}} />
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 50 }}>
              <TextField
               value={formData.userName}
               onChange={(e) => setFormData({userName: e.target.value}) }
                margin="normal"
                required
                fullWidth
                id="email"
                label="Employee Number"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
               value={formData.password}
               onChange={(e) => setFormData({password: e.target.value}) }
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"

              />
               {errorMessage ?
               <div style={{color:'red'}}>{errorMessage}</div>
               : null }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: 20, marginBottom: 10 }}
                onClick={doLogin}
              >
                Sign In
              </Button>
              <Copyright style={{ marginTop: 20 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
export default Login