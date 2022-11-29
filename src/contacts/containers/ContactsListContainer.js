import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useListContacts from '../hooks/useListContacts';
import ContactsListSideMenu from '../components/list/ContactsListSideMenu';
import ContactsListLayout from '../layout/ContactsListLayout';
import { changeContactsList, selectContactsListLimit, selectContactsListSearchable } from '../slices/contactsListSlice';
import RoundedBg from '../../globals/components/layout/RoundedBg';

// Main component -----------------------------------------------------------------------------------------------
export default function ContactsListContainer() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listType = searchParams.get("type");
  const limit = useSelector(selectContactsListLimit);
  const searchable = useSelector(selectContactsListSearchable);
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListContacts(listType || "ALL");

  const dispatch = useDispatch();

  useEffect(() => {
    if(!listType) {
      setSearchParams({ type: "ALL" })
    } else {
      dispatch(changeContactsList({ key: "type", value: listType }))
    }
  }, [listType]);

  return (
    <>      
    {/* Sidebar */}
    <aside className="relative mr-2 rounded-lg flex-1">
      <ContactsListSideMenu listType={listType} setSearchParams={setSearchParams} />
    </aside>

    {/* Content */}
    <section className={`relative flex-6 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
      <RoundedBg />
      <ContactsListLayout
        contacts={items}
        listType={listType}
        searchable={searchable}
        limit={limit}
        pagination={pagination}
        refetch={refetch}
        isLoading={!listType || isLoading}
        isFetching={isFetching}
      />
    </section>
  </>
  )
}