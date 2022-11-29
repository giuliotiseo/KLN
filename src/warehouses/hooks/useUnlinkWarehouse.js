import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteWarehouseMutation, useDeleteWarehouseLinkMutation } from "../api/warehouses-api-slice";
import { toast } from "react-toastify";

// Hook ---------------------------------------------------------------------------------------------------
export default function useUnlinkWarehouse(inputWarehouse) {
  const [ deleteWarehouseLink, { isLoading }] = useDeleteWarehouseLinkMutation();
  const [ deleteWarehouse, { isLoading: isDeleting }] = useDeleteWarehouseMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const navigate = useNavigate();

  const handleUnlinkWarehouse = useCallback(async () => {
    setInternalLoading(true);
    try {
      const result = await deleteWarehouse(inputWarehouse.id);
      if (result) {
        await deleteWarehouseLink(inputWarehouse.warehouseLinkId);
      } else {
        throw new Error('Errore durante la rimozione del magazzino')
      }

      navigate('/warehouses');
    } catch (err) {
      console.error("Errore:", err);
      toast.error("Errore durante la rimozione del magazzino");
      setInternalLoading(false);
    }
  }, [inputWarehouse]);

  return [
    handleUnlinkWarehouse,
    {
      isLoading: isLoading || isDeleting || internalLoading,
    }
  ]
}