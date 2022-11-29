import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useWarehouseByIdQuery, useDeleteWarehouseMutation } from "../api/warehouses-api-slice";
import Button from "../../globals/components/buttons_v2/Button";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import WarehouseDetailsData from "../components/viewer/WarehouseDetailsData";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
// import ContactDetailsData from "../components/viewer/ContactDetailsData";
// import ContactRegistryData from "../components/viewer/ContactRegistryData";
import { toast } from "react-toastify";
import { getStandardCoordinatesByCheckpoint } from "../../globals/libs/helpers";
// Actions
import { resetWarehousesList } from "../slices/warehousesListSlice";
import DeleteWarehouseDialog from "../components/viewer/DeleteWarehouseDialog";
import useUnlinkWarehouse from "../hooks/useUnlinkWarehouse";

export default function WarehouseViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [ unlinkDialog, setUnlinkDialog ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: warehouse, isLoading, isFetching } = useWarehouseByIdQuery({ id });
  const [ deleteWarhouse, { isLoading: isDeleting }] = useDeleteWarehouseMutation();
  const [ unlinkWarehouse, { isLoading: isUnlinking }] = useUnlinkWarehouse(warehouse);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const standard_coordinate = getStandardCoordinatesByCheckpoint(warehouse);

  // Delete callback function
  const handleDeleteWarehouse = useCallback(async () => {
    try {
      await deleteWarhouse(id);
      toast.success("Magazzino eliminato dalla rubrica");
      navigate("/warehouses");
    } catch(err) {
      toast.error("Abbiamo riscontrato un errore durante l'eliminazione del magazzino");
      console.error(err);
    }
  }, [id]); 

  useEffect(() => {
    console.log('Warehouse', warehouse);
    return () => dispatch(resetWarehousesList())
  }, []);

  const dialogDeleteButtons = [{
    text: "Conferma eliminazione",
    disabled: isDeleting,
    onClick: handleDeleteWarehouse
  }];

  const dialogUnlinkButtons = [{
    text: "Rimuovi collegamento",
    disabled: isUnlinking,
    onClick: unlinkWarehouse
  }];

  if(!warehouse || isLoading || isFetching) return <PageSpinner message="Ricerca magazzino in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col lg:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SimpleMap
            lat={standard_coordinate?.lat}
            lng={standard_coordinate?.lng}
            onClick={() => console.log("Nessuna operazione consentita")}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <WarehouseDetailsData warehouse={warehouse} />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Visualizzazione magazzino</span>
        </h5>

        <div className="flex items-center gap-2">
          { warehouse?.isLinked !== 1 
            ? (
              <Button
                className="btn-primary-outline  ml-auto"
                icon={<BiReset />}
                text="Elimina"
                onClick={() => setDeleteDialog(true)}
              />
            )
            : (
              <Button
                className="btn-primary-outline  ml-auto"
                icon={<BiReset />}
                text="Scollega ed elimina"
                onClick={() => setUnlinkDialog(true)}
              />
            )
          }

          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/warehouses/edit?id=${id}`}
          />
        </div>
      </footer>

      <DeleteWarehouseDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="È severamente sconsigliata questa operazione! Perderai tutti i dati riferiti a questo magazzino"
        buttons={dialogDeleteButtons}
        warehouse={warehouse}
        loading={isDeleting}
      />

      <DeleteWarehouseDialog
        open={unlinkDialog}
        close={() => setUnlinkDialog(false)}
        topMessage="È severamente sconsigliata questa operazione! Perderai tutti i dati riferiti a questo magazzino"
        buttons={dialogUnlinkButtons}
        loading={isUnlinking}
        warehouse={warehouse}
      />

    </div>
  )
}
