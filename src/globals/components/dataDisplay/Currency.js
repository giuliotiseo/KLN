import CurrencyInput from "react-currency-input-field";
import { locales } from "../../libs/helpers";

export default ({
  value,
  currency = "EUR",
  className = ""
}) => (
  <CurrencyInput
    value={new Number(value).toFixed(2)}
    decimalsLimit={2}
    disabled={true}
    intlConfig={{ locale: locales[window.__localeId__], currency }}
    className={`bg-transparent outline-none ${className}`}
  />
)