import { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PreOrdersCarrierList from "../../preOrders/components/PreOrdersCarrierList";
import PreOrdersListOptions from "../../preOrders/components/PreOrdersListOptions";
import PreOrdersSenderList from "../../preOrders/components/PreOrdersSenderList";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import { SmallTitle } from "../../globals/components/typography/titles";
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import { nextSearchPreOrdersThunk, searchPreOrdersListThunk } from "../../app/thunks/preOrdersThunks";
// Store
import { selectCompanyInfo, selectTenant } from "../../company/slices/companyInfoSlice";
import { selectPreOrderFromPicker, selectPreOrdersCarrierQueryOptions, selectPreOrdersSenderQueryOptions } from "../../preOrders/slices/preOrdersSlice";

export default function PreOrdersPicker({ title, icon, queryStatus, queryFrom, onClick }) {
  const [ typeList, setTypeList ] = useState(queryFrom);
  const tenant = useSelector(selectTenant);
  const { type } = useSelector(selectCompanyInfo);
  const senderQueryOptions = useSelector(selectPreOrdersSenderQueryOptions);
  const carrierQueryOptions = useSelector(selectPreOrdersCarrierQueryOptions);
  const scrollableRef = useRef();
  const isInit = useRef(false);
  const dispatch = useDispatch();

  let queryOptions = typeList === "carrier" ? carrierQueryOptions : senderQueryOptions;

  useEffect(() => {
    if(scrollableRef?.current?.contentEl) {
      scrollableRef.current.contentEl.className = "simplebar-content h-full";
    }
  }, [scrollableRef?.current?.contentEl]);

  // Initialization function
  const initPreOrdersList = useCallback(async (queryStatus) => {
    dispatch(searchPreOrdersListThunk({
      tenant,
      queryStatus,
      queryFrom: typeList,
      queryOptions,
      nextToken: undefined
    }));

    isInit.current = true;
  }, [dispatch, queryOptions, tenant, typeList]);

  // Change list, so remove the previous selected preorder
  const handleChangeTypeList = useCallback((value) => {
    dispatch(selectPreOrderFromPicker(null));
    setTypeList(value);
  }, []);

  // Initialize filtered list
  useEffect(() => {
    if(tenant && !isInit.current && queryStatus) initPreOrdersList(queryStatus);
  }, [tenant, initPreOrdersList, queryStatus, isInit?.current]);

  // Re-initialize when queryStatus change
  useEffect(() => {
    if(tenant && isInit.current && typeList && queryStatus) initPreOrdersList(queryStatus);
  }, [queryStatus, typeList]);

  // Dispatch filtering operation
  const runQuery = (queryOption) => {
    dispatch(searchPreOrdersListThunk({
      tenant,
      queryStatus,
      queryFrom: typeList,
      queryOptions: queryOption
        ?  { ...queryOptions, [queryOption.key]: queryOption.value }
        :  { ...queryOptions },
      nextToken: undefined
    }));
  };

  if(!queryStatus) return <FullSpinner />

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="mr-2">
          <SmallTitle styles="flex items-center">
            { icon && <span className="mr-1">{icon()}</span> }
            <span>{title}</span>
          </SmallTitle>
          <SmallParagraph>Scegli un pre-ordine per compilare automaticamente le informazioni sul ritiro</SmallParagraph>
        </div>
        <ControlledSelector 
          id="preorders-picker"
          label={null}
          value={typeList}
          disabled={false}
          onChange={value => handleChangeTypeList(value)}
          styles="mt-2"
        >
          { type === "TRANSPORT" && (
            <option value={"carrier"}>
              Pre-ordini gestiti
            </option>
          )}

          <option value={"sender"}>
            Pre-ordini inviati
          </option>
        </ControlledSelector>
      </div>

      <div className="h-full flex flex-col">
        <PreOrdersListOptions
          queryOptions={queryOptions}
          queryStatus={queryStatus}
          listType={queryFrom}
          runQuery={runQuery}
          refresh={() => initPreOrdersList(queryStatus)}
          styles="border-b border-light-100 dark:border-dark-200 px-0"
          customStyles={{ minWidth: 50 }}
        />
        <SimpleBar className="max-h-[300px]">
          <div className="flex-1">
            { typeList === "carrier" && (
              <PreOrdersCarrierList
                loading={isInit.current === false}
                minimalView={true}
                pickPreOrder={onClick}
                next={(nextToken) => dispatch(nextSearchPreOrdersThunk({ tenant, queryFrom: typeList, queryStatus, nextToken }))}
              />
            )}
            { typeList === "sender" && (
              <PreOrdersSenderList
                loading={isInit.current === false}
                minimalView={true}
                pickPreOrder={onClick}
                next={(nextToken) => dispatch(nextSearchPreOrdersThunk({ tenant, queryFrom: typeList, queryStatus, nextToken }))}
              />
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  )
}