import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { WAREHOUSE_AUTOMATION_LEVEL } from "../../libs/helpers";
import { VscExtensions } from "react-icons/vsc";

export default function AutomationLevelDetail({ automationLevel }) {
  return (
    <div className="flex mx-2">
      <VscExtensions className="shrink-0 text-3xl text-amber-600 dark:text-amber-200" />
      <div className="flex flex-col ml-2">
        <SmallTitle>{WAREHOUSE_AUTOMATION_LEVEL[automationLevel].shortDesc}</SmallTitle>
        <Paragraph>{WAREHOUSE_AUTOMATION_LEVEL[automationLevel].longDesc}</Paragraph>
      </div>
    </div>
  )
}