import React from 'react'
import { FiCopy, FiPlus } from 'react-icons/fi'
import Button from '../../../globals/components/buttons_v2/Button'
import WindowCompiler from '../../../globals/components/dataEntry_v2/WindowCompiler'
import RangeSlider from '../../../globals/components/dataEntry_v2/RangeSlider'
import { forcedCapitalize } from '../../../globals/libs/helpers'
import { windowOppositeTypes } from '../../libs/reducers'

const WarehouseAccessConfig = ({
  maxLength,
  windows,
  callback,
  copyPaste = () => console.log("Default copy/paste function in <WarehouseAccessConfig />"),
  addWindow = () => console.log("Default addWindow function in <WarehouseAccessConfig />"),
  updateWindow = () => console.log("Default updateWindow function in <WarehouseAccessConfig />"),
  removeWindow = null,
}) => {
  return (
    <>
      <RangeSlider
        label="Massimale metraggio transito mezzi"
        min={1}
        max={20}
        step={0.50}
        value={maxLength ? parseFloat(maxLength) : 1}
        onChange={value => callback({ name: "maxLength", value })}
        className="mt-2"
        descriptor={maxLength ? `${parseFloat(maxLength).toFixed(1)}m` : `${parseFloat(1).toFixed(1)}m`}
      />

      { Object.keys(windows).map(type => (
        <div key={type}>
          <div className="flex items-center justify-between mt-2">
            <h5 className="title-5">{forcedCapitalize(type)}</h5>
            <Button
              text={`Copia ${windowOppositeTypes[type].toLowerCase()}`}
              icon={<FiCopy />}
              className="btn-ghost text-sm"
              onClick={() => copyPaste(type)}
            />
          </div>
          
          <label className="label">Indica finestre di <b>{type.toLowerCase()}</b></label>
          { windows?.[type] && windows[type].map((win, index) => (
            <WindowCompiler
              key={index}
              title={`Finestra di ${type.toLowerCase()}`}
              titleClassName="text-sm uppercase font-bold text-secondary-200 dark:text-secondary-300"
              index={index}
              window={win}
              days={win?.days || []}
              dispatchWindows={updateWindow}
              removeWindow={removeWindow}
              className={`border border-light-100 dark:border-dark-200 p-4 rounded-md ${ index < 1 && 'mb-6'}`}
            />
          ))}

          { windows?.[type]?.length < 2 && (
            <Button
              className="btn-primary mx-auto mb-8"
              icon={<FiPlus />}
              text={`Aggiungi finestra di ${type.toLowerCase()}`}
              onClick={() => addWindow(type)}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default WarehouseAccessConfig
