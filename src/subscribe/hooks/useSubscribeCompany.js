import { useState } from "react";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSubscribeValidation from "./useSubscribeValidations";
import { selectSubscribeCompany, selectSubscribeWarehousesList } from "../slices/subscribeSlice";
import { generateCompanyCode } from "../../globals/libs/generators";
import { formatWindowsToDynamoDb, generateLegacyPublicLogList, removeSpacesFromString, formatLocationCoords } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";
import { SUBSCRIBE_COMPANY_BY_EXT_FORM, SUBSCRIBE_WAREHOUSE_BY_EXT_FORM } from "../api/graphql/mutations";
import { v4 } from "uuid";
import { toast } from "react-toastify";

export default function useSubscribeCompany() {
  const [ loading, setLoading ] = useState(false);
  const [ companyResult, setCompanyResult ] = useState(null);
  const [ warehousesResult, setWarehousesResult ] = useState([]);
  const companyToSubscribe = useSelector(selectSubscribeCompany);
  const warehousesToSubscribe = useSelector(selectSubscribeWarehousesList);
  const { companyErrors, warehousesErrors, verifyFields } = useSubscribeValidation(companyToSubscribe, warehousesToSubscribe);  
  const navigate = useNavigate();

  async function handleSubscribe() {
    setLoading(true);

    // Controlla i valori di company
    let company = { ...companyToSubscribe };
    let warehouses = [ ...warehousesToSubscribe ];
    let c_result = null;
    let w_results = [];
  
    // Validazione azienda
    verifyFields();
  
    if(companyErrors?.length > 0 || warehousesErrors?.length > 0) {
      setLoading(false);
      console.error("Error: ", { errors: { company: companyErrors, warehouses: warehousesErrors }});
      throw new Error("Validation fails", { errors: { company: companyErrors, warehouses: warehousesErrors }});
    }
  
    // Inizializzazione ids azienda
    const raw_companyId = `${removeSpacesFromString(company.vatNumber.toUpperCase())}-${company.location.place_id}`;
    const companyId = await digestMessage(raw_companyId);
    const companyCode = generateCompanyCode(company.name);
    const generatedLog = await generateLegacyPublicLogList({
      list: [],
      action: "Registrazione azienda",
      subject: "eseguita attraverso modulo esterno di compilazione",
    });
  
    // Creazione dell'azienda
    try {
      company = {
        id: companyId,
        companyCode,
        name: company.name,
        vatNumber: company.vatNumber,
        fiscalCode: company.fiscalCode,
        city: company.location.city,
        address: company.location.address,
        location: {
          ...company.location,
          coordinate: company?.location?.coordinate
          ? formatLocationCoords(company?.location.coordinate)
          : null
        },
        pec: company?.pec,
        uniqueCode: company?.uniqueCode,
        emails: company.emails.filter(email => email.name && email.value),
        phones: company.phones.filter(phone => phone.name && phone.value),
        trades: company?.trades?.length > 0
          ? company?.trades?.map(trade => trade.text)
          : [],
        owner: "NOT_OWNED",
        log: generatedLog,
        type: "CLIENT",
      }

      console.log('Azienda che creo: ', company);

      c_result = await API.graphql(({
        query: SUBSCRIBE_COMPANY_BY_EXT_FORM, 
        variables: { input: company }, 
        authMode: 'API_KEY'
      }));

      setCompanyResult(c_result);
    } catch (err) {
      setLoading(false);
      console.error(err);
      throw new Error(err);
    }
  
    // Inizializzazione ids magazzini
    for(let warehouse of warehouses) {
      const extId = v4();
      const raw_warehouseId = `${removeSpacesFromString(company.vatNumber.toUpperCase())}-${warehouse.location.place_id}-${extId}`;
      const warehouseId = await digestMessage(raw_warehouseId);
      const generatedLog = await generateLegacyPublicLogList({
        list: [],
        action: "Registrazione magazzino",
        subject: "eseguita attraverso modulo esterno di compilazione",
      });
  
      console.log({ extId, raw_warehouseId, warehouseId, generatedLog });

      // Creazione dell'azienda
      try {
        const warehouseToSubscribe = {
          id: warehouseId,
          extId,
          companyId,
          name: warehouse.name,
          searchable: `${warehouse.name.toLowerCase()} ${warehouse.location.address.toLowerCase()}`,
          type: warehouse.type,
          location: {
            ...warehouse?.location,
            coordinate: warehouse?.location?.coordinate
              ? formatLocationCoords(warehouse?.location.coordinate)
              : null
          },
          status: "ACTIVE",
          windows: formatWindowsToDynamoDb(warehouse.windows),
          log: generatedLog,
          maxLength: warehouse?.maxLength,
          specialization: warehouse?.specialization,
          scope: warehouse?.scope,
          tools: warehouse?.tools,
          automationLevel: warehouse?.automationLevel,
          owner: "NOT_OWNED",
          tenant: "NOT_OWNED",
          isDeposit: warehouse?.scope?.includes("DEPOSITO") ? 1 : 0,
          isInter: warehouse?.scope?.includes("INTERMEDIO") ? 1 : 0,
          isHub: warehouse?.scope?.includes("DISTRIBUZIONE") ? 1 : 0,
          isLinked: 0,
          cargoBay: warehouse?.cargoBay || 0,
          trades: warehouse?.trades || [],
          containerUnloading: warehouse?.containerUnloading || false,
          note: warehouse?.note
        }
  
        console.log('Magazzino che creo: ', company);

        const warehouseResult = await API.graphql(({
          query: SUBSCRIBE_WAREHOUSE_BY_EXT_FORM, 
          variables: { input: warehouseToSubscribe }, 
          authMode: 'API_KEY'
        }));

        w_results.push(warehouseResult);
      } catch (err) {
        setLoading(false);
        console.error(err);
        throw new Error(err);
      }
    }

    setWarehousesResult(w_results);
    setLoading(false);
    toast.success(`Operazione eseguita con successo`);
    navigate('/subscribe/greetings');
  }

  return {
    company: companyResult,
    warehouses: warehousesResult,
    subscribe: handleSubscribe,
    loading,
    companyErrors,
    warehousesErrors,
  }
}