import { useSelector } from "react-redux"
import Dialog, { DialogActions, DialogContent } from "../../globals/components/layout/Dialog";
import { selectAllProfiles, selectProfileById } from "../api/auth-profile-api-slice"
import DialogAuthPassword from "./DialogAuthPassword";
import ProfilesDialogPicker from "./manage-profiles/ProfilesDialogPicker";

export default function VerifyDialogProfile({
  profileId,
  setProfileId,
  password,
  setPassword,
  open,
  callback,
  close,
  topMessage = "",
  bottomMessage = "",
  buttons= [],
  loading,
}) {
  const currentProfile = useSelector(state => selectProfileById(state, profileId));
  const profiles = useSelector(selectAllProfiles);

  return (
    <Dialog open={open} close={close}>
      <DialogContent
        title={"Conferma la tua identità"}
        topMessage={topMessage}
        topMessageClassName="mt-4"
        bottomMessage={bottomMessage}
      >
        { !currentProfile && ( 
          <ProfilesDialogPicker
            profiles={profiles}
            callback={profile => setProfileId(profile.id)}
          />
        )}
        
          { currentProfile && ( 
            <DialogAuthPassword
              myProfile={currentProfile}
              clear={() => setProfileId("")}
              password={password}
              setPassword={setPassword}
              callback={callback}
              loading={loading}
            />
          )}
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}