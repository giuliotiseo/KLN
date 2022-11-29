import { useSelector } from "react-redux";
import { useOrderByIdQuery } from "../api/orders-api-slice";
import { selectOrderEditor } from "../slices/orderEditorSlice";

export default function useOrderToEdit(id) {
  const { data: selectedOrder, isFetching, isLoading } = useOrderByIdQuery({ id });
  const editorOrder = useSelector(selectOrderEditor);
  const orderToRender = {
    ...selectedOrder,
    ...editorOrder,
    originalLoadingMeter: selectedOrder?.loadingMeter || 0
  }

  return {
    order: orderToRender,
    isLoading: isLoading || isFetching,
  }
}