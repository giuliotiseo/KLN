import { toast } from "react-toastify";
import { removeSpacesFromString, ROLES } from "../../globals/libs/helpers";
import { stringGen } from "../../globals/libs/generators";

// Constants ----------------------------------------------------------------------------------------------------------------------------------
export const COMPANY_TYPES = ["TRANSPORT", "CLIENT"];
export const COMPANY_ROLES = [ "ADMIN", "WAREHOUSE", "DRIVE", "ACCOUNTING", "LOGISTICS" ]

// Descriptions ----------------------------------------------------------------------------------------------------------------------------------
export const COMPANY_TYPES_DESC = {
  TRANSPORT: "Azienda di trasporto",
  CLIENT: "Azienda cliente"
} 

export const COMPANY_ROLES_DESC = {
  ADMIN: "Amministrazione",
  WAREHOUSE: "Magazzini",
  DRIVE: "Trasporto mezzi",
  ACCOUNTING: "Contabilità",
  LOGISTICS: "Logistica",
}

// Formatters ----------------------------------------------------------------------------------------------------------------------------------
export const formatUserToAccount = (user) => ({
  'username': user.username,
  'password': user.password,
  attributes: {
    'custom:vatNumber': user.vatNumber,
    'custom:companyName': user.companyName,
    'custom:companyCity': user.city,
    'custom:companyAddress': user.address,
    'custom:companyProvince': user.location?.province || "",
    'custom:companyPlaceId': user.location.place_id,
    'custom:companyType': user.companyType,
    'custom:companyEmail': user.email,
    'custom:companyPhone': user.phone,
    'email': user.username,
    'name': `${user.profileName.toLowerCase()} ${user.profileSurname.toLowerCase()}`,
    'custom:companyFiscalCode': user.companyFiscalCode,
    'custom:profileName': user.profileName,
    'custom:profileSurname': user.profileSurname,
    'custom:profileRoleId': user.profileRole.toString() !== ROLES.ADMIN.toString() ? `${ROLES.ADMIN.toString()},${user.profileRole.toString()}` : user.profileRole.toString(),
    'custom:profileFiscalCode': user.profileFiscalCode,
  }
});

// Generators ----------------------------------------------------------------------------------------------------------------------------------
export const generateCompanyCode = (companyName) => {
  let stringCode_1 = "";
  const stringCode_2 = Math.floor(Math.random()*90000) + 10000;

  if(companyName.length <= 5) {
    if(companyName.length < 5) {
      const missings = 5 - companyName.length;
      stringCode_1 = companyName.concat(stringGen(missings));
    } else {
      stringCode_1 = companyName;
    }
  } else {
    const noSpaceName = removeSpacesFromString(companyName.toUpperCase());
    const vowels = noSpaceName.match(/[AEIOU]/gi)?.length > 0 ? noSpaceName.match(/[AEIOU]/gi).join("") : "";
    const consonants = noSpaceName.match(/[BCDFGHJKLMNPQRSTVWXYZ]/gi)?.length > 0 ? noSpaceName.match(/[BCDFGHJKLMNPQRSTVWXYZ]/gi).join("") : "";
  
    if(consonants?.length >= 5) {
      stringCode_1 = consonants.slice(0,5);
    } else {
      stringCode_1 = consonants;
      const missings = 5 - consonants?.length;
      if(vowels?.length >= missings) {
        stringCode_1 = stringCode_1.concat(vowels.slice(0, missings));
      } else {
        stringCode_1 = stringCode_1.concat(stringGen(missings))
      }
    }
  }

  return `${stringCode_1}#${stringCode_2}`;
}

// Validations ----------------------------------------------------------------------------------------------------------------------------------
export function validateSignUpAccount(user) {
  let validation = [];
  if(!user?.username) {
    toast.error("Inserisci username");
    validation.push("username");
  }

  if(!user?.password) {
    toast.error("Inserisci password");
    validation.push("password");
  }

  if(!user?.confirmPassword) {
    toast.error("Conferma la password");
    validation.push("confirmPassword");
  }

  if(user?.password && user?.confirmPassword) {
    if(user.password !== user.confirmPassword) {
      toast.error("Password di conferma non corrispondente");
      validation.push("confirmPassword");
      validation.push("password");
    }
  }

  if(!user?.email) {
    toast.error("Inserisci email aziendale");
    validation.push("email");
  }

  if(!user?.phone) {
    toast.error("Inserisci telefono aziendale");
    validation.push("phone");
  }

  if(!user?.companyName) {
    toast.error("Inserisci ragione sociale");
    validation.push("companyName");
  }

  if(!user?.vatNumber) {
    toast.error("Inserisci partita IVA");
    validation.push("vatNumber");
  }

  if(!user?.companyFiscalCode) {
    toast.error("Inserisci codice fiscale dell'impresa");
    validation.push("companyFiscalCode");
  }

  if(!user?.address) {
    toast.error("Inserisci l'indirizzo della sede principale dell'attività");
    validation.push("address");
  }

  if(!user?.city) {
    toast.error("Inserisci la città dove è situata la sede principale dell'attività");
    validation.push("city");
  }

  if(!user?.profileName) {
    toast.error("Inserisci il tuo nome");
    validation.push("profileName");
  }

  if(!user?.profileSurname) {
    toast.error("Inserisci il tuo cognome");
    validation.push("profileSurname");
  }

  if(!user?.profileRole) {
    toast.error("Seleziona il ruolo che ricopri nell'azienda");
    validation.push("profileRole");
  }

  if(!user?.profileFiscalCode) {
    toast.error("Inserisci il tuo codice fiscale");
    validation.push("profileFiscalCode");
  }

  return validation;
}

// Validate password and return a status message
export function passwordHasErrors(password) {
  if (password === '')
    return "Inserisci un valore nel campo password";
  else if (!validatePassword(password))
    return 'La password deve essere lunga minimo otto caratteri e contenere almeno un carattere minuscolo, uno maiuscolo, un numero e un carattere speciale';
  return 'SUCCESS';
}

// Returns true if @password is a valid password string
export function validatePassword (password) {
  console.log('Risultato: ', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password));
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
}