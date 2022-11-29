import { removeDuplicates } from "../../../globals/libs/helpers";
import { renderPalletResult } from "../../libs/helpers";

const resultResponse = {
  carrier: {
    major: 'over',
    minor: 'under',
    equal: 'equal'
  }, 
  customer: {
    major: 'under',
    minor: 'over',
    equal: 'equal'
  }
}

export default function PalletCompanyQuantityResult({
  show,
  items,
  className,
  queryFrom,
}) {
  console.log("vedi qf", queryFrom);

  if(!show) return null;
  let result = 0;
  let nestedReversal = 0;
  let reversal = 0;
  const loads = items.map(item => item.loadQuantity).reduce((acc, val) => acc + val, 0);
  const unloads = items.map(item => item.unloadQuantity).reduce((acc, val) => acc + val, 0);
  
  // Check if this entity has a nested reversal (usually in case of unloading operation)
  let entityHasNestedReversal = false;
  items.forEach(entity => {
    if(entityHasNestedReversal) return;
    if(entity?.reversal?.length > 0) {
      entityHasNestedReversal = true
    }
  }); 
  
  // Put all ids inside nested in a stack to exclude
  const excludeNestedReversalIds = entityHasNestedReversal
    ? removeDuplicates(
      [].concat.apply(
        [],
        items.filter(en => en.reversal?.length > 0).map(entity => entity.reversal.map(r => r.id.split("_")[1]))
      )
    )
    : [];

  // Nel caso in cui si abbia uno scarico con diversi storni devo andare a leggere all'interno della movimentazione principale
  if(entityHasNestedReversal) {
    nestedReversal = [].concat.apply([], items
      .filter(en => en.reversal?.length > 0)
      .map(entity => entity.reversal.map(r => r.reversalQuantity))).reduce((acc, val) => acc + val, 0);
  } else {
    nestedReversal = 0;
  }
  
  // Effettuo un primo calcolo prendendo in considerazione scarichi, carici e storni annidati
  result = ( unloads - loads ) - nestedReversal;
  
  // Nel caso vi siano degli storni che non vedono l'azienda corrente come customer bensì come reversal
  reversal = items
    .filter(item => !excludeNestedReversalIds.includes(item.id))
    .map(filtered_item => filtered_item.reversalQuantity)
    .reduce((acc, val) => acc + val, 0);

  // Completo il calcolo aggiungendo tutti gli storni riferiti all'azienda corrente
  result = result + reversal;
  
  // Completo associando il valore ottenuto in result ad una variabile stringa (response)
  let response = "wait";
  if(result < 0) response = resultResponse[queryFrom].minor;
  if(result > 0) response = resultResponse[queryFrom].major;
  if(result === 0) response = resultResponse[queryFrom].equal; 

  // console.groupCollapsed("PalletCompanyQuantityResult")
  // console.log("loads raw", items)
  // console.log("unloads raw", items)
  // console.log("loads", loads)
  // console.log("unloads", unloads)
  // console.log("reversal", reversal)
  // console.groupEnd()

  return (
    <div className={className}>
      <div className={`flex items-center font-bold text-lg ${renderPalletResult[response].className}`}>
        { renderPalletResult[response].icon() }
        { renderPalletResult[response].long_text(result, nestedReversal || reversal) }
      </div>
    </div>
  )
}