import { useEffect, useCallback, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProfileById } from "../api/auth-profile-api-slice";
import EditProfileRolesForm from "../components/manage-profiles/EditProfileRolesForm";
import Button from "../../globals/components/buttons_v2/Button";
import Scrollbar from "../../globals/components/layout/Scrollbar";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import VerifyDialogProfile from "../components/VerifyProfileDialog";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { enhancedProfileReducer, initialState, updateAddProfileFormLogic } from "../libs/reducers";
import { ROLES } from "../../globals/libs/helpers";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useProfileVerify, useUpdateProfile } from "../hooks";

export default function EditProfileRolesContainer() {
  const [ dialog, setDialog ] = useState(false);
  const company = useSelector(selectCurrentCompany);
  const [ profile, updateProfileState ] = useReducer(enhancedProfileReducer, initialState);
  const [ updateProfile, { loading: loadingUpdate }] = useUpdateProfile();
  const [ verifyAndMutate, { profileId, setProfileId, password, setPassword, loading: loadingAccessVerification }] = useProfileVerify({
    callback: () => updateProfile(profile),
    availableRoles: [ROLES.ADMIN]
  });

  const params = useParams();
  const selectedProfile = useSelector(state => selectProfileById(state, params.profileId));
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const loading = loadingAccessVerification || loadingUpdate;
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

  useEffect(() => {
    if(selectedProfile) {
      updateForm({ name: "setInitialProfile", value: selectedProfile, type: "initialSet" });
    }
  }, [selectedProfile, updateForm]);

  if(!selectedProfile) return <PageSpinner />

  return (
    <div className="relative flex h-full justify-center items-center">
      <div className="absolute h-full w-full flex flex-wrap">
        <Scrollbar>
          <div className="flex flex-col">
            <p className="text-4xl text-center mt-8 md:mt-[100px] sticky">Modifica profilo</p>
            <Button
              text="Torna indietro"
              icon={<FaLongArrowAltLeft />}
              className="btn-ghost inline-flex mx-auto text-sm mt-2"
              onClick={goBack}
            />

            <div className="flex flex-wrap justify-center items-start mt-8">
              <EditProfileRolesForm
                profile={profile}
                updateForm={updateForm}
                lockFields={profile?.isPsw}
                updateProfileInCompany={() => setDialog(true)}
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