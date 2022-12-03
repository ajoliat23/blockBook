import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { supabaseClient } from "../api/supabaseClient"
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export const SignUpPage = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch} = useForm();
  const password = watch("password");
  const email = watch("email");
  const onSubmit = ({ email, password }: any) => {
    supabaseClient.auth.signUp({
      email,
      password,
    }).then(res => {
      console.log(res.data.user)
      alert("signed up successfully! check your email!")
    }).catch(err => {
      console.error(err)
    });
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div>
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
        />
      </div>

      <Button type="submit">
          Sign up
        </Button>
    </form>
  );
};