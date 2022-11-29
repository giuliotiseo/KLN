import { useProfileVerify } from "../../hooks";
import { useState, useEffect } from "react";
import { useRole } from "../../hooks/useRole";
import { useRemoveProfileFromCompanyMutation } from "../../api/auth-profile-api-slice";
import Avatar from "../../../globals/components/layout/Avatar";
import Button from "../../../globals/components/buttons_v2/Button";
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import Spinner from "../../../globals/components/layout/Spinner";
import VerifyDialogProfile from "../VerifyProfileDialog";
import { FiEdit, FiXCircle } from "react-icons/fi"
import { capitalizeFullName, ROLES } from "../../../globals/libs/helpers";
import { toast } from "react-toastify";

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function ManageProfileItem ({
  profile,
  companyId,
  index,
  isDeleteAvailable
}) {
  const [ dialog, setDialog ] = useState(false);
  const [ removeProfile, { isLoading: isDeleting, isSuccess }] = useRemoveProfileFromCompanyMutation();
  const { roleText } = useRole(profile.roleIds);
  const [ verifyAndMutate, { profileId, setProfileId, password, setPassword, loading: loadingVerifyAccess }] = useProfileVerify({
    callback: () => removeProfile({ id: profile.id, companyId, index }),
    availableRoles: [ROLES.ADMIN]
  }); 

  const loading = loadingVerifyAccess || isDeleting;
  const topMessage = !profileId ? "Seleziona il tuo profilo per procedere" : "Profilo selezionato:";
  const bottomMessage = `Stai per eliminare il profilo di ${capitalizeFullName(profile.searchable)}`;
  const buttons = [{
    text:"Conferma",
    disabled: loading,
    onClick: verifyAndMutate
  }];

  useEffect(() => {
    if(isSuccess) {
      toast.success('Il profilo selezionato è stato rimosso con successo');
    }
  }, [isSuccess])

  return (
    <div className="m-4 text-center group">
      <Avatar
        name={profile.searchable}
        size={150}
        stepColor={100}
        src={profile?.avatar}
      />
      
      <div className="mt-6 text-center">
        <h4 className="title-3">
          <Button
            text={`${ profile.name } ${ profile.surname }`}
            className="text-primary-200 dark:text-primary-300 mx-auto inline-block font-bold"
            onClick={() => console.log('Seleziona profilo')}
          />
        </h4>
        <p>{roleText}</p>

        <div className={`flex items-center justify-center translate-y-2 opacity-0 pointer-events-none transition-all group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto`}>
          { isDeleteAvailable && (
            <Button
              icon={!isDeleting ? <FiXCircle className="text-2xl" /> : <Spinner className="h-3 w-3 text-light-100" />}
              className="rounded-full p-2 text-gray-500 hover:text-red-500 mx-1 mt-2"
              onClick={() => setDialog(true)}
              disabled={isDeleting}
            />
          )}

          <LinkButton
            icon={<FiEdit className="text-xl" />}
            className="inline-block rounded-full p-2 text-gray-500 hover:text-primary-200 mx-1 mt-2"
            to={profile.id}
            disabled={isDeleting}
          />
        </div>
      </div>

      <VerifyDialogProfile
        open={dialog}
        callback={verifyAndMutate}
        profileId={profileId}
        setProfileId={setProfileId}
        password={password}
        setPassword={setPassword}
        close={() => setDialog(false)}
        topMessage={topMessage}
        bottomMessage={bottomMessage}
        buttons={buttons}
        loading={loading}
      />
    </div>
  )
}