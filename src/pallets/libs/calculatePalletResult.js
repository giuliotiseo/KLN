/*
  Formula usata per calcolo Report:
  // Possibili combinazioni MultiplierRole
  MultiplierRole = {
    VETTORE: -1;
    CLIENTE: 1;
    VETTORE/OPERATORE (STORNO): 1;
    STORNATO: -1 
  }

  TRADE = [(Load * MultiplierRole) - (Unload * MultiplierRole) + (Reversal * MultiplierRole)];
  REVERSAL = Reveral * MultiplierRole;
*/

const multiplierRole = {
  TRADE: {
    carrier: -1,
    customer: 1,
    reversal: 0,
  },
  REVERSAL: {
    carrier: 1,
    customer: 0,
    reversal: -1,
  }
}

export function getRoleFromPalletHandling(pallet, currentCompanyId) {
  const allRoles = ["carrier", "customer", "reversal"];
  const companiesIds = [pallet.carrierId, pallet.customerId, pallet.reversalId];
  const role = allRoles[companiesIds.indexOf(currentCompanyId)];
  return role;
}

const formulaTrade = (pallet, mpRole) => ((pallet.loadQuantity * mpRole) - (pallet.unloadQuantity * mpRole)) + (pallet?.reversalQuantity || 0 * mpRole);
const formulaTradeReversal = (pallet, mpRole) => ((pallet.loadQuantity * mpRole) - (pallet.unloadQuantity * mpRole)) - (pallet?.reversalQuantity || 0 * mpRole);
const formulaReversal = (pallet, mpRole) => pallet.reversalQuantity * mpRole;

export function calculatePalletResultFromTrade(pallets, companyId) {
  let result = 0;
  
  for(let pallet of pallets) {
    const roleInPalletHandling = getRoleFromPalletHandling(pallet, companyId);
    const mpRole = multiplierRole[pallet.type][roleInPalletHandling];

    console.log("Calcolo:",{
      id: pallet.id,
      text: `((${pallet.loadQuantity} * ${mpRole}) - (${pallet.unloadQuantity} * ${mpRole})) + (${pallet.reversalQuantity} * ${mpRole})`,
      res: formulaTrade(pallet, mpRole)
    })

    /*
      All'interno di queste movimentazioni sono presenti, nel caso di chiamate effettuate da vettore,
      anche gli storni che quel vettore ha registrato. Per questo motivo occorre differenziare le formule
      perché ne occorre una che va a sottrarre il valore stornato all'azienda cliente, così da annullare
      il credito
    */

    if(pallet.type === "TRADE") {
      const handlingResult = formulaTrade(pallet, mpRole);
      result += handlingResult;
    } else if(pallet.type ==="REVERSAL") {
      if(roleInPalletHandling === "carrier") {
        const handlingResult = formulaTradeReversal(pallet, mpRole);
        result += handlingResult;
      } else {
        const handlingResult = formulaTrade(pallet, mpRole);
        result += handlingResult;
      }
    }
  }

  return result;
}

export function calculatePalletResultFromReversal(pallets, companyId) {
  let result = 0;

  for(let pallet of pallets) {
    const roleInPalletHandling = getRoleFromPalletHandling(pallet, companyId);
    const mpRole = multiplierRole[pallet.type][roleInPalletHandling];
    const handlingResult = formulaReversal(pallet, mpRole);
    result += handlingResult;
  }

  return result;
}