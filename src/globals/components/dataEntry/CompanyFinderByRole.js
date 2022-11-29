import { useLayoutEffect, useState } from "react";
import { v4 } from "uuid";
import { COMPANY_ROLES } from "../../libs/helpers";
import CustomerFinder from "../dataEntry_v2/CustomerFinder";
import { SmallParagraph } from "../typography/paragraphs";
import CompanyFinder from "./CompanyFinder";

const opposites = {
  sender: ["carrier", "receiver"],
  carrier: ["sender", "receiver"],
  receiver: ["sender", "receiver"],
}

export default function CompanyFinderByRole({
  id = v4(),
  myCompanyRole = null,
  inputRole = null,
  label = null,
  hideSearchMethod = false,
  optionText = COMPANY_ROLES,
  className,
  changeRole = (value) => console.log("Run role callback in <CompanyFinderByRole />", value),
  callback = (value) => console.log("Run callback in <CompanyFinderByRole />", value),
  reset = (value) => console.log("Reset <CompanyFinderByRole />", value)
}) {
  const [ searchByRole, setSearchByRole ] = useState(() => myCompanyRole
    ? opposites[myCompanyRole][0]
    : inputRole || ""  
  );

  // Trigger update in the store
  useLayoutEffect(() => {
    if(searchByRole) {
      changeRole(searchByRole);
    }

    return () => callback('');
  }, [searchByRole]);

  return (
    <div className={`flex items-center ${className}`}>
      { label && <SmallParagraph styles="font-bold mx-2">{ label }</SmallParagraph> }

      { myCompanyRole && <select
        value={searchByRole}
        onChange={({ target: { value }}) => setSearchByRole(value)}
        className="input cursor-pointer"
      >
        <option value="" disabled> - Seleziona - </option>
        { opposites[myCompanyRole].map(companyType => (
          <option key={companyType} value={companyType}>
            { optionText[companyType] }
          </option>
        ))}
      </select> }


      <CustomerFinder
        callback={value => callback({
          ...value,
          key: opposites[myCompanyRole][0]
        })}
        reset={() => reset(null)}
      />

      {/* <CompanyFinder
        id={id}
        company={""}
        hideSearchMethod={hideSearchMethod}
        label={label}
        labelClassName="mt-4 mb-0"
        setCompany={value => callback({ key: searchByRole, value })}
        externalTrigger={searchByRole}
        reset={() => reset({ key: searchByRole, value: "" })}
      /> */}
    </div>
  )
}