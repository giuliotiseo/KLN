import { TinyTitle } from "../../../../globals/components/typography/titles";
import { WAREHOUSE_TOOLS } from "../../../../warehouses/libs/helpers";

const CheckpointAssets = ({ checkpoint, styles = ""}) => (
  <section className={styles}>
    <TinyTitle>Asset necessari</TinyTitle>
    <div className="ml-4 mt-2">
      { checkpoint?.tools?.length > 0
        ? <ul className="list-disc list-inside mt-2">
          { checkpoint.tools.map(t => <li key={t}>{WAREHOUSE_TOOLS[t]}</li>)}
        </ul>
        : <p className="text-sm opacity-50">Nessun mezzo operativo indicato</p>
      }
    </div>
  </section>
)

export default CheckpointAssets;