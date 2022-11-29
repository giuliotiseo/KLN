import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { LargeParagraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";

export default ({ driver }) => driver?.name
  ? <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Info autista</TinyTitle>}
    >
      <LargeParagraph styles="mb-2">{driver.name}</LargeParagraph>
      <SmallParagraph styles="text-gray-500">Email: {driver.email}</SmallParagraph>
      <SmallParagraph styles="text-gray-500">Telefono: {driver.phone}</SmallParagraph>
    </CardDetails>
  : null;