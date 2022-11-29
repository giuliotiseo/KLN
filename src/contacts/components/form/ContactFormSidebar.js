import React from 'react'
import Avatar from '../../../globals/components/layout/Avatar';
import SafeCol from '../../../globals/components/layout/SafeCol';
import ContactFormTypeSelector from '../create/ContactFormTypeSelector';
import ContactRegistryCompiler from '../create/ContactRegistryCompiler';

function ContactFormSidebar({
  contactForm,
  contact,
  updateForm,
  validationError
}) {
  const { name, surname, avatar } = contact;
  return (
    <SafeCol id="CustomerRegistryFields">
      <div className='mr-3'>
        <div className='my-6 flex'>
          <Avatar
            name={`${name} ${surname}` || null}
            size={100}
            stepColor={100}
            src={avatar}
          />
        </div>

        <div>
          <ContactFormTypeSelector
           contact={contact}
           updateForm={updateForm}
         />
        </div>

        <div>
          <h2 className='title-3 mb-2'>Dati anagrafici contatto</h2>
          <ContactRegistryCompiler
           contact={contact}
           contactForm={contactForm}
           updateForm={updateForm}
           validationError={validationError}
         />
        </div>
      </div>
    </SafeCol>
  )
}

export default ContactFormSidebar
