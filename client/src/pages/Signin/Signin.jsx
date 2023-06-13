import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {LOGIN_USER} from '../../utils/mutations'
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";

export default function Signin() {

  const [login, {error,data}] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({email: '', password: ''})
  // TO DO: Sign in form on submit
  const handleChange = (e) => {
    const {name,value} = e.target;

    setFormState({
      ...formState,
      [name]: value,
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    try {
      console.log(formState)
      const {data} = await login({
        variables: {...formState},
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      email: '',
      password: '',
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* {data ? (
        <p>
          Successfully logged in! Head back to the {' '}
          <Link href='/'>homepage</Link>
        </p>
      ): ( */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
        {/* noValidate */}
        <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}> 
          <TextField
            margin="normal"
            required
            fullWidth
            value={formState.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formState.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* )} */}
    </Container>
  );
}
