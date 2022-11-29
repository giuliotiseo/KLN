import PalletLoadUnloadForm from "../form/PalletLoadUnloadForm"

export default ({ palletHandling, changeEditorData }) => {
  return (
    <div className="flex items-start">
      <PalletLoadUnloadForm
        title="Carica"
        compliantValue={palletHandling.loadQuantity}
        compliantFeatures={null}
        compliantNote={palletHandling.loadNote}
        disposableValue={palletHandling.disposableLoad}
        disposableFeatures={null}
        disposableNote={palletHandling.disposableLoadNote}
        onChangeCompliant={(value) => changeEditorData({ id: "loadQuantity", value })}
        onChangeCompliantNote={(value) => changeEditorData({ id: "loadNote", value })}
        onChangeDisposable={(value) => changeEditorData({ id: "disposableLoad", value })}
        onChangeDisposableNote={(value) => changeEditorData({ id: "disposableLoadNote", value })}
        className="mr-2"
      />

      <PalletLoadUnloadForm
        title="Scarica"
        compliantValue={palletHandling.unloadQuantity}
        compliantFeatures={null}
        compliantNote={palletHandling.unloadNote}
        disposableValue={palletHandling.disposableUnload}
        disposableFeatures={null}
        disposableNote={palletHandling.disposableUnloadNote}
        onChangeCompliant={(value) => changeEditorData({ id: "unloadQuantity", value })}
        onChangeCompliantNote={(value) => changeEditorData({ id: "unloadNote", value })}
        onChangeDisposable={(value) => changeEditorData({ id: "disposableUnload", value })}
        onChangeDisposableNote={(value) => changeEditorData({ id: "disposableUnloadNote", value })}
      />
    </div>
  )
}