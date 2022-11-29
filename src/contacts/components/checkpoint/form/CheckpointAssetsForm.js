import CheckboxGroup from "../../../../globals/components/dataEntry/CheckboxGroup";
import { SmallTitle } from "../../../../globals/components/typography/titles";
import { WAREHOUSE_TOOLS } from "../../../../warehouses/libs/helpers";

export default ({ checkpoint, dispatch, styles = "" }) => (
  <section className={styles}>
    <SmallTitle>Asset richiesti al vettore</SmallTitle>
    <CheckboxGroup
      label="Scegli tra i mezzi operativi"
      optionsType="object"
      options={WAREHOUSE_TOOLS}
      values={checkpoint?.tools || []}
      onChange={(vals) => dispatch({ type: "change_checkpoint", name: "tools",  value: vals })}
      styles="mt-1"
      optionStyle="text-lg"
    />
  </section>
)