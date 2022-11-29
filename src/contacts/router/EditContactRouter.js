import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router-dom";
// Components
import EditCompanyContactContainer from "../containers/EditCompanyContactContainer";
import EditUserContactContainer from "../containers/EditUserContactContainer";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SafeCol from "../../globals/components/layout/SafeCol";
import SafeContent from "../../globals/components/layout/SafeContent";
import SafeArea from "../../globals/components/layout/SafeArea";
// Helpers
import { CONTACT_TYPES_SCOPE } from "../libs/helpers";
// Hooks
import { useDataFinder, useFromPath } from "../../globals/libs/hooks";
import { selectContactFromAllLists } from "../slices/listContactsSlice";
import HeadingEditContact from "../components/HeadingEditContact";
// Thunks
import { updateContactThunk } from "../../app/thunks/contactsThunks";
import { fetchContact } from "../api/fetch";
import FullSpinner from "../../globals/components/spinners/FullSpinner";

// Main component -----------------------------------------------------------------------------------------------------------------------------------------------------
export default function EditContactRouter() {
  const location = useLocation();
  const fromPath = useFromPath();
  const dispatch = useDispatch();
  const [ contact, getContactStatus ] = useDataFinder({
    queryStringKey: "id", 
    selector: selectContactFromAllLists, 
    primaryKey: "id",
    query: fetchContact,
  }) 

  async function saveContactChanges({ updatedContact, setLoading }) {
    setLoading(true);
    await dispatch(updateContactThunk({
      type: CONTACT_TYPES_SCOPE[updatedContact.type],
      contact: updatedContact,
      prevContact: contact,
      merge: false
    }));
    setLoading(false);
  }

  if(getContactStatus === 'loading') return <FullSpinner />
  if((getContactStatus === 'success' && !contact) || location.pathname === "/contacts/edit") return <Navigate to="/contacts" replace />

  return (
    <SectionWrap>
      <SafeArea className="bg-base-200">
        <SafeCol>
          <SafeContent className="bg-base-100 max-w-screen-lg mx-auto px-8 py-4 rounded-md">
            <Routes>
              <Route path='/contacts/edit/'>
                <HeadingEditContact fromPath={fromPath} />
              </Route>
              <Route exact path='/contacts/edit/company'>
                <EditCompanyContactContainer contact={contact} saveContactChanges={saveContactChanges} />
              </Route>
              <Route exact path='/contacts/edit/user'>
                <EditUserContactContainer contact={contact} saveContactChanges={saveContactChanges} />
              </Route>
            </Routes>
          </SafeContent>
        </SafeCol>
      </SafeArea>
    </SectionWrap>
  )
}