import React, { useState } from 'react';

import { HOMEPAGE_FORMS, ICONS } from '../constants.js';
import BinarySelector from '../components/selectors/BinarySelector';
import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/forms/RegistrationForm';

const HomepageFormContainer = () => {

  const [formToDisplay, setFormToDisplay] = useState(HOMEPAGE_FORMS.SIGN_IN);

  return(
    <div>
      <BinarySelector
        heading={"Welcome to Hyperdrive"}
        icon={ICONS.YELLOW.SORT}
        selectedOption={formToDisplay}
        option1={HOMEPAGE_FORMS.REGISTER}
        option2={HOMEPAGE_FORMS.SIGN_IN}
        handleClick={setFormToDisplay}
      />
      { 
        formToDisplay === HOMEPAGE_FORMS.SIGN_IN ?
        <SignInForm /> :
        <RegistrationForm />
      }
    </div>
  );
}

export default HomepageFormContainer;