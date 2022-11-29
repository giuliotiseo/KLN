import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVehicleByIdQuery, useDeleteVehicleMutation } from "../api/vehicles-api-slice";
import Button from "../../globals/components/buttons_v2/Button";
import DeleteVehicleDialog from "../components/viewer/DeleteVehicleDialog";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import VehicleDataViewer from "../components/viewer/VehicleDataViewer";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { toast } from "react-toastify";

export default function VehicleViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data, isLoading, isFetching } = useVehicleByIdQuery({ id });
  const [ deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();
  const navigate = useNavigate();

  // Delete callback function
  const handleDeleteVehicle = useCallback(async () => {
    try {
      await deleteVehicle(id);
      toast.success("Veicolo eliminato dalla rubrica");
      navigate("/vehicles");
    } catch(err) {
      toast.error("Abbiamo riscontrato un errore durante l'eliminazione del veicolo");
      console.error(err);
    }
  }, [id]); 

  const dialogDeleteButtons = [{ text: "Conferma", disabled: isDeleting, onClick: handleDeleteVehicle }];

  if(!data || isLoading || isFetching) return <PageSpinner message="Ricerca veicolo in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col lg:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SimpleMap
            lat={data?.lastPosition?.coordinate?.[0] || null}
            lng={data?.lastPosition?.coordinate?.[1] || null}
            onClick={null}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <VehicleDataViewer vehicle={data} />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Visualizzazione veicolo</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Elimina"
            onClick={() => setDeleteDialog(true)}
          />

          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/vehicles/edit?id=${id}`}
          />
        </div>
      </footer>

      <DeleteVehicleDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo contatto"
        buttons={dialogDeleteButtons}
        vehicle={data}
        loading={isDeleting}
      />

    </div>
  )
}
