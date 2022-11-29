import { useCallback } from "react";
import SimpleBar from 'simplebar-react';
import ContactsPicker from "../../../../contacts/components/form/ContactsPicker";
import useListContacts from "../../../../contacts/hooks/useListContacts";
import { removeDuplicatesFromArrayOfObj } from "../../../../globals/libs/helpers";
// import InputCheckbox from "../../../../globals/components/dataEntry_v2/InputCheckbox";
// import InputEmail from "../../../../globals/components/dataEntry_v2/InputEmail";
// import InputPhone from "../../../../globals/components/dataEntry_v2/InputPhone";
// import InputText from "../../../../globals/components/dataEntry_v2/InputText";

const CheckpointContactsForm = ({
  checkpoint,
  dispatch,
  className = ""
}) => {
  console.log("checkpoint contacts", checkpoint);


  // const [ manualContact, setManualContact ] = useState(false);
  const manualContact = false;
  const [{ items: storekeepers, isLoading, isFetching, refetch }, pagination ] = useListContacts("WAREHOUSE");
  const contactIds = checkpoint?.contacts?.length > 0
    ? checkpoint.contacts.map(contact => contact.contactId)
    : []

  const handleUpdateContact = useCallback((contact) => {
    const contactList = checkpoint?.contacts?.length > 0 ? checkpoint.contacts : [];
    const contactData = {
      contactId: contact.id,
      name: contact.searchable.toUpperCase(),
      email: contact?.email,
      phone: contact?.phone, 
      job: contact?.jobName 
    }

    dispatch({ 
      type: "change_checkpoint",
      name: "contacts",
      value: contactIds.includes(contactData.contactId) 
        ? contactList.filter(c => c.contactId !== contactData.contactId)
        : contactList.concat(contactData)
    })
  }, [checkpoint, contactIds]);

  return (
  <section className={className}>
    <h4 className="title-4">Associa referenti</h4>
    {/* <InputCheckbox
      id={"manual-contact"}
      name={`manual-contact`}
      label={"Inserimento manuale"}
      value={manualContact}
      checked={manualContact}
      callback={() => setManualContact(prev => !prev)} 
    /> */}

    { !manualContact && (
      <SimpleBar style={{ maxHeight: 500 }}>
        <ContactsPicker
          title={null}
          storekeepers={storekeepers}
          // storekeepers={checkpoint?.contacts?.length > 0
          //   ? storekeepers.concat(checkpoint?.contacts?.map(contact => ({ ...contact, id: contact.contactId, searchable: contact.name })))
          //   : storekeepers}
          refreshList={refetch}
          isLoading={isLoading || isFetching}
          pagination={pagination}
          className="mt-2"
          initialContactIds={contactIds}
          callback={({ value }) => handleUpdateContact(value)}
        />
      </SimpleBar>
    )}
    
    {/* { manualContact && (
      <div>
        <InputText
          id="name"
          label="Nome"
          className="flex-col w-full mt-2"
          contentClassName="w-full text-lg"
          labelClassName="block"
          value={checkpoint?.contacts?.[0]?.name || ""}
          callback={({ value }) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
            ...checkpoint.contacts[0],
            name: value
          }]})}
        />

        <InputEmail
          id="email"
          label="Email"
          value={checkpoint?.contacts?.[0]?.email || ""}
          placeholder="es. mariorossi@lts.it"
          contentClassName="w-full text-lg"
          labelClassName="block"
          className="flex-col w-full mt-2"
          callback={({ value }) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
            ...checkpoint.contacts[0],
            email: value,
          }]})}
        />

        <InputPhone
          id="phone"
          label="Telefono"
          className="flex-col w-full mt-2"
          contentClassName="w-full text-lg"
          labelClassName="block"
          value={checkpoint?.contacts?.[0]?.phone || ""}
          callback={({ value }) => dispatch({ type: "change_checkpoint", name: "contacts", value: [{
            ...checkpoint.contacts[0],
            phone: value,
          }]})}
        />
      </div>
    )} */}
  </section>
)}

export default CheckpointContactsForm;