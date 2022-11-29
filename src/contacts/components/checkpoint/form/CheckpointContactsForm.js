import { useState } from "react";
import { useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import Checkbox from "../../../../globals/components/dataEntry/Checkbox"
import FormText from "../../../../globals/components/dataEntry/FormText"
import ContactsPicker from "../../ContactsPicker";
import { SmallTitle } from "../../../../globals/components/typography/titles"
import { selectAllUsersContacts } from "../../../slices/allContactsSlice";
import { toggleValues } from "../../../../globals/libs/helpers";
import { selectTenant } from "../../../../company/slices/companyInfoSlice";

export default function ({ checkpoint, dispatch, styles }) {
  const [ manualContact, setManualContact ] = useState(false);
  const usersContacts = useSelector(selectAllUsersContacts);
  const tenant = useSelector(selectTenant);
  const storekeepers = usersContacts.filter(c => c.type === "WAREHOUSE");

  return (
  <section className={styles}>
    <SmallTitle>Associa referenti</SmallTitle>
    <Checkbox
      id={"manual-contact"}
      name={`manual-contact`}
      label={"Inserimento manuale"}
      value={manualContact}
      initialStatus={manualContact}
      onChange={() => setManualContact(prev => !prev)} 
    />

    { !manualContact && (
      <SimpleBar style={{ maxHeight: 500 }}>
        <hr className="mt-4"/>
        <ContactsPicker
          title={null}
          storekeepers={storekeepers}
          initialContactIds={checkpoint?.contacts?.map(c => {
            return c.contactId
          })}
          handleSelectedContacts={(value) => toggleValues({
            value,
            values: checkpoint.contacts,
            onChange: (res) => { 
              dispatch({ type: "change_checkpoint", name: "contacts",
              value: res.map(chk_contact => chk_contact?.contactId 
                ? ({ ...chk_contact })
                : res
              )})
            },
            type: "object_array",
            compareParameter: "contactId",
            additionalData: storekeepers.reduce((acc, val) => ({
              ...acc,
              [val.id]: { 
                contactId: val.id,
                name: val?.name,
                phone: val?.phone,
                email: val?.email,
                job: val?.job
              }
            }), {})
          })}
        />
      </SimpleBar>
    )}
    
    { manualContact && (
      <div className="mt-4">
        <div>
          <FormText
            label="Nome"
            styles="w-full"
            type="text"
            value={checkpoint?.contacts?.[0]?.name}
            onChange={({ target: { value }}) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
              ...checkpoint.contacts[0],
              name: value
            }]})}
          />
          <FormText
            label="Email"
            styles="w-full"
            type="email"
            value={checkpoint?.contacts?.[0]?.email}
            onChange={({ target: { value }}) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
              ...checkpoint.contacts[0],
              contactId: `${value}-c-${tenant}-fromRemote`,
              email: value,
            }]})}
          />
          <FormText
            label="Telefono"
            styles="w-full"
            type="phone"
            value={checkpoint?.contacts?.[0]?.phone}
            onChange={({ target: { value }}) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
              ...checkpoint.contacts[0],
              phone: value,
            }]})}
          />
        </div>
      </div>
    )}
  </section>
)}