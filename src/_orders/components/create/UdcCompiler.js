import { useEffect, useState, useCallback } from "react";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { Paragraph, TinyParagraph } from "../../../globals/components/typography/paragraphs";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import TradeSelector from "../../../preOrders/components/TradeSelector";
// import CustomSupportLength from "./CustomSupportLength";
// Helpers
import { DANGER_LABELS, STANDARD_DIMENSIONS, STANDARD_DIMENSIONS_INDEXES, TRANSPORT_SUPPORTS } from "../../libs/helpers";
import { round10, toggleValues } from "../../../globals/libs/helpers";
import { toast } from "react-toastify";
// Icons
import { FiBookmark,  FiBox, FiCheck } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const UdcCompilerModule = ({ order, updateForm, inputQuantity, handleChangeQuantity }) => {
  const {
    support,
    size,
    temperature,
    grossWeight,
    netWeight,
    packages,
    warnings,
    stackable,
    perishable,
    orderNumber,
    trades
  } = order;

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <label htmlFor="orderNumber" className="label">Numero ordine</label>
          <input
            type="text"
            name="orderNumber"
            id="orderNumber"
            value={orderNumber}
            onChange={updateForm}
            className="input w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-2 w-full">
          <div>
            <label className="label mt-2" htmlFor="support">Scegli il supporto di carico</label>
            <select className="input w-full" defaultValue={support} name="support" onChange={updateForm}>
              { Object.keys(TRANSPORT_SUPPORTS).map(sup => ( 
                <option key={sup} value={sup}>
                  {TRANSPORT_SUPPORTS[sup]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-4 md:col-span-2 w-full">
          <label className="label mt-2" htmlFor="support">Seleziona la dimensione</label>
          <select className="input w-full" defaultValue={size} name="size" onChange={updateForm}>
            {  Object.keys(STANDARD_DIMENSIONS[support]).map((stnd_dim, index) => ( 
              <option key={stnd_dim} value={index}>
                {STANDARD_DIMENSIONS[support][stnd_dim].text}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <FormBoundNumber
            label="Quantità"
            error={null}
            min={0}
            max={999}
            onChange={val => handleChangeQuantity(val)}
            inputValue={inputQuantity}
            styles="w-full"
            inputStyle="w-full flex-1"
          />
        </div>
      </div>

      <div className="flex mt-4 max-w-full">
        <div className="mr-2 flex-1 flex-wrap">
          <label className="label" htmlFor="grossWeight">Peso lordo</label>
          <input type="number" name="grossWeight" id="grossWeight" onChange={updateForm} value={grossWeight} className="input w-full" />
        </div>
        <div className="ml-2 flex-1">
          <label className="label" htmlFor="netWeight">Peso netto</label>
          <input type="number" name="netWeight" id="netWeight" onChange={updateForm} value={netWeight} className="input w-full" />
        </div>

        <div className="ml-2 flex-1">
          <label className="label" htmlFor="temperature">Temperatura (°C)</label>
          <input type="number" name="temperature" id="temperature" onChange={updateForm} value={temperature} className="input w-full" />
        </div>

        <div className="ml-2 flex-1">
          <label className="label" htmlFor="packages">N. colli</label>
          <input type="number" name="packages" id="packages" onChange={updateForm} value={packages} className="input w-full" />
        </div>
      </div>

      <div className="mt-4">
        <Checkbox
          id={'stackable'}
          name={`stackable`}
          label={`Unità sovrapponibile`}
          value={stackable}
          initialStatus={stackable}
          onChange={() => updateForm({ target: { name: "stackable", type: "checkbox", value: null }})}
          labelStyle="mt-2 text-lg "
        />

        <Checkbox
          id={'perishable'}
          name={`perishable`}
          label={`Contiene merce deperibile`}
          value={perishable}
          initialStatus={perishable}
          onChange={() => updateForm({ target: { name: "perishable", type: "checkbox", value: null }})}
          labelStyle="mt-2 text-lg "
        />
      </div>

      <div className="flex flex-col mt-6">
        <SmallTitle className="flex flex-row items-center">
          <FiBookmark className="mr-1 inline-block -translate-y-[2px]" />
          <span>Etichette di sicurezza</span>
        </SmallTitle>

        <ul className="mt-2 flex justify-start flex-wrap">
          { Object.keys(DANGER_LABELS).map(dl => (
            <li 
              key={DANGER_LABELS[dl].img}
              className={`flex items-center my-2 mr-2 cursor-pointer ${warnings.includes(dl) ? "opacity-100" : "opacity-50"} group`}
              onClick={() => toggleValues({
                value: dl, 
                values: warnings, 
                onChange: (value) => updateForm({ target: { name: "warnings", type: "checkbox_group", value }})
              })}
            >
              <div className="relative w-[40px] h-[40px]">
                { warnings.includes(dl) && (
                  <span className="absolute left-0 top-0 flex items-center justify-center z-10 w-6 h-6 rounded-full overflow-hidden bg-emerald-500 -translate-x-2 -translate-y-2">
                    <FiCheck className="text-light-300" />
                  </span>
                )}
                <img src={DANGER_LABELS[dl].img} alt={DANGER_LABELS[dl].text} className="w-full rounded-full overflow-hidden border-2 border-transparent dark:border-transparent group-hover:border-light-50 dark:group-hover:border-dark-50" />
              </div>
              <p className="ml-2">{DANGER_LABELS[dl].text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mt-6">
        <SmallTitle className="flex relative">
          <MdOutlineCategory className="mr-1 text-xl inline-block -translate-y-1" />
          <span>Ambito di trasporto</span>
        </SmallTitle>
        <TradeSelector
          label="Seleziona il settore corretto"
          selectedTrades={trades}
          setSelectedTrades={(callback) => updateForm({ target: { name: "trades", type: "trades", value: callback() }})}
          // setSelectedTrades={(value) => console.log(value)}
        />
      </div>
    </>
  )
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function UdcCompiler({ order, LDMFromOthers, estimatedLDM, loadingMeterLimit, updateForm, showCompiler }) {
  const [ inputQuantity, setInputQuantity ] = useState(order.quantity); 
  const [ quantityLoadingMeter, setQuantityLoadingMeter ] = useState(null);
  const { support, size } = order;

  const handleChangeQuantity = useCallback((inputQuantity) => {
    // If data get from remote it's a string (es. CP1 - 100x120), else it is a number that correspond to index of options
    const sizeValue = parseInt(size);
    
    const sizeIndex = typeof sizeValue === "string"
      ? STANDARD_DIMENSIONS_INDEXES[support].findIndex(el => el === sizeValue)
      : sizeValue;
    
    // Escape when sizeIndex get -1
    if(sizeIndex < 0) return null;
    
    // Recalculate loading meter
    const calculateLoadingMeter = parseFloat(
      (STANDARD_DIMENSIONS[support][sizeIndex].values
        .reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * inputQuantity
      ).toFixed(2)
    );

    console.groupCollapsed("Check LDM calc")
    console.log("Input size", size);
    console.log("Size forced to number", sizeValue);
    console.log("Size typeof", typeof sizeValue);
    console.log("Support...", support)
    console.log("StandardDimensions...", { STANDARD_DIMENSIONS })
    console.log("STANDARD_DIMENSIONS_INDEXES[support]", STANDARD_DIMENSIONS_INDEXES[support]);
    console.log("SizeIndex...", sizeIndex)
    console.log("Total...", STANDARD_DIMENSIONS[support][sizeIndex].values)
    console.log("Calculate loadingMeter", calculateLoadingMeter);
    console.groupEnd();

    if(calculateLoadingMeter <= (round10((parseFloat(loadingMeterLimit) - parseFloat(LDMFromOthers)), - 1))) {
      setInputQuantity(inputQuantity);
      setQuantityLoadingMeter(calculateLoadingMeter);
    } else {
      setInputQuantity(inputQuantity);
      setQuantityLoadingMeter(calculateLoadingMeter);
      if(showCompiler) {
        if(loadingMeterLimit !== 0) {
          toast.warn(`La quantità selezionata supera gli slot dichiarati in fase di ritiro.
          Indicati ${(parseFloat(calculateLoadingMeter) + parseFloat(LDMFromOthers)).toFixed(2)} LDM su un limite di ${loadingMeterLimit} LDM`);
        }
      }
    }
  }, [support, size, LDMFromOthers, loadingMeterLimit, showCompiler]);

  useEffect(() => {
    updateForm({ target: { name: "size", type:"select", value: 0 }});
  }, [support, updateForm]);
  
  useEffect(() => {
    updateForm({ target: { name: "quantity", type: "number", value: inputQuantity }});
    updateForm({ target: { name: "loadingMeter", type: "number", value: quantityLoadingMeter }});
  }, [quantityLoadingMeter, updateForm]);

  useEffect(() => {
    handleChangeQuantity(inputQuantity);
  }, [support, size, inputQuantity]);

  useEffect(() => {
    setInputQuantity(order.quantity);
  }, [order.quantity])
  
  return (
    <>
      <SmallTitle styles="flex items-center justify-between mb-4">
        {/* <img src={deliveryIcon} className='w-[30px] mr-2' /> */}
        <div className="flex items-center">
          <FiBox className="text-lg mr-1" />
          <span>Info unità di carico</span>
        </div>
        { showCompiler && (
          <div>
            <TinyParagraph styles={estimatedLDM > loadingMeterLimit ? "text-red-500 dark:text-red-200" : ""}>
              {estimatedLDM.toFixed(1)} / {loadingMeterLimit == 0 ? estimatedLDM.toFixed(1) : loadingMeterLimit} LDM
            </TinyParagraph>
          </div>
        )}
      </SmallTitle>

      { showCompiler 
        ? <UdcCompilerModule 
          order={order}
          updateForm={updateForm}
          handleChangeQuantity={handleChangeQuantity}
          inputQuantity={inputQuantity}
          quantityLoadingMeter={quantityLoadingMeter}
        />
        : <Paragraph styles="alert-info px-4 mt-4">
            Indica le informazioni di consegna per procedere
          </Paragraph>
      }
    </>
  )
}

export default UdcCompiler;