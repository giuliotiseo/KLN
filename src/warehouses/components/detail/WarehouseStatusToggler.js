import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
// Components
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
// Thunk
import { updateWarehouseStatusThunk } from "../../../app/thunks/warehousesThunks";
// Helpers
import { WAREHOUSE_STATUS } from "../../libs/helpers";

const variants = {
  "ACTIVE": { x: 14, backgroundColor: '#55C595' },
  "DISABLED": { x: 0, backgroundColor: '#DE5454' },
}

export default function WarehouseStatusToggler({ warehouse }) {
  const [ status, setStatus ] = useState(warehouse?.status || null);
  const dispatch = useDispatch();

  async function handleChangeStatus() {
    setStatus((prev) => prev === 'ACTIVE' ? 'DISABLED' : 'ACTIVE');
    dispatch(updateWarehouseStatusThunk({
      warehouse,
      rollback: () => setStatus(warehouse.status)
    }));
  }

  return (
    <div>
      <SmallTitle styles="mb-2">Stato del magazzino</SmallTitle>
      <div className="flex items-start">
        <button
          style={{ minWidth: 30 }}
          className="flex border rounded-lg text-left w-8 bg-light-100 border-light-50 dark:bg-dark-200 dark:border-dark-100"
          onClick={handleChangeStatus}
        >
          <motion.div
            variants={variants}
            animate={status}
            className="relative w-4 h-4 rounded-full"
          >
          </motion.div>
        </button>
        
        <div className="ml-2">
          <SmallParagraph styles="uppercase font-bold opacity-50 tracking-wide">
            {WAREHOUSE_STATUS[status]}
          </SmallParagraph>
        </div>
      </div>
    </div>
  )
}