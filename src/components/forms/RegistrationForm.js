import React, { useState } from 'react';

import TextField from './fields/TextField';
import BigButton from "../buttons/BigButton";
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";

const RegistrationForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <form className="registration">
      <TextField
        type={FIELD_TYPES.TEXT}
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.ACCOUNT_CIRCLE}
        placeholder="Name"
        value={name}
        handleChange={setName}
      />
      <TextField
        type={FIELD_TYPES.TEXT}
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
        placeholder="Create a password"
        value={password}
        handleChange={setPassword}
      />
      <BigButton 
        theme={THEMES.BLUE}
        icon={ICONS.DARK.THUMBS_UP}
        text={"Sign up"}
      />
    </form>
  );
}

export default RegistrationForm;