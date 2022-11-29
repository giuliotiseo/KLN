import { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import ContactsList from '../components/ContactsList';
import BasicSelector from "../../globals/components/dataEntry/BasicSelector";
import SearchText from "../../globals/components/dataEntry/SearchText";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import { dataReader } from "../../globals/libs/helpers";
import { searchProfileByEmail, searchProfileByName, searchCompanyByTag, searchCompanyByVatNumber } from "../libs/helpers";
import { useEffect } from "react";
import { SmallTitle } from "../../globals/components/typography/titles";
import { useSelector } from "react-redux";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";

const params = {
  "UTENTE": ["email", "name"],
  "AZIENDA": ["tag", "vat"]
}

// Main component -----------------------------------------------------------------------------------------------
export default function SearchContactsContainer() {
  const [ parameter, setParameter ] = useState(null); 
  const [ type, setType ] = useState(null); 
  const [ result, setResult ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const { vatNumber } = useSelector(selectCompanyInfo);

  // Initialize container parameters
  useEffect(() => {
    const keyParameter = Object.keys(params)[0];
    setParameter(keyParameter);
  }, []);

  useEffect(() => {
    if(parameter) {
      const keyType = params[parameter][0]
      setType(keyType);
    }
  }, [parameter]);

  const query = {
    "UTENTE": {
      "email": (s) => searchProfileByEmail(s, vatNumber, setLoading, setResult ),
      "name": async (s) => searchProfileByName(s, vatNumber, setLoading, setResult),
    },
    "AZIENDA": {
      "tag": async (s) => searchCompanyByTag(s, setLoading, setResult),
      "vat": async (s) => searchCompanyByVatNumber(s, setLoading, setResult),
    }
  }

  if(!parameter || !type) return null;

  return (
    <SectionWrap>
      <SectionTop 
        title="Cerca contatto in rete"
        icon={() => <FiGlobe className="w-8 h-auto mr-4"/>}
        backPath="/contacts"
      />
      <SafeArea>
        <SafeCol>
          <div className="flex items-center p-4 border-b border-light-100 dark:border-dark-200">
            <BasicSelector 
              id="parameter"
              value={parameter}
              onChange={(value) => setParameter(value)}
              styles="mr-1 bg-light-100 dark:bg-dark-300 border-light-100 dark:border-dark-300 hover:border-tertiary-100 dark:focus:border-tertiary-100"
            >
              { Object.keys(params).map(p => <option key={p} value={p}>{p}</option>)}
            </BasicSelector>
            <BasicSelector 
              id="type"
              value={type}
              onChange={(value) => setType(value)}
              styles="mr-1 bg-light-100 dark:bg-dark-300 border-light-100 dark:border-dark-300 hover:border-tertiary-100 dark:focus:border-tertiary-100"
            >
              { params[parameter].map(t => <option key={t} value={t}>Per {dataReader(t)}</option>)}
            </BasicSelector>
            <SearchText
              research={query[parameter][type]}
              styles="block flex-5 w-full"
            />
          </div>

          {/* Result section */}
          <article className="">
            { result && (
              <section>
                <SmallTitle styles="px-4 my-2">Risultato: </SmallTitle>
                <ContactsList
                  inputContacts={result}
                  origin="remote"
                  loading={loading}
                />
              </section>            
            )}
          </article>
        </SafeCol>
      </SafeArea>
    </SectionWrap>
  )
}