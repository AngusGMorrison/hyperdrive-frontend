import React from 'react';
import { HOMEPAGE_FORMS } from "../constants.js"

const HomepageFormContainer = () => {

  const [form, setForm] = useState(HOMEPAGE_FORMS.SIGN_IN);

  return(
    <div>
      <HomepageFormSelector setForm={setForm} />
      { 
        form === HOMEPAGE_FORMS.SIGN_IN ?
        <SignInForm /> :
        <RegistrationForm />
      }
    </div>
  )
}

export default HomepageFormContainer;