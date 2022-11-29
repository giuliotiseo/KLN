import { FiBriefcase, FiUser } from "react-icons/fi";
import { FormPhoneRef, FormTextRef } from "../../globals/components/dataEntry";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import FormPasswordRef from "../../globals/components/dataEntry/FormPasswordRef";
// Helpers
import { companyTypeDescriptor } from "../../globals/libs/helpers";
import { CompanyType } from "../../models";

export default function SignUpFromInvite({ username, password, confirmPassword, companyType, name, vatNumber, companyName, phone, prefix }) {
  return (
    <>        
      <section className="w-full my-4">
        <h4 className="flex items-center uppercase opacity-40 font-bold">
          <FiUser className="mr-1" />
          <span>Utente</span>
        </h4>
        <div className="w-full"> 
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="col-span-2 xl:col-span-1">
              <FormTextRef 
                disabled={true}
                label="Email"
                textRef={username}
                value={username.current.value}
                name="username"
                readOnly={true}
              />
            </div>
            <div className="col-span-2 xl:col-span-1">
              {/* Phone */}
              <FormPhoneRef 
                disabled={false}
                label="Telefono"
                phoneRef={phone}
                prefixRef={prefix}
                prefix={prefix.current.value}
                value={phone.current.value}
                name="phone"
                placeholder=""
              />
            </div>
          </div>
          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <FormPasswordRef 
                name="password"
                label="Inserisci password"
                passwordRef={password}
                placeholder=""
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <FormPasswordRef 
                name="confirmPassowrd"
                label="Conferma password"
                passwordRef={confirmPassword}
                placeholder=""
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">              
              <FormTextRef
                name="name"
                label="Nome e cognome"
                type="text"
                disabled={false}
                value={name.current.value}
                textRef={name}
                placeholder=""
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Company */}
      <section className="w-full my-4">
        <div>
          <h4 className="flex items-center uppercase opacity-40 font-bold">
            <FiBriefcase className="mr-2" />
            Azienda
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">              
              <FormTextRef
                name="companyName"
                label="Ragione sociale"
                type="text"
                textRef={companyName}
                value={companyName.current.value}
                disabled={true}
                readOnly={true}
                placeholder=""
              />
            </div>
            <div className="col-span-1">
              <FormTextRef
                name="vatNumber"
                label="Partita IVA"
                type="text"
                disabled={true}
                textRef={vatNumber}
                value={vatNumber.current.value}
                placeholder=""
              />
            </div>
            <div className="col-span-2">
              <ControlledSelector 
                id="companyType"
                label="Tipo azienda"
                value={companyType.current.value}
                selectRef={companyType}
                disabled={true}
              >
                { Object.keys(CompanyType).map(type => ( 
                  <option key={type} value={type}>
                    {companyTypeDescriptor(type) || 'Tipo azienda sconosciuto'}
                  </option>
                ))}
              </ControlledSelector>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}