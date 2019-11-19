import React from 'react';

const SignInForm = () => {
  return(
    <form className="sign-in">
      <TextField theme={THEMES.BLUE} icon={} placeholder="Email" />
      <TextField theme={THEMES.BLUE} icon={} placeholder="Password" />
    </form>
  );
}

export default SignInForm;