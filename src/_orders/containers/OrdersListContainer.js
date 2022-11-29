import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
// Custom components
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import OrdersMenuDropdown from '../components/OrdersMenuDropdown';
import OrdersList from "../components/OrdersList";
import OrdersListFilters from '../components/OrdersListFilters';
import ActionButton from '../../globals/components/buttons/ActionButton';
import ActionButtonLink from '../../globals/components/buttons/ActionButtonLink';
import OrdersMenuList from '../components/OrdersMenuList';
import Dropdown, { DropdownList, DropdownListItem } from '../../globals/components/navigation/Dropdown';
import { SmallTitle, TinyTitle } from '../../globals/components/typography/titles';
import { SmallParagraph } from '../../globals/components/typography/paragraphs';
import InlineSpinner from '../../globals/components/spinners/InlineSpinner';
import FullSpinner from '../../globals/components/spinners/FullSpinner';
import Checkbox from '../../globals/components/dataEntry/Checkbox';
// Selectors
import { selectCompanyInfo, selectTenant } from '../../company/slices/companyInfoSlice';
import { resetOrdersList, selectOrdersQueryOptions, selectRawOrdersFromList } from '../slices/ordersSlice';
// Icons
import { FiAirplay, FiAlertTriangle, FiBox, FiFilter, FiList, FiPlus, FiRefreshCw, FiSearch, FiSend, FiShoppingCart, FiTruck, FiX } from 'react-icons/fi';
// Thunks
import {
  nextSearchOrdersThunk,
  searchOrdersListThunk,
  updateOrderStatusThunk, 
} from '../../app/thunks/ordersThunks';
// Helpers
import { formatISO } from 'date-fns';
import { limitsQueryOptions } from '../../globals/libs/helpers';
import { MdTrackChanges } from 'react-icons/md';
import { OrderStatus, ORDER_STATUS_DESCRIPTION } from '../libs/helpers';

// Params & Constants -----------------------------------------------------------------------------------------------
const carrier_path = {
  to: "/orders?from=carrier&status=pending",
  text: "Modalità vettore",
  icon: () => <FiShoppingCart />,
}

const sender_path = {
  to: "/orders?from=sender&status=pending",
  text: "Modalità mittente",
  icon: () => <FiTruck />
}

const receiver_path = {
  to: "/orders?from=receiver&status=pending",
  text: "Modalità destinatario",
  icon: () => <FiTruck />
}

let cta_list = {
  TRANSPORT: {
    carrier: [sender_path, receiver_path],
    sender: [ carrier_path, receiver_path],
    receiver: [ carrier_path, sender_path ],
  }, 
  CLIENT: {
    carrier: [sender_path, receiver_path],
    sender: [ receiver_path ],
    receiver: [ sender_path ],
  }
}

const currentMode = {
  carrier: "Modalità vettore",
  sender: "Modalità mittente",
  receiver: "Modalità destinatario"
}

const create_btn = {
  carrier: {
    to: "/orders/create?from=carrier",
    text: "Aggiungi",
    icon: () => <FiPlus />
  },
  sender: {
    to: "/orders/create?from=sender",
    text: "Invia",
    icon: () => <FiSend />
  }
}

const titles = {
  carrier: "Elenco ordini da gestire",
  sender: "Elenco ordini da inviare",
  receiver: "Elenco ordini in arrivo"
}

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: 25 },
}

const massive_update_variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: 25 },
}

// Wrapper to handle redirection -----------------------------------------------------------------------------------------------
export default function OrdersListPage({ queryStatus, queryFrom }) {
  const { type } = useSelector(selectCompanyInfo);
  // Complete queryString by get the information from company type
  if(!queryFrom) {
  return type === "TRANSPORT"
    ? <Navigate to={`/orders?from=carrier&status=pending`} replace />
    : <Navigate to={`/orders?from=sender&status=pending`} replace />
  }

  return <OrdersListContainer queryStatus={queryStatus} queryFrom={queryFrom} type={type} />
}

