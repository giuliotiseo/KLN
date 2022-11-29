import React from 'react'
import { TbSortDescending, TbSortAscending } from 'react-icons/tb'
import Button from '../buttons_v2/Button'

const SortDirection = ({
  sortDirection = "ASC",
  updateSortDirection,
  buttonClassName = "hover:text-primary-200 dark:hover:text-primary-300"
}) => {
  const nextValue = sortDirection === "ASC" ? "DESC" : "ASC";
  return (
    <div>
      <Button
        icon={sortDirection === "ASC" ? <TbSortDescending className='text-xl' /> : <TbSortAscending className='text-xl' />}
        className={buttonClassName}
        onClick={() => updateSortDirection(nextValue)}
      />
    </div>
  )
}

export default SortDirection
