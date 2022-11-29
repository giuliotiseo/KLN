import TextEditor from "../../globals/components/dataEntry/TextEditor";
import useUpdateProfileData from "../hooks/useUpdateProfileData";

function ProfileCardBody({ profile }) {
  const [ handleUpdateProfileData ] = useUpdateProfileData();
  return (
    <article className="grid grid-cols-3 py-4 px-4">
      <div className="col-span-3 md:col-span-2 pr-4">
        {/* Informations */}
        <h3 className="title-4">Informazioni</h3>
        <p className="text-base md:text-lg">
          Codice Fiscale:
          <span className="tracking-wider uppercase inline-block ml-2">{profile.fiscalCode}</span>
        </p>

        {/* Featured message */}
        <div className="mt-2">
          <TextEditor
            content={profile?.note}
            onSaveTextEditor={(content) => handleUpdateProfileData({ note: content })} 
            title="Messaggio in evidenza"
            controlled={true}
          />
        </div>
      </div>

      <div className="col-span-3 md:col-span-1 mt-4 md:mt-0 md:pl-4">
        <h3 className="title-4">Contatti</h3>
        <ul className="mt-1">
          { profile?.email && <li><span className="italic">email:</span> <a className="text-primary-200 text-opacity-80 hover:text-opacity-100 dark:text-primary-300 dark:hover:text-opacity-100" href={`mailto:${profile.email}`}>{profile.email}</a></li> }
          { profile?.phone && <li><span className="italic">phone:</span> <a className="text-primary-200 text-opacity-80 hover:text-opacity-100 dark:text-primary-300 dark:hover:text-opacity-100" href={`tel:${profile.phone}`}>{profile.phone}</a></li> }
        </ul>
      </div>
    </article>
  )
}

export default ProfileCardBody;