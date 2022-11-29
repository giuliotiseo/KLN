import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Components
import ContactAvatarPicker from "../../contacts/components/ContactAvatarPicker";
import ActionButton from "../../globals/components/buttons/ActionButton";
import FormText from "../../globals/components/dataEntry/FormText";
import Card from "../../globals/components/layout/Card";
import { Paragraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../globals/components/typography/titles";
// Thunks
import { updateCompanyInfoThunk } from "../../app/thunks/companyThunks";
// Icons
import { FiCheck, FiEdit } from "react-icons/fi";

const CompanyInfoCardFooter = ({ disabled, removeChanges }) => {
  return (
    <div className="flex flex-col items-start justify-center text-center">
      { !disabled && (
        <ActionButton onClick={removeChanges} styles="btn--center btn-ghost text-sm mx-auto" text="Annulla le modifiche" />
      )}
    </div>
  )
}

export default function CompanyInfoCard({ company, styles }) {
  const [ contactAvatarFile, setContactAvatarFile ] = useState(null);
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ uniqueCode, setUniqueCode ] = useState('');
  const [ pec, setPec ] = useState('');
  const [ disabled, setDisabled ] = useState(true);
  const [ loadingBtn, setLoadingBtn ] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    setContactAvatarFile(company.logo);
    setEmail(company.email);
    setPhone(company.phone);
    setUniqueCode(company.uniqueCode);
    setPec(company.pec);
    setLoadingBtn(false);
    setDisabled(true);
  }, [company]);

  const btn_edit = {
    onClick: () => setDisabled(false),
    text: "Modifica",
    icon: () => <FiEdit />
  }

  const btn_save = {
    onClick: () => runUpdateCompanyInfo(),
    text: "Salva",
    icon: () => <FiCheck />,
    loading: loadingBtn,
  }

  const runUpdateCompanyInfo = async () => {
    setLoadingBtn(true);
    const newCompanyInfo = {
      companyId: company.companyId,
      vatNumber: company.vatNumber,
      logo: contactAvatarFile,
      log: company.log,
      email,
      phone,
      uniqueCode,
      pec
    }

    dispatch(updateCompanyInfoThunk({ 
      company: newCompanyInfo,
      logo: contactAvatarFile,
      prevCompany: company
    }));
  }

  const removeChanges = () => {
    setContactAvatarFile(company.logo);
    setEmail(company.email);
    setPhone(company.phone);
    setUniqueCode(company.uniqueCode);
    setPec(company.pec);
    setDisabled(true);
  }

  const updateLogo = (file) => {
    if(file) {
      setContactAvatarFile({
        ...file, 
        timestamp: Date.now().toString()
      })
    } else {
      setContactAvatarFile(null)
    }
  }

  return (
    <Card
      title="Info azienda"
      titleStyle="medium"
      headerStyle="pl-4 pr-1 py-2"
      styles={`flex justify-between bg-base-100 py-0 bg-opacity-100 ${styles}`}
      footer={() => <CompanyInfoCardFooter disabled={disabled} removeChanges={removeChanges} />}
      headerAction={disabled ? btn_edit : btn_save}
    >
      <div className="flex items-start lg:flex-row px-4">
        <div className="mr-6">
          <ContactAvatarPicker
            size="w-28 h-28"
            avatar={null}
            username={null}
            type="COMPANY"
            containerStyle="my-4"
            contactAvatarFile={contactAvatarFile}
            setContactAvatarFile={(file) => updateLogo(file)}
            disabled={disabled}
          />
          <div className="mb-4">
            <SmallTitle styles="mt-2 text-center">Partita IVA</SmallTitle>
            <Paragraph styles="text-center">{company.vatNumber}</Paragraph>
          </div>
        </div>

        <div>
          <ul className="flex flex-wrap items-center text-lg text-center">
            <li className={`mr-2 ${disabled ? 'border-light-100 dark:border-dark-100' : 'border-transparent dark:border-transparent mr-1'}`}>
              <label className="w-full whitespace-nowrap label-inline col-span-4 lg:col-span-1 text-left mt-2">Email</label>
              <FormText
                type="email"
                placeholder={!company.email ? 'Assente' : company.email }
                onChange={({ target: { value }}) => setEmail(value)}
                value={email}
                styles="col-span-4 text-left text-base"
                readOnly={disabled}
              />
            </li>
            <li className={`${disabled ? 'border-light-100 dark:border-dark-100' : 'border-transparent dark:border-transparent ml-1'}`}> 
              <label className="w-full whitespace-nowrap label-inline col-span-4 lg:col-span-1 text-left mt-2">Telefono</label>
              <FormText 
                type="tel"
                placeholder={!company.phone ? 'Assente' : company.phone }
                onChange={({ target: { value }}) => setPhone(value)}
                value={phone}
                styles="col-span-4 text-base"
                readOnly={disabled}
              />
            </li>
          </ul>

          <ul className="flex flex-wrap items-center text-lg">
            <li className={`mr-2 ${disabled ? 'border-light-100 dark:border-dark-100' : 'border-transparent dark:border-transparent mr-1'}`}>
              <label className="w-full whitespace-nowrap label-inline col-span-4 lg:col-span-1 text-left mt-2">Cod. univoco</label>
              <FormText 
                type="text"
                placeholder={!company.uniqueCode ? 'Assente' : company.uniqueCode }
                onChange={({ target: { value }}) => setUniqueCode(value)}
                value={uniqueCode}
                styles="col-span-4 text-base"
                readOnly={disabled}
              />
            </li>
            <li className={`${disabled ? 'border-light-100 dark:border-dark-100' : 'border-transparent dark:border-transparent ml-1'}`}>
              <label className="w-full whitespace-nowrap label-inline col-span-4 lg:col-span-1 text-left mt-2">PEC</label>
              <FormText 
                type="text"
                placeholder={!company.pec ? 'Assente' : company.pec }
                onChange={({ target: { value }}) => setPec(value)}
                value={pec}
                styles="col-span-4 text-base"
                readOnly={disabled}
              />
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}