// Main component -----------------------------------------------------------------------------------------------
function OrdersListContainer({ queryStatus, queryFrom, type }) {
  const [ isOpenFilters, setIsOpenFilters ] = useState(false);
  const [ isOpenStatusChanger, setIsOpenStatusChanger ] = useState(false);
  const [ isMassiveUpdate, setIsMassiveUpdate ] = useState(0);
  const [ dateRange, setDateRange ] = useState([null, null]);
  const [ multiselect, setMultiselect ] = useState(false);
  const [ selectedIds, setSelectedIds ] = useState([]);
  const [ createdAtFrom, createdAtTo ] = dateRange;
  const tenant = useSelector(selectTenant);
  const queryOptions = useSelector(store => selectOrdersQueryOptions(store, queryFrom));
  const rawOrders = useSelector(store => selectRawOrdersFromList(store, queryFrom));
  const scrollableRef = useRef();
  const isInit = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(scrollableRef?.current?.contentEl) {
      scrollableRef.current.contentEl.className = "simplebar-content h-full";
    }
  }, [scrollableRef?.current?.contentEl]);

  // Initialization function
  const initOrdersList = useCallback(async (queryStatus) => {
    dispatch(searchOrdersListThunk({
      tenant,
      queryStatus,
      queryFrom,
      queryOptions,
      nextToken: undefined
    }));

    isInit.current = true;
  }, [dispatch, queryOptions, tenant, queryFrom]);

  // Initialize filtered list
  useEffect(() => {
    if(tenant && !isInit.current && queryStatus) initOrdersList(queryStatus);
  }, [tenant, initOrdersList, queryStatus, isInit?.current]);

  // Re-initialize when queryStatus change
  useEffect(() => {
    if(tenant && isInit.current && queryFrom && queryStatus) initOrdersList(queryStatus);
  }, [queryStatus, queryFrom]);

  // Set created at range 
  useEffect(() => {
    if(dateRange.length === 2 && !dateRange.includes(null)) {
      // Converted to ISOString for compliance with AWSDate and Redux (new Date() is not good for redux store!)
      runQuery({ key: "createdAt", value: [formatISO(new Date(dateRange[0])), formatISO(new Date(dateRange[1]))]})
    }
  }, [queryStatus, dateRange, queryFrom]);

  // Reset when change filters
  useEffect(() => {
    if(isOpenFilters) {
      setMultiselect(false);
      setSelectedIds([]);
    }
  }, [isOpenFilters]);

  // Reset when root
  useEffect(() => {
    return () => {
      dispatch(resetOrdersList(queryFrom));
    }
  }, [queryFrom]);

  const isFilterActive = 
    (queryOptions.pickupDateStart.length > 0 && !queryOptions.pickupDateStart.includes(null))
    || (queryOptions.deliveryDateStart.length > 0 && !queryOptions.deliveryDateStart.includes(null))
    || (queryOptions.shipmentType !== "ALL")
    || (queryOptions.quantity.length > 0 && !queryOptions.quantity.includes(""))
    || (queryOptions.senderName.length > 0 && !queryOptions.senderName.includes(""))
    || (queryOptions.carrierName.length > 0 && !queryOptions.carrierName.includes(""))
    || (queryOptions.receiverName.length > 0 && !queryOptions.receiverName.includes(""))
    || (queryOptions.pickupAddress)
    || (queryOptions.deliveryAddress)
      ? true 
      : false;

  // Dispatch filtering operation
  const runQuery = (queryOption) => {
    dispatch(searchOrdersListThunk({
      tenant,
      queryStatus,
      queryFrom,
      queryOptions: queryOption
        ?  { ...queryOptions, [queryOption.key]: queryOption.value }
        :  { ...queryOptions },
      nextToken: undefined
    }));
  };

  // Range pickup date filter
  const handleChangeCreatedAt = value => {
    setDateRange(value);

    if(value[0] === null && value[1] === null) {
      runQuery({ key: "createdAt", value: []})
    }
  }

  // Massive update
  const handleMassiveUpdate = async (status) => {
    if(type === "TRANSPORT") {
      setIsOpenStatusChanger(false);
      for(let selectedId of selectedIds) {
        setIsMassiveUpdate(prev => prev + 1);
        await dispatch(updateOrderStatusThunk({
          order: rawOrders[selectedId],
          logs: rawOrders[selectedId].log,
          status,
          origin: queryFrom
        }));
      }
  
      setMultiselect(false);
      setSelectedIds([]);
      setIsMassiveUpdate(0);
      navigate(`/orders?from=${queryFrom}&status=${status.toLowerCase()}`);
    }
  }

  if(!queryStatus) return <FullSpinner />
  if(!queryFrom) {
    return type === "TRANSPORT"
      ? <Navigate to={`/orders?from=carrier&status=pending`} />
      : <Navigate to={`/orders?from=sender&status=pending`} />
  }

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={titles[queryFrom]}
        titleStyle="medium"
        icon={() => <FiBox className="w-8 h-auto mr-4"/>}
        stylesLink="hidden md:flex"
        dropdown={() => <OrdersMenuDropdown refresh={() => initOrdersList(queryStatus)} queryStatus={queryStatus} queryFrom={queryFrom} />}
      >
        <Dropdown
          id="orders-list-dropdown-container"
          navItem={ <div className="ml-2 flex items-center text-primary-200 dark:text-primary-300">
            <FiAirplay className="text-xl mr-2" />
            <p className='font-bold'>{currentMode[queryFrom]}</p>
          </div>}
          navItemOpen={ <div className="ml-2 flex items-center text-primary-200 dark:text-primary-300">
            <FiAirplay className="text-xl mr-2" />
            <p className='font-bold'>Cambia modalità</p>
          </div>}
          position="right-0"
          className="bg-inverse-300 ml-4 border border-light-100 dark:border-dark-100"
        >
          <DropdownList id="orders-list-mode-dropdown-list">
            { cta_list[type][queryFrom].map((path_obj, index) => (
              <DropdownListItem key={index} id={`orders-list-mode-dropdown-list-item-${index + 1}`}>
                <ActionButtonLink styles="btn-dropdown-item" {...path_obj} />
              </DropdownListItem>
            ))}
          </DropdownList>
        </Dropdown>
      </SectionTop>

      <SafeArea className="grid grid-cols-8 gap-2">
        <div className="relative col-span-3 md:col-span-2 lg:col-span-1 rounded-lg">
          <SafeCol id="Orders-left-sidebar">
            <div className="max-w-full relative my-4 mx-2">
              { queryFrom !== "receiver" && (   
                <div className="flex justify-between items-center">
                  <ActionButtonLink
                    text={create_btn[queryFrom].text}
                    styles={`btn-primary text-base font-bold inline-flex pr-4`}
                    to={create_btn[queryFrom].to}
                    icon={create_btn[queryFrom].icon}
                  />
                </div>
              )}
              <OrdersMenuList queryStatus={queryStatus} queryFrom={queryFrom} />
            </div>
          </SafeCol>
        </div>

        <div className="relative col-span-5 md:col-span-6 lg:col-span-7 border-l border-light-100 dark:border-dark-200">
          <SafeCol id="Orders-list" ref={scrollableRef}>
            <div className="h-full flex-1 flex flex-col">    
              <div className='sticky top-3 flex items-center input mt-3 p-0 max-w-2xl w-full mx-auto rounded-full z-50 bg-light-200 dark:bg-dark-200'>
                                
                {/* Multiselect */}
                { type === "TRANSPORT" && queryFrom ===  "carrier" && (
                  <button
                    data-tip={`${multiselect ? "Disabilita selezione multipla" : "Abilita selezione multipla"}`}
                    className={`bg-base-100 p-2 rounded-full border border-zinc-300 dark:border-2 dark:border-dark-100 absolute -left-12 -translate-x-full outline-none text-lg hover:text-primary-200 dark:hover:text-primary-300 ${multiselect && 'text-primary-200 dark:text-primary-300'}`}
                    onClick={() => setMultiselect(prev => !prev)}
                  >
                    <FiList />
                  </button>
                )}
                
                {/* Refresh */}
                <button
                  data-tip="Aggiorna elenco"
                  onClick={() => initOrdersList(queryStatus)}
                  className='bg-base-100 p-2 rounded-full border border-zinc-300 dark:border-2 dark:border-dark-100 absolute -left-2 -translate-x-full text-lg hover:text-primary-100 dark:hover:text-primary-300'
                >
                  <FiRefreshCw />
                </button>

                {/* CreatedAt Range Picker */}
                <div className='flex items-center flex-1'>
                  <div className='py-2 px-3 inline-block bg-light-300 dark:bg-dark-300 rounded-full shadow-md w-[300px]'>
                    <p className='text-sm font-bold'>Periodo</p>
                    <DatePicker
                      selectsRange={true}
                      startDate={createdAtFrom}
                      endDate={createdAtTo}
                      closeOnScroll={(e) => e.target === document}
                      className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Data di creazione ordine"
                      locale="it"
                      openToDate={new Date()}
                      isClearable
                      onChange={(update) => handleChangeCreatedAt(update)}
                    />
                  </div>

                  {/* Results limit selector */}
                  <div className='inline-flex flex-col items-start p-2 rounded-r-full'>
                    <p className='text-sm font-bold px-1'>N.Risultati</p>
                    <select
                      className='bg-transparent text-left cursor-pointer outline-none'
                      onChange={({ target: { value }}) => runQuery({ key: "limit", value })}
                      value={queryOptions.limit}
                    >
                      { limitsQueryOptions.map(limit => <option key={limit} value={limit}>{limit}</option>)}
                    </select>
                  </div>
                </div>

                {/* Search button */}
                <button
                  onClick={() => runQuery(queryOptions)}
                  className='flex items-center text-center bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white text-base font-bold rounded-full px-4 py-3 mr-2'
                >
                  <FiSearch className='mr-2' />
                  <span>Ricerca</span>
                </button>
              </div>

              <div className='translate-y-4'>
                { multiselect && (
                  <Checkbox
                    id={"select-all-orders"}
                    name={`select-all-orders-picker`}
                    label={"Seleziona tutto"}
                    value={selectedIds.length === Object.keys(rawOrders)?.length ? true : false}
                    controlled={true}
                    initialStatus={selectedIds.length === Object.keys(rawOrders)?.length ? true : false}
                    onChange={() => setSelectedIds((prev) => prev.length === Object.keys(rawOrders).length ? [] : Object.keys(rawOrders))}
                    styles="inline-flex p-2 bg-base-100 rounded-md shadow-md mb-4"
                  /> 
                )}

                <OrdersList
                  queryFrom={queryFrom}
                  queryStatus={queryStatus}
                  loading={isInit.current === false}
                  multiselect={multiselect}
                  selectedIdsState={[selectedIds, setSelectedIds]}
                  next={(nextToken) => dispatch(nextSearchOrdersThunk({ tenant, queryFrom, queryStatus, nextToken }))}
                />
              </div>
            </div>
          </SafeCol>
        </div>

        {/* Fixed positions */}
        { isMassiveUpdate >= 1 && (
          <div className="fixed left-0 top-0 w-full h-full bg-base-100 flex items-center justify-center bg-opacity-95">
            <div className="text-dark-50 dark:text-light-300 text-center">
              <SmallTitle>Aggiornamento dati in corso</SmallTitle>
              <TinyTitle styles="uppercase text-center opacity-50">Attendere</TinyTitle>
              <TinyTitle styles="text-center opacity-50">Non uscire da questa finestra</TinyTitle>
              <InlineSpinner styles="mt-4" />
              <p className="mt-4">{ isMassiveUpdate } di {selectedIds.length}</p>
            </div>
          </div>
        )}

        {/* Fixed: filters */}
        <div className={`fixed right-6 bottom-8 ${isOpenFilters ? "pointer-events-all" : "pointer-events-none"}`}>
          <motion.div
            animate={isOpenFilters ? "open" : "closed"} 
            variants={variants}
            className={`mb-2 bg-base-100 w-[400px] h-[350px] opacity-0 shadow-xl rounded-md border border-zinc-300 dark:border-2 dark:border-dark-100 ${isOpenFilters ? "pointer-events-all" : "pointer-events-none"}`}
          >
            { !createdAtFrom || !createdAtTo 
              ? <div className='flex flex-col items-center justify-center h-full'>
                  <FiAlertTriangle className='text-2xl block opacity-50 mb-2' />
                  <SmallTitle styles="text-center w-full mb-2 opacity-50">Filtri non disponibili</SmallTitle>
                  <p className='alert-warn px-4 text-center'>
                    Seleziona prima un periodo di riferimento
                  </p>
                </div>
              : <OrdersListFilters
                  queryFrom={queryFrom}
                  runQuery={runQuery}
                />
            }
          </motion.div>
        </div>

        {/* Fixed: status */}
        <div className={`fixed left-1/2 -translate-x-1/2 bottom-8 ${isOpenStatusChanger ? "pointer-events-all" : "pointer-events-none"}`}>
          <motion.ul
            animate={isOpenStatusChanger ? "open" : "closed"} 
            variants={massive_update_variants}
            className={`mb-2 bg-base-100 w-[200px] h-[250px] opacity-0 shadow-xl rounded-md border border-zinc-300 dark:border-2 dark:border-dark-100 ${isOpenStatusChanger ? "pointer-events-all" : "pointer-events-none"}`}
          >
            { Object.keys(OrderStatus)
              // .filter(or_status => or_status !== "PENDING")
              .filter(or_status => or_status !== queryStatus)
              .map(or_status => (
              <li key={or_status} styles="flex items-center vehicle-status-selector-item-1 text-left text-danger-200 dark:text-danger-300">
                <ActionButton
                  styles="hover:bg-light-200 dark:hover:bg-dark-200 w-full rounded-0"
                  onClick={() => handleMassiveUpdate(or_status)}
                  text={ORDER_STATUS_DESCRIPTION[or_status]}
                />
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Fixed buttons */}
        <div className="fixed right-6 bottom-6 flex justify-end" data-tip={`${isOpenFilters ? 'Chiudi' : 'Filtra elenco'}`}>
          { isFilterActive && <SmallParagraph styles="chip-neutral">Filtri attivi</SmallParagraph> }
          <ActionButton
            styles="btn-primary mr-2"
            onClick={() => setIsOpenFilters(prev => !prev)}
            icon={() => isOpenFilters ? <FiX /> : <FiFilter />}
          />
        </div>

        { multiselect && selectedIds.length > 0 && (
          <div className="fixed left-1/2 bottom-6 flex justify-end" data-tip={`${isOpenFilters ? 'Chiudi' : 'Filtra elenco'}`}>
            <ActionButton
              styles="btn-primary mr-2"
              onClick={() => setIsOpenStatusChanger(prev => !prev)}
              icon={() => isOpenStatusChanger ? <FiX /> : <MdTrackChanges />}
              text={`Aggiorna stato (${selectedIds.length})`}
            />
          </div>
        )}

        <ReactTooltip />
      </SafeArea>
    </SectionWrap>
  )
}