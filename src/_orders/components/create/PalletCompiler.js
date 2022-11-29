import { useState, useEffect } from "react";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import ActionButton from "../../../globals/components/buttons/ActionButton";
// Helpers
import { PalletType, STANDARD_DIMENSIONS } from "../../libs/helpers";
// Icons
import { ImStack } from "react-icons/im";
import { FiArrowDown, FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import { SystemInterchange } from "../../../globals/libs/models";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const defaultPallet = { size: "", value: 1, type: PalletType.EPAL, system: "" };

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PalletInfoType = ({ pallets, type, removePalletTypeRow }) => {
  if(pallets?.length <= 0) return <Paragraph styles="italic">Nessun pallet per la tipologia {type}</Paragraph>

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
            <Paragraph>{pallet.value} bancali, tipo: {pallet.size}</Paragraph>
          </div>
          { pallet?.system && <SmallParagraph styles="ml-6">Interscambio: <b>{SystemInterchange[pallet.system].toLowerCase()}</b></SmallParagraph> }
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
      { Object.keys(PalletType).map(plt_type => <option key={plt_type}>{plt_type}</option>)}
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


const PalletCompilerModule = ({ pallet, setPallet, availableSizes, handleUpdateForm, styles }) => {
  return (
    <div className={`${styles}`}>
      <Paragraph styles="mb-2">
        Inserisci la quantità e la tipologia di pallet impiegati per l'invio di quest'ordine
      </Paragraph>

      <div className="flex items-end">
        <FormBoundNumber
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

        <ActionButton
          icon={() => <FiArrowDown />}
          text="Inserisci"
          onClick={handleUpdateForm}
          styles="btn-primary my-2 ml-2"
        />
      </div>
    </div>
  )
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletCompiler({
  palletInfo,
  updateForm,
  showCompiler
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

    updateForm({ target: {
      type: "palletInfo",
      name: `palletInfo.${pallet.type}`,
      value: [...palletInfo[pallet.type], { 
        type: pallet.type,
        value: pallet.value,
        size: pallet.size,
        system: pallet.system
      }],
    }});

    setPallet(prev => ({...defaultPallet, type: prev.type }));
  }

  const removePalletTypeRow = ({ type, index }) => {
    updateForm({ target: {
      type: "palletInfo",
      name: `palletInfo.${type}`,
      value:  palletInfo[type].filter((_, plt_idx) => plt_idx !== index)
    }});
  }

  return (
    <div>
      <SmallTitle styles="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <ImStack className="text-lg mr-1" />
          <span>Informazioni pallet</span>
        </div>
      </SmallTitle>
      { showCompiler  
        ? <>
          <PalletCompilerModule 
            pallet={pallet}
            setPallet={setPallet}
            palletInfo={palletInfo}
            availableSizes={availableSizes}
            handleUpdateForm={handleUpdateForm}
            styles="border-b pb-4"
          />

          <div className="grid grid-cols-2 gap-4 mt-4 flex-wrap">
            { Object.keys(palletInfo).map(type => (
                <div key={type} className="col-span-1">
                  <SmallTitle styles="block">{type}</SmallTitle>
                  <PalletInfoType
                    pallets={palletInfo?.[type]} 
                    type={type}
                    removePalletTypeRow={removePalletTypeRow}
                  />
                </div>
              ))}
          </div>
        </>
        : <Paragraph styles="alert-info px-4 mt-4">
          Indica le informazioni di ritiro e consegna per procedere
        </Paragraph>
      }
    </div>
  )
}