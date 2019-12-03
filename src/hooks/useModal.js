import React, { useState } from 'react';
import { ICONS, THEMES } from '../constants';
import '../components/modals/modals.css';

import useForm from './useForm';

import TextField from '../components/forms/fields/TextField';
import SmallButton from '../components/buttons/SmallButton';

const useModal = (content = {}) => {

  
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const { formFields, setFormFields, errors, resetErrors, handleInputChange, handleFormSubmission } = useForm({ initialFormState: content.form.fields, submitAction: content.buttons.primary.action });

  const handleOverlayClick = event => {
    event.preventDefault();
    event.stopPropagation();
  }

  const handleClose = event => {
    event.preventDefault();
    setModalIsVisible(false);
    setFormFields(content.form.fields);
    resetErrors();
  }

  const renderForm = () => {
    return(
      <form className="modal-form" onSubmit={handleFormSubmission} autoComplete="off" >
        { renderFormFields() }
        { renderButtons() }
      </form>
    )
  }

  const renderFormFields = () => {
    if (content.form) {
      return Object.values(content.form.fields).map(field => {
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
    if (content.buttons) {
      return(
        <div className="modal-button-container" >
          { Object.entries(content.buttons).map(([ k, v ]) => {
              if (k === 'cancel') {
                return <SmallButton action={handleClose} theme={THEMES.SECONDARY}>{v.text}</SmallButton>
              } else {
                return <SmallButton action={v.action} theme={THEMES.BLUE}>{v.text}</SmallButton>
              }
          })}
        </div>
      )
    }
  }

  const renderModal = () => {
    return(
      <div className="modal-page-overlay" onClick={handleOverlayClick}>
        <div className="modal" >
          <div className="modal-content-container" >
            <div className="modal-header-container">
              <h3 className="modal-heading">{ content.heading }</h3>
              {
                content.closeIcon &&
                <div className="close-icon-container" >
                  <img className="close-icon icon-button" src={ICONS.CLOSE.WHITE} alt="Close button" onClick={handleClose} />
                </div>

              }
            </div>
            {
              content.body &&
              <p className="modal-body">{ content.body } </p>
            }
            { 
              content.form ? renderForm() : renderButtons()
            }        
          </div>
        </div>      
      </div>
    )
  }

  return { modalIsVisible, setModalIsVisible, renderModal };
}

export default useModal;
