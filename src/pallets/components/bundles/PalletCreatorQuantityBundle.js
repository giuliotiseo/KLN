import { useDispatch, useSelector } from "react-redux";
import PalletLoadUnloadForm from "../form/PalletLoadUnloadForm";
import PalletReversalForm from "../form/PalletReversalForm";
import {
  changePalletCreatorDisposableLoad,
  changePalletCreatorDisposableLoadNote,
  changePalletCreatorDisposableUnload,
  changePalletCreatorDisposableUnloadNote,
  changePalletCreatorLoad,
  changePalletCreatorLoadNote,
  changePalletCreatorReversal,
  changePalletCreatorReversalNote,
  changePalletCreatorReversalQuantity,
  changePalletCreatorUnload,
  changePalletCreatorUnloadNote,
  selectPalletCreatorBadgeStatus
} from "../../slices/palletCreatorSlice";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------
export default function PalletCreatorQuantityBundle({
  loads,
  unloads,
  reversal,
  hasDelivery,
  companiesPalletInfo,
}) {
  const isManualChanges = useSelector(selectPalletCreatorBadgeStatus);
  const dispatch = useDispatch();
  // Loading
  const loadingValue = loads?.COMPLIANT?.value;
  const loadingFeature = loads?.COMPLIANT?.features;
  const loadingNote = loads?.COMPLIANT?.note;
  const disposableLoadingValue = loads?.DISPOSABLE?.value;
  const disposableLoadingFeature = loads?.DISPOSABLE?.features;
  const disposableLoadingNote = loads?.DISPOSABLE?.note;
  // Unloading
  const unloadingValue = unloads?.COMPLIANT?.value;
  const unloadingFeature = unloads?.COMPLIANT?.features;
  const unloadingNote = unloads?.COMPLIANT?.note;
  const disposableUnloadingValue = unloads?.DISPOSABLE?.value;
  const disposableUnloadingFeature = unloads?.DISPOSABLE?.features;
  const disposableUnloadingNote = unloads?.DISPOSABLE?.note;

  return (
    <section>
      <div className="flex items-start">
        <PalletLoadUnloadForm
          title="Carica"
          compliantValue={loadingValue}
          compliantFeatures={loadingFeature}
          compliantNote={loadingNote}
          disposableValue={disposableLoadingValue}
          disposableFeatures={disposableLoadingFeature}
          disposableNote={disposableLoadingNote}
          onChangeCompliant={(value) => dispatch(changePalletCreatorLoad(value))}
          onChangeCompliantNote={(value) => dispatch(changePalletCreatorLoadNote(value))}
          onChangeDisposable={(value) => dispatch(changePalletCreatorDisposableLoad(value))}
          onChangeDisposableNote={(value) => dispatch(changePalletCreatorDisposableLoadNote(value))}
          className="mr-2"
        />

        <PalletLoadUnloadForm
          title="Scarica"
          compliantValue={unloadingValue}
          compliantFeatures={unloadingFeature}
          compliantNote={unloadingNote}
          disposableValue={disposableUnloadingValue}
          disposableFeatures={disposableUnloadingFeature}
          disposableNote={disposableUnloadingNote}
          showAlert={!isManualChanges}
          onChangeCompliant={(value) => dispatch(changePalletCreatorUnload(value))}
          onChangeCompliantNote={(value) => dispatch(changePalletCreatorUnloadNote(value))}
          onChangeDisposable={(value) => dispatch(changePalletCreatorDisposableUnload(value))}
          onChangeDisposableNote={(value) => dispatch(changePalletCreatorDisposableUnloadNote(value))}
        />
      </div>

      { hasDelivery && (
        <PalletReversalForm
          title="Storno"
          reversal={reversal}
          companiesPalletInfo={companiesPalletInfo}
          onChangeReversalValue={payload => dispatch(changePalletCreatorReversalQuantity(payload))}
          onChangeReversalNote={payload => dispatch(changePalletCreatorReversalNote(payload))}
          isBadge={isManualChanges}
        />
      )}
    </section>
  )
}