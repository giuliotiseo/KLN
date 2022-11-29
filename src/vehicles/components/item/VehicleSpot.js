import { HugeParagraph, Paragraph } from "../../../globals/components/typography/paragraphs";

const VehicleSpot = ({ spot }) => {
  return (
    <div className="flex items-center mb-4">
      <HugeParagraph styles="mr-2 px-2 text-primary-200 dark:text-primary-300">
        {spot}
      </HugeParagraph>
      <div>
        <Paragraph>
          Posti disponibili su base <b>80x120</b>
        </Paragraph>
        {/* { ALLOWED_VEHICLE[v_size].description.split(';').map((desc, index) => (
          <SmallParagraph key={index} styles="inline-block chip-neutral text-secondary-100 dark:text-secondary-300">
            {desc}
          </SmallParagraph>
        ))} */}
      </div>
    </div>
  )
}

export default VehicleSpot;