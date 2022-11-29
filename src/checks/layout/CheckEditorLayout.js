import { useDispatch } from "react-redux";
import SafeCol from "../../globals/components/layout/SafeCol";
import CheckEditorContainer from "../containers/CheckEditorContainer";
import CheckOrderRefCompiler from "../components/create/CheckOrderRefCompiler";
import LinkedChecks from "../components/create/LinkedChecks";
import Button from "../../globals/components/buttons_v2/Button";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { changeCheckEditorCheckOrder, changeCheckEditorDocsRef, changeCheckEditorKeyDocNum, resetCheckEditorOrder } from "../slices/checkEditorSlice";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CheckEditorLayout({
  order,
  check,
  docs: { docsRef, keyDocNum },
  queryFrom,
  buttons,
}) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-full w-full gap-4">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SafeCol id="CheckEditorLayout--sidebar">
            <div className="mr-4">
              <CheckOrderRefCompiler
                order={order}
                docs={{ docsRef, keyDocNum }}
                queryFrom={queryFrom}
                callback={(order) => dispatch(changeCheckEditorCheckOrder(order))}
                clear={() => dispatch(resetCheckEditorOrder())}
                docNumCallback={(value) => dispatch(changeCheckEditorKeyDocNum({ docsRef, value }))}
                docsRefCallback={(value) => dispatch(changeCheckEditorDocsRef({ docsRef, keyDocNum, value }))}
                canChange={false}
              />
              
              { order?.id && ( 
                <LinkedChecks
                  orderId={order.id}
                  stamp={order.stamp}
                  queryFrom={queryFrom}
                />
              )}
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-1 lg:flex-2 bg-base-200">
          <SafeCol id="CheckEditorLayout--content">
            <div className="pl-2 pr-4">
              <CheckEditorContainer check={check} />
            </div>
          </SafeCol>
        </section>
      </div>
      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Editor assegno</span>
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