import { useCallback, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProfileVerify, useRegisterProfile } from "../hooks";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import Button from "../../globals/components/buttons_v2/Button";
import Scrollbar from "../../globals/components/layout/Scrollbar";
import AddProfileForm from "../components/manage-profiles/AddProfileForm";
import VerifyDialogProfile from "../components/VerifyProfileDialog";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ROLES } from "../../globals/libs/helpers";
import { enhancedProfileReducer, initialState, updateAddProfileFormLogic } from "../libs/reducers";

export default function AddProfileContainer() {
  const [ dialog, setDialog ] = useState(false);
  const [ profile, updateProfileState ] = useReducer(enhancedProfileReducer, initialState);
  const [ register,  { loading: loadingRegistration }] = useRegisterProfile();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const company = useSelector(selectCurrentCompany)
  const [verifyAndMutate, { profileId, setProfileId, password, setPassword, loading: loadingVerifyAccess }] = useProfileVerify({
    callback: () => register(profile),
    availableRoles: [ROLES.ADMIN]
  }); 

  const loading = loadingRegistration || loadingVerifyAccess;
  const topMessage = !profileId ? "Seleziona il tuo profilo per procedere" : "Profilo selezionato:";
  const bottomMessage = ""
  const buttons = [{
    text:"Conferma",
    disabled: loading,
    onClick: verifyAndMutate
  }]

  //  Global form update
  const updateForm = useCallback(({ value, name, type }) => {
    updateAddProfileFormLogic({ name, type, value, updateProfileState });
  }, []);

  return (
    <div className="relative flex h-full justify-center items-center">
      <div className="absolute h-full w-full flex flex-wrap">
        <Scrollbar>
          <div className="flex flex-col">
            <p className="text-4xl text-center mt-8 md:mt-[100px] sticky">Nuovo profilo</p>
            <Button
              text="Torna indietro"
              icon={<FaLongArrowAltLeft />}
              className="btn-ghost inline-flex mx-auto text-sm mt-2"
              onClick={goBack}
            />

            <div className="flex flex-wrap justify-center items-start mt-8">
              <AddProfileForm
                profile={profile}
                updateForm={updateForm}
                addProfileToCompany={() => setDialog(true)}
                company={company}
                isLoading={loading}
              />
            </div>
          </div>
        </Scrollbar>
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