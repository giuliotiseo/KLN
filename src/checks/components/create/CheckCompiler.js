import { useDispatch } from "react-redux";
import { FiInbox } from "react-icons/fi";
import { SmallTitle } from "../../../globals/components/typography/titles";
import CheckCompilerAttachments from "./CheckCompilerAttachments";
import CheckCompilerContent from "./CheckCompilerContent";
import CheckCompilerDates from "./CheckCompilerDates";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCompilerHeader = () => (
    <SmallTitle styles="my-4">Compilatore assegni</SmallTitle>
)

const CheckCompilerBody = ({ order, dispatch }) => {
  if(!order) return <div
    className="absolute flex w-full h-full flex-col items-center justify-center opacity-50"
  >
    <FiInbox className="text-4xl" />
    <p className="text-2xl font-bold max-w-[320px] text-center">
      Seleziona un ordine per proseguire
    </p>
  </div>

  return <>
    <CheckCompilerDates dispatch={dispatch} />
    <CheckCompilerContent dispatch={dispatch} />
    <CheckCompilerAttachments dispatch={dispatch} />
  </>
}

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckCompiler({ order }) {
  const dispatch = useDispatch();
  return (
    <section>
      { order && <CheckCompilerHeader /> }
      <CheckCompilerBody order={order} dispatch={dispatch} />
    </section>
  )
}