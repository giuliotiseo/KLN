import { FormTextRef, FormPhoneRef, FormPasswordRef, BasicSelector } from '../../globals/components/dataEntry';
import { companyTypeDescriptor } from "../../globals/libs/helpers";
// Models
import { CompanyType } from '../../models';

export default function SignUpWithoutInvite({ 
  username,
  password,
  confirmPassword,
  companyType,
  name,
  surname,
  vatNumber,
  companyName,
  phone,
  prefix,
}) {
  return (
    <>
      <section className="w-full mb-4">
        <h4 className="uppercase text-secondary-200 dark:text-secondary-300 font-bold">Utente</h4>
        <div className="w-full">
           
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="col-span-2 md:col-span-1">
              <FormTextRef
                name="username"
                label="Inserisci email"
                type="email"
                textRef={username}
                placeholder="es: mario.rossi@lts.it"
              />
            </div>

            {/* Phone */}
            <div className="col-span-2 md:col-span-1">
              <FormPhoneRef 
                name="phone"
                label="Inserisci telefono"
                type="phone"
                phoneRef={phone}
                prefixRef={prefix}
                placeholder="es: 3331234567"
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
                placeholder="es: ******"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <FormPasswordRef 
                name="confirmPassowrd"
                label="Conferma password"
                passwordRef={confirmPassword}
                placeholder="es: ******"
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">              
              <FormTextRef
                name="name"
                label="Inserisci nome"
                type="text"
                textRef={name}
                placeholder="es: Mario"
              />
            </div>
            <div className="col-span-1">              
              <FormTextRef
                name="surname"
                label="Inserisci cognome"
                type="text"
                textRef={surname}
                placeholder="es: Rossi"
              />
            </div>
          </div>
        </div>
      </section>
    
      {/* Company */}
      <section className="w-full mb-4">
        <div>
          <h4 className="uppercase text-secondary-200 dark:text-secondary-300 font-bold">Azienda</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">              
              <FormTextRef
                name="companyName"
                label="Ragione sociale"
                type="text"
                textRef={companyName}
                placeholder="es: LTS srl"
              />
            </div>
            <div className="col-span-1">
              <FormTextRef
                name="vatNumber"
                label="Partita IVA"
                type="text"
                textRef={vatNumber}
                placeholder="es: 12345678901"
              />
            </div>
            <div className="col-span-2">
              <BasicSelector 
                id="companyType"
                label="Tipo azienda"
                selectRef={companyType}
              >
                { Object.keys(CompanyType).map(type => ( 
                  <option key={type} value={type}>
                    {companyTypeDescriptor(type) || 'Tipo azienda sconosciuto'}
                  </option>
                ))}
              </BasicSelector>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}