import CheckboxGroup from '../../globals/components/dataEntry_v2/CheckboxGroup'
import { WAREHOUSE_SCOPE } from '../../globals/libs/constants'

const WarehouseScopeConfig = ({
  scope,
  changeScope,
}) => {
  return (
    <div>
      <CheckboxGroup
        label="Funzione del magazzino"
        optionsType="object"
        options={WAREHOUSE_SCOPE}
        values={scope}
        onChange={changeScope}
        className="mt-1"
        optionClassName="text-lg"
        controlled={true}
      />
    </div>
  )
}

export default WarehouseScopeConfig
