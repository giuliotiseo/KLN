import { AiOutlineColumnWidth } from "react-icons/ai";

const CheckpointAssets = ({ checkpoint, className = "" }) => (
  <section className={className}>
    <h4 className="title-4">Proprietà di accesso</h4>
    <div className="mt-2">
      <p className="flex items-center text-lg">
        <AiOutlineColumnWidth className="mr-2" /> Massimale metraggio transito: <br />
      </p>

      {checkpoint.maxLength 
        ? <p className="chip-neutral px-2 inline-block">{parseFloat(checkpoint.maxLength).toFixed(1)} metri</p>
        : <p className="opacity-50">Massimale transito non indicato</p>
      }
    </div>
  </section>
)

export default CheckpointAssets;