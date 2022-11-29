import { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import SectionWrap from '../../globals/components/layout/SectionWrap';
import SectionTop from '../../globals/components/layout/SectionTop';
import SafeArea from '../../globals/components/layout/SafeArea';
import SafeCol from '../../globals/components/layout/SafeCol';
import ContactsList from '../../contacts/components/ContactsList';
import EmployersListOptions from '../components/EmployersListOptions';
// Selectors
import { selectCompanyInfo } from '../slices/companyInfoSlice';
import {
  selectEmployersList,
  selectEmployersListNextToken,
  selectEmployersListStatus,
  selectEmployersQueryOptions
} from '../slices/employersListSlice';
// Thunks
import { nextSearchEmployersThunk, searchEmployersThunk } from '../../app/thunks/companyThunks';
// Icons
import { FiPlus, FiUsers } from 'react-icons/fi';

// Params & Constants -----------------------------------------------------------------------------------------------
const cta_list = {
  to: `/contacts/create?from=company`,
  text: "Aggiungi",
  icon: () => <FiPlus />
}

export default function EmployersContainer() {
  const scrollableRef = useRef();
  const { companyId } = useSelector(selectCompanyInfo);
  const contacts = useSelector(selectEmployersList);
  const queryOptions = useSelector(selectEmployersQueryOptions);
  const status = useSelector(selectEmployersListStatus);
  const nextToken = useSelector(selectEmployersListNextToken)
  const dispatch = useDispatch();
  const isInit = useRef(false);

  const initContactsList = useCallback((companyId) => {
    dispatch(searchEmployersThunk({ companyId, queryOptions, nextToken: undefined }));
    isInit.current = true;
  }, [dispatch, queryOptions]);

  // Initialize filtered list
  useEffect(() => {
    if(companyId && !isInit.current) { initContactsList(companyId); }
  }, [companyId, initContactsList]);

  // Dispatch filtering operation
  const runQuery = (queryOption) => {
    dispatch(searchEmployersThunk({ 
      queryOptions: queryOption 
        ?  { ...queryOptions, [queryOption.key]: queryOption.value }
        : { ...queryOptions }, 
      companyId,
      nextToken: undefined
    }));
  };

  return (
    <SectionWrap styles="h-full">      
      <SectionTop
        title="Rubrica dipendenti"
        titleStyle="medium"
        icon={() => <FiUsers className="w-8 h-auto mr-4"/>}
        link={cta_list}
        stylesLink="hidden md:flex"
        dropdown={null}
        filters={() => (
          <EmployersListOptions 
            queryOptions={queryOptions}
            runQuery={runQuery}
            refresh={initContactsList}
          />
        )}
      />

      <SafeArea>
        <SafeCol id="contacts-list" ref={scrollableRef}>
          <ContactsList
            listType="filtered"
            inputContacts={contacts}
            inputNextToken={nextToken}
            loading={status === "loading" || isInit.current === false}
            next={() => dispatch(nextSearchEmployersThunk({ companyId, nextToken }))}
          />
        </SafeCol>
      </SafeArea>
    </SectionWrap>
  )
}