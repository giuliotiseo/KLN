import { useDispatch } from "react-redux";
import SafeArea from "../../globals/components/layout/SafeArea";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SafeCol from "../../globals/components/layout/SafeCol";
import CheckOrderRefCompiler from "../components/create/CheckOrderRefCompiler";
import CheckCreatorContainer from "../containers/CheckCreatorContainer";
import LinkedChecks from "../components/create/LinkedChecks";
import {
  changeCheckCreatorCheckOrder,
  changeCheckCreatorDocsRef,
  changeCheckCreatorKeyDocNum,
  resetCheckCreatorOrder
} from "../slices/checkCreatorSlice";
import { FiCheck, FiTerminal } from "react-icons/fi";
import Button from "../../globals/components/buttons_v2/Button";
import { MdOutlineSend } from "react-icons/md";
import { BiReset } from "react-icons/bi";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CheckCreatorLayout({
  check,
  docs,
  buttons,
  order,
  queryFrom,
}) {
  const dispatch = useDispatch();

  console.log({ order, docs });

return (
    <div className="flex flex-col h-full w-full gap-4">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative mr-2 rounded-lg flex-1">
          <SafeCol id="check-creator-sidebar">
            <CheckOrderRefCompiler
              order={order}
              docs={docs}
              queryFrom={queryFrom}
              callback={(order) => dispatch(changeCheckCreatorCheckOrder(order))}
              docNumCallback={(value) =>  dispatch(changeCheckCreatorKeyDocNum(value))}
              docsRefCallback={(payload) => dispatch(changeCheckCreatorDocsRef(payload))}  
              clear={() => dispatch(resetCheckCreatorOrder())}
              canChange={true}
            />

            { order?.id && (
              <LinkedChecks
                orderId={order.id}
                stamp={order.stamp}
                queryFrom={queryFrom}
              />
            )}
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-1 xl:flex-2">
          <SafeCol id="check-creator-content">
            <CheckCreatorContainer
              order={order}
              check={check}
            />
          </SafeCol>
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Compilazione assegno</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text={buttons.reset.text}
            onClick={buttons.reset.onClick}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text={buttons.save.text}
            loading={buttons.save.loading}
            onClick={buttons.save.onClick}
          />
        </div>
      </footer>
    </div>
  )
}