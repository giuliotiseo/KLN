import { useState, useEffect } from "react";
import Button from "../../../globals/components/buttons_v2/Button";
import InputBoundNumber from "../../../globals/components/dataEntry_v2/InputBoundNumber";
// Helpers
import { PALLET_TYPES, STANDARD_DIMENSIONS } from "../../libs/constants";
// Icons
import { FiArrowDown, FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import { SystemInterchange } from "../../../globals/libs/models";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const defaultPallet = { size: "", value: 1, type: PALLET_TYPES.EPAL, system: "" };

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PalletInfoType = ({ pallets, type, removePalletTypeRow }) => {
  if(pallets?.length <= 0) return <p className="italic text-gray-500 dark:text-gray-400">Nessun pallet per la tipologia {type}</p>

  return (
    <div className="mt-2">
      {/* Here i'm in order.palletInfo.EPAL || order.palletInfo.EUR */}
      { pallets?.length && pallets?.map((pallet, palletIndex) => (
        <div key={pallet.size} className="my-1">
          <div className="flex">
            <button
              onClick={() => removePalletTypeRow({ type, index: palletIndex })}
              className="text-primary-200 dark:text-primary-300 mr-2 rotate-180 hover:text-danger-200 dark:hover:text-danger-300"
            >
              <FiDelete />
            </button>
            <p>{pallet.value} bancali, tipo: {pallet.size}</p>
          </div>
          { pallet?.system && <p className="text-sm ml-6">Interscambio: <b>{SystemInterchange[pallet.system].toLowerCase()}</b></p> }
        </div>
      ))}
    </div>
  )
}

const PalletTypeSelector = ({ type, setType }) => {
  return (
    <select
      value={type}
      onChange={({ target: { value }}) => setType(value)}
      className="input my-2 ml-2"
    >
      { Object.keys(PALLET_TYPES).map(plt_type => <option key={plt_type}>{plt_type}</option>)}
    </select>
  )
}


const PalletSizeSelector = ({ size, setSize, availableSizes }) => {
  return (
    <select
      value={size}
      onChange={({ target: { value }}) => setSize(value)}
      className="input my-2 ml-2"
    >
      <option value=""> - Dimensioni - </option>
      { availableSizes.map(item_size => <option key={item_size} value={item_size}>{item_size}</option>)}
    </select>
  )
}


const PalletSystemSelector = ({ system, setSystem, type, size }) => {
  // if(type !== "EPAL" || size !== "CP2 - 80x120") {
  //   setSystem("");
  // }

  return (
    <select
      value={system}
      onChange={({ target: { value }}) => setSystem(value)}
      className="input my-2 ml-2"
    >
      <option value=""> - Sistema - </option>
      { Object.keys(SystemInterchange)
        .filter(system => (type !== "EPAL" || size !== "CP2 - 80x120") ? system !== "PARI" : system)
        .map(system => (
          <option key={system} value={system}>{SystemInterchange[system]}</option>
        ))
      }
    </select>
  )
}


const PalletCompilerModule = ({ pallet, setPallet, availableSizes, handleUpdateForm, className = "" }) => {
  return (
    <div className={`${className}`}>
      <p className="mb-2">
        Inserisci la quantità e la tipologia di pallet impiegati per l'invio di quest'ordine
      </p>

      <div className="flex items-end">
        <InputBoundNumber
          error="Valore non ammesso"
          inputValue={pallet.value}
          onChange={(value) => setPallet(prev => ({ ...prev, value }))}
          min={1}
          max={99}
        />

        <PalletTypeSelector
          type={pallet.type}
          setType={type => setPallet(prev => ({ ...prev, type }))}
        />

        <PalletSizeSelector
          size={pallet.size}
          setSize={size => setPallet(prev => ({ ...prev, size }))}
          availableSizes={availableSizes}
        />

        <PalletSystemSelector
          type={pallet.type}
          size={pallet.size}
          system={pallet.system}
          setSystem={system => setPallet(prev => ({ ...prev, system }))}
        />

        <Button
          icon={<FiArrowDown />}
          text="Inserisci"
          onClick={handleUpdateForm}
          className="btn-primary my-2 ml-2"
        />
      </div>
    </div>
  )
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletCompiler({
  palletInfo,
  updateForm,
  addPalletInfo,
  removePalletInfo,
  showCompiler,
}) {
  const [ pallet, setPallet ] = useState(defaultPallet);
  const [ availableSizes, setAvailableSizes ] = useState(STANDARD_DIMENSIONS["PALLET"].map(el => el.text));

  useEffect(() => {
    if(pallet.type && palletInfo[pallet.type]?.length > 0) {
      const selectedSizes = palletInfo[pallet.type].map(el => el.size);
      setAvailableSizes(() => STANDARD_DIMENSIONS["PALLET"].map(el => el.text).filter(dim => !selectedSizes.includes(dim)))
    } else {
      if(pallet.type && palletInfo[pallet.type]?.length === 0) {
        setAvailableSizes(STANDARD_DIMENSIONS["PALLET"].map(el => el.text));
      }
    }
  }, [pallet.type, palletInfo]);


  const handleUpdateForm = () => {
    if(!pallet.type) {
      toast.error("Devi selezionare un tipo di pallet");
      return null;
    };

    if(!pallet.size) {
      toast.error("Devi selezionare un dimensione standard del supporto");
      return null;
    };

    if(!pallet.system) {
      toast.error("Devi selezionare un sistema di interscambio");
      return null;
    };

    addPalletInfo({
      type: pallet.type,
      value: pallet.value,
      size: pallet.size,
      system: pallet.system
    });

    setPallet(prev => ({...defaultPallet, type: prev.type }));
  }

  const removePalletTypeRow = ({ type, index }) => {
    removePalletInfo({ type, index });
  }

  return (
    <div>
      <h4 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600 border-b">
        Informazioni pallet
      </h4>
      { showCompiler  
        ? <>
          <PalletCompilerModule 
            pallet={pallet}
            setPallet={setPallet}
            palletInfo={palletInfo}
            availableSizes={availableSizes}
            handleUpdateForm={handleUpdateForm}
          />

          <div className="flex flex-wrap gap-4 py-4">
            { Object.keys(palletInfo).map(type => (
                <div key={type} className="pr-4 first:border-r">
                  <h5 className="title-5">{type}</h5>
                  <PalletInfoType
                    pallets={palletInfo?.[type]} 
                    type={type}
                    removePalletTypeRow={removePalletTypeRow}
                  />
                </div>
              ))}
          </div>
        </>
        : <p className="alert-info px-4 mt-4">
          Indica le informazioni di ritiro e consegna per procedere
        </p>
      }
    </div>
  )
}