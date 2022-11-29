import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import TextEditor from "../../../globals/components/dataEntry/TextEditor";
import Spinner from "../../../globals/components/layout/Spinner";
import ValidatorProfile from "../viewer/ValidatorProfile";
import Select from "../../../globals/components/dataEntry_v2/Select";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { statusOptions, STATUS_DESCRIPTIONS } from "../../libs/helpers";
import { FiEdit } from "react-icons/fi";
import { changePalletEditorValidation, changePalletEditorMessage } from "../../slices/palletEditorSlice";
import { selectCurrentProfile } from "../../../auth-profile/slices/authProfileSlice";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../../profile/api/profile-api-slice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import { useDispatch } from "react-redux";

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function PalletAdminValidationSelect ({
  origin = "customer",
  validationMessage = "",
  validation,
}) {
  const { name: companyName, id: companyId } = useSelector(selectCurrentCompany);
  const profileId = useSelector(selectCurrentProfile);
  const { data: profile, isLoading, isFetching } = useGetProfileQuery(profileId);
  const dispatch = useDispatch();

  if(isLoading || isFetching) return <Spinner className="w-5 h-5 text-primary-200 dark:text-primary-300" />

  const name = profile?.searchable?.toUpperCase();
  const email = profile?.email;
  const phone = profile?.phone;
  const job = companyName;
  const task = profile?.roleIds?.length > 0 ? profile.roleIds.join('&') : "";

  return (
    <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Validazione amministrativa</TinyTitle>}
    >
      <div className="flex items-start">
        <div className="flex-1 px-2">
          <Select
            id={origin}
            icon={() => <FiEdit className="label-icon" />}
            label="Modifica la validazione"
            value={validation}
            className="mr-2 w-full"
            callback={payload => dispatch(changePalletEditorValidation({
              ...payload,
              profile: { name, email, phone, job, task, companyId }
            }))}
          >
            { statusOptions.map(option => (
              <option key={option} value={option}>
                {STATUS_DESCRIPTIONS[option]}
              </option>
            ))}
          </Select>

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
        </div>
        
        <div className="w-full ml-2 flex-2">
          <TextEditor
            content={validationMessage}
            controlled={true}
            // onSaveTextEditor={(content) => console.log({ id: origin, value: content })} 
            onSaveTextEditor={(content) => dispatch(changePalletEditorMessage({ id: origin, value: content }))} 
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