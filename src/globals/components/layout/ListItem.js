import React from 'react'

const ListItem = ({ children, className = ""}) => {
  return (
    <li className={`relative flex shadow-md bg-base-100 rounded-lg m-2 ${className} ${!className.includes("items") ? 'items-center' : ''}`}>
      { children }
    </li>
  )
}

export default ListItem
