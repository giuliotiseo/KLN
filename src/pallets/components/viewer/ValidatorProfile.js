import { ROLES_DESCRIPTORS } from "../../../globals/libs/helpers";

const ValidatorProfile = ({
  email,
  phone,
  name,
  job,
  task,
}) => {

  return (
    <ul className="mt-1">
      <li>Nome: {name}</li>
      <li>Email: {email}</li>
      { phone && <li>Telefono: {phone}</li> }
      <li>Ruolo: {task ? task?.split('&').map(t => ROLES_DESCRIPTORS[t]).join(', ') : 'Nessun ruolo trovato'}</li>
      <li>Azienda: {job}</li>
    </ul>
  )
}

export default ValidatorProfile;