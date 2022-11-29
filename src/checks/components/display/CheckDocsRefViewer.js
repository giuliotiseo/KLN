import DocsCompiler from "../../../orders/components/form/DocsCompiler";

export default function CheckDocsRefViewer({
  order,
  showAttachments
}) {
  return (
    <DocsCompiler
      order={order}
      showCompiler={true}
      showAttachments={showAttachments}
      updateForm={false}
    />
  )
}