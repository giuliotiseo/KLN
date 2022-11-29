import React from 'react'
import ContactsListOptions from '../components/list/ContactsListOptions'
import Spinner from '../../globals/components/layout/Spinner'
import ContactsList from '../components/list/ContactsList'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'

const ContactsListLayout = ({
  contacts,
  listType,
  searchable,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
  selectedContact = null
}) => {
  const scrollableRef = useScrollFull();
  
  return (
    <SafeCol id="ContactsListLayout" ref={scrollableRef}>
      {!isLoading && (
        <ContactsListOptions
          inputSearchable={searchable}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
        />
      )}
      
      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <ContactsList
            isFetching={isFetching}
            contacts={contacts}
            listType={listType}
            selectedContact={selectedContact}
          />
      }
    </SafeCol>
  )
}

export default ContactsListLayout
