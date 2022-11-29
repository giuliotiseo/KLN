import FormDatalist from "../../globals/components/dataEntry/FormDatalist";
import FormPhone from "../../globals/components/dataEntry/FormPhone";
import FormText from "../../globals/components/dataEntry/FormText";
import SearchPlaces from "../../globals/components/dataEntry/SearchPlaces";
import TextEditor from "../../globals/components/dataEntry/TextEditor";
import { SmallTitle } from "../../globals/components/typography/titles";
import ContactCheckpoints from "./ContactCheckpoints";

export default function CreateCompanyContactForm({ 
  nameState, emailState, phoneState, prefixState,
  jobState, vatNumberState, uniqueCodeState,
  pecState, locationsState, noteState
}) {
  const [name, setName] = nameState;
  const [email, setEmail] = emailState;
  const [phone, setPhone] = phoneState;
  const [prefix, setPrefix] = prefixState;
  const [job, setJob] = jobState;
  const [vatNumber, setVatNumber] = vatNumberState;
  const [uniqueCode, setUniqueCode] = uniqueCodeState;
  const [pec, setPec] = pecState;
  const [locations, setLocations] = locationsState;
  const [note, setNote] = noteState;

  return (
    <>
      {/* Name */}
      <div className="bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md">
        <SmallTitle styles="flex items-center mb-2">
          <span>Anagrafica contatto</span>
        </SmallTitle>

        <FormText
          name="name"
          label="Nome o ragione sociale"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="es: LTS SRL"
        />
        
        <FormText
          name="vatNumber"
          label="Partita IVA"
          type="number"
          value={vatNumber}
          onChange={e => setVatNumber(e.target.value)}
          placeholder="es: 12345678901"
        />    

        <FormText
          name="pec"
          label="Indirizzo PEC"
          type="text"
          value={pec}
          onChange={e => setPec(e.target.value)}
          placeholder="es: ltssrl@pec.it"
        />

        <FormText
          name="uniqueCode"
          label="Codice Univoco"
          type="text"
          value={uniqueCode}
          onChange={e => setUniqueCode(e.target.value)}
          placeholder="es: AB123CD"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md">
        <div className="col-span-1">              
          <FormPhone 
            name="phone"
            label="Telefono"
            type="phone"
            prefix={prefix}
            onChangePrefix={value => setPrefix(value)}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="es: 3331234567"
          />
        </div>
        <div className="col-span-1">              
          <FormText
            name="email"
            label="Indirizzo email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="es: info@ltssrl.it"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md">
        <div className="col-span-2">
          <FormDatalist
            label="Settore di operatività"
            placeholder={`es: Surgelati, frutta, ecc.`}
            name="job"
            val={job}
            onChange={value =>  setJob(value)}
            options={["FRUTTA", "GELATI", "PESCE", "SURGELATI"]}
          />
        </div>

        <div className="col-span-1">
          <SearchPlaces 
            label="Aggiungi checkpoint" 
            onClick={(data) => setLocations(prev => prev.concat(data))}
            styles="my-2"
            clearAfterClick={true}
          />
          <ContactCheckpoints
            locations={locations}
            setLocations={setLocations}
            showLabel={false}
          />
        </div>
      </div>
    </>
  )
}