import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { FiFile } from "react-icons/fi";

const CheckListItemDoc = ({
  docsRef = [],
  keyDocNum = null
}) => {
  const doc = docsRef.length > 0 ? docsRef.filter(el => el?.number == keyDocNum)[0] : [];

  return <div className="text-center items-center justify-center min-w-[60px]">
    <div className="w-[40px] h-[40px] bg-primary-200 text-center p-2 rounded-md mx-auto mb-2">
      <FiFile className="text-2xl text-light-300" />
    </div>
    { docsRef.length !== 0 && keyDocNum
      ? <>
        <Paragraph styles="font-bold">Doc.</Paragraph>
        <Paragraph styles="font-bold">{doc.number}</Paragraph>
      </>
      : <Paragraph>No doc</Paragraph>  
    }
  </div>
}

export default CheckListItemDoc;