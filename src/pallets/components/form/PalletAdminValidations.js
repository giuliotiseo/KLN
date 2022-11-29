import { useSelector } from "react-redux"
import ValidatorProfile from "../viewer/ValidatorProfile";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import TextEditor from "../../../globals/components/dataEntry/TextEditor";
import Spinner from "../../../globals/components/layout/Spinner";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import { selectCurrentProfile } from "../../../auth-profile/slices/authProfileSlice";
import { useGetProfileQuery } from "../../../profile/api/profile-api-slice";

function PalletValidationInput ({
  companyId,
  companyName,
  tenant,
  adminValidation,
  callback
}) {
  const profileId = useSelector(selectCurrentProfile);
  const { data: profile, isLoading, isFetching } = useGetProfileQuery(profileId);

  if(isLoading || isFetching) return <Spinner className="w-5 h-5 text-primary-200 dark:text-primary-300" />

  const name = profile?.searchable?.toUpperCase();
  const email = profile?.email;
  const phone = profile?.phone;
  const job = companyName;
  const task = profile?.roleIds?.length > 0 ? profile.roleIds.join('&') : "";

  return (
    <section className="flex items-start mt-1">
      <Checkbox
        id={`transport-validation`}
        name={`transport-validation`}
        value={adminValidation}
        controlled={true}
        initialStatus={adminValidation}
        onChange={() => callback({
          email,
          name,
          job,
          task,
          companyId,
          tenant,
          phone
        })}
        styles="text-lg mt-1"
      />

      <section className="text-lg">
        <p>Attibuisci validazione amministrativa</p>
        <div className="text-sm mt-4">
          <p className="font-bold uppercase">Account del validatore</p>
          <ValidatorProfile
            email={email}
            name={name}
            job={job}
            task={task}
            phone={phone}
          />
        </div>
      </section>
    </section>
  )
}


// Main component ------------------------------------------------------------------------------------------------------------
export default function PalletAdminValidations ({
  adminValidation,
  note,
  callbackValidator,
  callbackNote,
}) {
  const company = useSelector(selectCurrentCompany);
  return (
    <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Validazione amministrativa</TinyTitle>}
    >
      <div className="flex items-start">
        <div className="flex-1">
          { company.type === "TRANSPORT" && (
            <PalletValidationInput
              companyId={company.id}
              tenant={company.owner}
              companyName={company.name}
              adminValidation={adminValidation}
              callback={callbackValidator}
            />
          )}
        </div>
        
        <div className="w-full ml-2 flex-2">
          <TextEditor
            content={note}
            controlled={true}
            onSaveTextEditor={(content) => callbackNote(content)} 
            label="Inserisci una nota alla validazione"
            actionButtonPosition="INTERNAL"
            showList={false}
            className="w-full"
          />
        </div>

      </div>
    </CardDetails>
  )
}