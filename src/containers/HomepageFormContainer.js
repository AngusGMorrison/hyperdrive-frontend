import React from 'react';

import { HOMEPAGE_FORMS } from '../constants.js';
import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/form/RegistrationForm';

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
  );
}

export default HomepageFormContainer;