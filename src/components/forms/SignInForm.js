import React, { useState } from 'react';

import TextField from "./fields/TextField"
import { ICONS, THEMES } from "../../constants"

const SignInForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <form className="sign-in">
      <TextField
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.ACCOUNT_CIRCLE}
        placeholder="Email"
        value={email}
        handleChange={setEmail}
      />
      <TextField
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.KEY}
        placeholder="Password"
        value={password}
        handleChange={setPassword}
      />
    </form>
  );
}

export default SignInForm;