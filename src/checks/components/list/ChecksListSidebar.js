import ActionButtonLink from "../../../globals/components/buttons/ActionButtonLink";
import SafeCol from "../../../globals/components/layout/SafeCol";
import { MdSettingsSuggest, MdOutlineMultipleStop } from "react-icons/md";
import ChecksListStatusMenu from "./ChecksListStatusMenu";

const create_btn = {
  carrier: {
    to: "/checks/create?from=carrier",
    text: "Gestisci",
    icon: () => <MdOutlineMultipleStop />
  },
  receiver: {
    to: "/checks/create?from=receiver",
    text: "Registra",
    icon: () => <MdSettingsSuggest />
  }
}

export default function ChecksListSidebar({ queryFrom, queryStatus }) {
  return (
    <SafeCol id="Orders-left-sidebar">
      <div className="max-w-full relative my-4 mx-2">
        { queryFrom !== "receiver" && (   
          <div className="flex justify-between items-center">
            <ActionButtonLink
              text={create_btn[queryFrom].text}
              styles={`btn-primary text-base font-bold inline-flex pr-4`}
              to={create_btn[queryFrom].to}
              icon={create_btn[queryFrom].icon}
            />
          </div>
        )}

        <ChecksListStatusMenu queryFrom={queryFrom} queryStatus={queryStatus} />
      </div>
    </SafeCol>
  )
}