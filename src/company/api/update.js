import { API, graphqlOperation, Storage } from 'aws-amplify';
import { toast } from 'react-toastify';
import { consoleSuccess, generateFileObj, generateLegacyLogList } from '../../globals/libs/helpers';
// Mutations
import { UPDATE_COMPANY_INFO } from './graphql/mutations';

export async function updateCompanyInfo(company, logo, prevCompany) {
  let logoRecord = null;
  console.groupCollapsed('Logo changes LOG');
  console.log('Company in entrata', company);
  console.log('Logo in entrata', logo);

  // Controllo esistenza di un logo precedente
  if(prevCompany?.logo?.timestamp) {
    console.log('Rilevato logo esistente');
    // Se il logo precedente è diverso da quello attuale
    if((prevCompany.logo.timestamp !== logo?.timestamp) || !logo?.timestamp) {
      // Se nel logo attuale è presente un file
      if(logo?.file) {
        // Genera un nuovo id
        const keyNameFile = company.vatNumber;
        // Inserisci l'immagine nell'S3
        await Storage.put(keyNameFile, logo.file, {
          level: 'public',
          contentType: company.fileType
        }).then(async () => {
          consoleSuccess('Immagine caricata correttamente su S3', keyNameFile);
        }).catch(err => {
          console.error('Errore nel caricamento dell\'immagine', err);
          throw new Error("Error while loading logo");
        });
        // Genero il valore da inviare al DB
        logoRecord = await generateFileObj(keyNameFile, logo.fileType);
        console.log('Vedo il logo record', logoRecord);
      } else { // Se il logo è diverso e nel nuovo non è presente un file
        await Storage.remove(prevCompany.logo.key, { level: 'public' })
          .then(() => {
            consoleSuccess('Logo precedente rimosso da S3', prevCompany.logo.key)
          }).catch(err => {
          console.error(err);
          throw new Error("Error while removing logo");
        });
        // Imposto come null il valore da inviare al DB
        logoRecord = null;
        console.log('Vedo il logo record', logoRecord);
      }
      // Aggiorna il dato contenuto in contact con il nuovo logo
      company.logo = logoRecord;
      console.log('Vedo il logo record', logoRecord);
    }
  } else { // Se in precedenza non vi era un logo
    console.log('Nessun logo precedente rilevato', company);
    if(company?.logo?.timestamp) {
      if(!company?.logo.key) {
        console.log('Logo caricato localmente, pronto al caricamento', company?.logo)
        // Genera un nuovo id
        const keyNameFile = `${company.vatNumber}`;
        // Inserisci l'immagine nell'S3
        await Storage.put(keyNameFile, company?.logo.file, {
          level: 'public',
          contentType: company.fileType
        }).then(() => {
          consoleSuccess('Logo caricato con successo', keyNameFile);
        }).catch(e => {
          console.error('È stato rilevato un errore nel caricamento', e);
          throw new Error("Error while loading logo");
        });
        // Genero i valori da inviare al DB
        logoRecord = await generateFileObj(keyNameFile, logo.fileType);
        console.log('Vedo il logo record', logoRecord);
        // Aggiorna il dato contenuto in contact con il nuovo logo
        company.logo = logoRecord;
      } else { 
        // Nel caso in cui l'immagine sia già presente nel sistema (tipico nelle operazioni di sincronizzazione)
        console.log('Logo già caricato nel database e nello storage, nessuna azione richiesta');
      }
    } else {
      company.logo = null;
    }
  }
  console.groupEnd();

  // Generate logs stack
  const log = await generateLegacyLogList({
    list: prevCompany?.log || [],
    action: `Aggiornamento`, 
    subject: `informazioni aziendali di base per ${prevCompany.name} (avatar, email, telefono, codice univoco, pec)`,
  });

  const allDataObj = {
    companyId: company.companyId,
    logo: company.logo,
    email: company.email,
    phone: company.phone,
    pec: company.pec,
    uniqueCode: company.uniqueCode,
    log
  }

  const dataToSend = Object.keys(allDataObj).reduce((acc, val) => {
    if(allDataObj[val]) {
      return ({
        ...acc,
        [val]: allDataObj[val]
      })
    } else {
      return ({ ...acc })
    }
  }, {});

  dataToSend.logo = company.logo;

  // Run mutation in DynamoDB
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_COMPANY_INFO, dataToSend));
    toast.success('Info aziendali aggiornate con successo');
    consoleSuccess('Azienda aggiornata', company);
    return res?.data?.updateCompany;
  } catch(err) {
    toast.error('Errore durante l\'invio dei dati al server');  
    console.error('[E-1] Impossibile aggiornare le info aziendali', err);
    throw new Error("[E-1] Error while updating company info");
  }
}

export async function directUpdateOfCompany(company) {
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_COMPANY_INFO, company));
    return res.data.updateCompany;
  } catch(err) {
    toast.error('Errore durante l\'invio dei dati al server');  
    console.error('[E-2] Impossibile aggiornare le info aziendali', err);
    throw new Error("[E-2] Error while updating company info from other operation");
  }
}