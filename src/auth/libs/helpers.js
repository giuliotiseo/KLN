/* - Constants --------------------------------------------------------------------------------- */
export const STRINGS = {
  AUTH_ERROR: {
    EMAIL: {
      EMPTY: 'L\'indirizzo email non può essere vuoto',
      MALFORMED: 'Inserire un indirizzo email valido'
    },
    PASSWORD: {
      EMPTY: 'La password non può essere vuota',
      MALFORMED: 'La password deve essere lunga minimo otto caratteri e contenere almeno un carattere minuscolo, uno maiuscolo, un numero e un carattere speciale'
    },
    NAME: {
      EMPTY: 'Il nome non può essere vuoto',
      MALFORMED: 'Il nome contiene caratteri non ammessi'
    },
    SURNAME: {
      EMPTY: 'Il cognome non può essere vuoto',
      MALFORMED: 'Il cognome contiene caratteri non ammessi'
    },
    COMPANY_NAME: {
      EMPTY: 'Il nome dell\'azienda non può essere vuoto',
      MALFORMED: 'Il nome dell\'azienda contiene caratteri non ammessi'
    },
    PARTITA_IVA: {
      EMPTY: 'La partita IVA non può essere vuota',
      MALFORMED: 'La partita IVA deve essere lunga 11 caratteri e contenere solo numeri'
    },
  }
};


// Validate password and return a status message
export function passwordHasErrors(password) {
  if (password === '')
    return STRINGS.AUTH_ERROR.PASSWORD.EMPTY;
  else if (!validatePassword(password))
    return STRINGS.AUTH_ERROR.PASSWORD.MALFORMED;
  return 'SUCCESS';
}

// Returns true if @password is a valid password string
export function validatePassword (password) {
  console.log('Risultato: ', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password));
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
}

// Email validation
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(tel) {
  // var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  var re = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  return re.test(tel);
}