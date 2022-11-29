import { Route, Routes } from "react-router-dom"
import SubscribeLayout from "../layout/SubscribeLayout";
import SubscribeIntroContainer from "../container/SubscribeIntroContainer";
import SubscribeRegistryContainer from "../container/SubscribeRegistryContainer"
import SubscribeWarehouseContainer from "../container/SubscribeWarehouseContainer";
import SubscribeContactContainer from "../container/SubscribeContactContainer";
import SubscribeGreetingsContainer from "../container/SubscribeGreetingsContainer";
import SubscribePrivacyContainer from "../container/SubscribePrivacyContainer";

const SubscribeRouter = () => {
  return (
    <Routes>
      <Route element={<SubscribeLayout />}>
        <Route index element={<SubscribeIntroContainer />} />
        <Route path="intro" element={<SubscribeIntroContainer />} />
        <Route path="registry" element={<SubscribeRegistryContainer />} />
        <Route path="warehouse" element={<SubscribeWarehouseContainer />} />
        <Route path="contact" element={<SubscribeContactContainer />} />
        <Route path="privacy" element={<SubscribePrivacyContainer />} />
      </Route>

      <Route path="greetings" element={<SubscribeGreetingsContainer />} />
    </Routes>
  )
}

export default SubscribeRouter;