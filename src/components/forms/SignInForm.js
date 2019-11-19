import React, { useState } from 'react';

import TextField from "./fields/TextField"
import BigButton from "../buttons/BigButton";
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";

const SignInForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <form className="sign-in">
      <TextField
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.MAIL}
        placeholder="Email"
        value={email}
        handleChange={setEmail}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.KEY}
        placeholder="Password"
        value={password}
        handleChange={setPassword}
      />
      <BigButton 
        theme={THEMES.BLUE}
        icon={ICONS.DARK.THUMBS_UP}
        text={"Sign in"}
      />
    </form>
  );
}

export default SignInForm;