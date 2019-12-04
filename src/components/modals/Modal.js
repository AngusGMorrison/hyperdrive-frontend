import React from 'react';
import { ICONS, THEMES } from '../../constants';
import './modals.css';

import useForm from '../../hooks/useForm';

import TextField from '../forms/fields/TextField';
import SmallButton from '../buttons/SmallButton';

const Modal = ({heading = "", body="", form = {}, buttons = {}, toggleVisible = () => {}, hasCloseIcon = false}) => {

  const { formFields, setFormFields, errors, resetErrors, handleInputChange, handleFormSubmission } 
    = useForm({ initialFormState: form, submitAction: buttons.primary.action });

  const handleOverlayClick = event => {
    event.preventDefault();
    event.stopPropagation();
  }

  const handleClose = event => {
    event.preventDefault();
    toggleVisible(false);
    setFormFields(form);
    resetErrors();
  }

  const renderForm = () => {
    return(
      <form className="modal-form" autoComplete="off" >
        { renderFormFields() }
        { buttons && renderButtons() }
      </form>
    )
  }

  const renderFormFields = () => {
    if (form) {
      return Object.values(form).map(field => {
        return(
          <TextField
            name={field.name}
            type={field.type}
            icon={field.icon}
            placeholder={field.placeholder}
            value={formFields[field.name].value}
            handleChange={handleInputChange}
            errors={errors[field.name]}
          />
        );
      });
    }
  }

  const renderButtons = () => {
    if (buttons) {
      return(
        <div className="modal-button-container" >
          { Object.entries(buttons).map(([ key, button ]) => {
            if (key === 'cancel') {
              return renderCloseButton(button);
            } else if (key === 'primary') {
              return renderPrimaryButton(button);
            } else {
              return renderSecondaryButton(button);
            }
          })}
        </div>
      )
    }
  }

  const renderPrimaryButton = button => {
    if (form === {}) {
      return <SmallButton action={button.action} theme={THEMES.BLUE}>{button.text}</SmallButton>
    } else {
      return <SmallButton action={handleFormSubmission} theme={THEMES.BLUE}>{button.text}</SmallButton>
    }
  }

  const renderSecondaryButton = button => {
    return <SmallButton action={button.action} theme={THEMES.SECONDARY}>{button.text}</SmallButton>
  }

  const renderCloseButton = button => {
    return <SmallButton action={handleClose} theme={THEMES.SECONDARY}>{button.text}</SmallButton>
  }

  return(
    <div className="modal-page-overlay" onClick={handleOverlayClick}>
      <div className="modal" >
        <div className="modal-content-container" >
          <div className="modal-header-container">
            <h3 className="modal-heading">{ heading }</h3>
            {
              hasCloseIcon &&
              <div className="close-icon-container" >
                <img className="close-icon icon-button" src={ICONS.CLOSE.WHITE} alt="Close button" onClick={handleClose} />
              </div>

            }
          </div>
          {
            body &&
            <p className="modal-body">{ body } </p>
          }
          { 
            form !== {} ? renderForm() : renderButtons()
          }        
        </div>
      </div>      
    </div>
  );
}

export default Modal;
