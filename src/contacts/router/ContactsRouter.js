import { Route, Routes } from "react-router-dom";
// Components
import ContactsLayout from "../layout/ContactsLayout";
import ContactsListContainer from "../containers/ContactsListContainer";
import ContactCreatorContainer from "../containers/ContactCreatorContainer";
import ContactEditorContainer from "../containers/ContactEditorContainer";
import ContactViewerContainer from "../containers/ContactViewerContainer";

export default function ContactsRouter() {
  return (
    <Routes>
      <Route element={<ContactsLayout />}>
        <Route index element={<ContactsListContainer />} />
        <Route exact path='new' element={<ContactCreatorContainer />} />
        <Route path='edit' element={<ContactEditorContainer />} />
        <Route path='view' element={<ContactViewerContainer />} />
      </Route>
    </Routes>
  )
}