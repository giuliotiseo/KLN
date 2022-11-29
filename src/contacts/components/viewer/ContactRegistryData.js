import Avatar from "../../../globals/components/layout/Avatar";
import SafeCol from "../../../globals/components/layout/SafeCol"
import ContactRegistryBasics from "./ContactRegistryBasics";
import ContactTypeData from "./ContactTypeData";
import ContactViewerLogs from "./ContactViewerLogs";

function ContactRegistryData({
  contact
}) {
  const { name, surname, avatar, type, log } = contact;
  return (
    <SafeCol id="ContactRegistryData">
      <div className='mr-3'>
        <div className='my-6 flex'>
          <Avatar
            name={`${name} ${surname}`}
            size={100}
            stepColor={100}
            src={avatar}
          />
        </div>

        <section>
          <h2 className='title-3 mb-2'>Dati anagrafici contatto</h2>
          <ContactRegistryBasics contact={contact} />
        </section>

        <section className='mt-8'>
          <h2 className='title-3 mt-4 mb-2'>Ruolo in azienda</h2>
          <ContactTypeData type={type} />

          <h2 className='title-3 mt-8 mb-2 block'>Attività recenti sul contatto</h2>
          <ContactViewerLogs logs={log || []} />
        </section>
      </div>
    </SafeCol>

  )
}

export default ContactRegistryData
