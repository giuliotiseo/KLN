import { useSelector } from "react-redux";
import { usePreOrderByIdQuery } from "../api/pre-orders-api-slice";
import { selectPreOrderEditor } from "../slices/preOrderEditorSlice";

export default function usePreOrderToEdit(id) {
  const { data: selectedPreOrder, isFetching, isLoading } = usePreOrderByIdQuery({ id });
  const editorPreOrder = useSelector(selectPreOrderEditor);
  const preOrderToRender = {
    ...selectedPreOrder,
    ...editorPreOrder
  }

  return {
    preOrder: preOrderToRender,
    isLoading: isLoading || isFetching,
  }
}