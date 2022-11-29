import { useEffect } from "react";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { useGetUrlFile } from "../../../globals/libs/hooks";


// Sub component --------------------------------------------------------------------
const PalletFormVoucherImage = ({ src, loading }) => {
  if(loading) return <InlineSpinner />
  if(!src) return <p className="italic">Buono pallet non caricato</p>;
  return (
    <div className="text-center mb-4">
      <img
        src={src}
        alt={`Buono pallet`}
        className="block mx-auto w-full max-w-[840px] p-2 border-4 border-dotted bg-base-100"
      />
    </div>
  )
}

// Main component --------------------------------------------------------------------
export default function PalletVoucherViewer({ voucher }) {
  const { fileUrl, setData, isLoading } = useGetUrlFile(voucher || null);
  
  useEffect(() => {
    if(voucher) {
      setData(voucher);
    } else {
      setData(null);
    }

    return () => setData(null);
  }, [voucher]);

  return (
    <section className="bg-base-100 p-4 rounded-md">
      <SmallTitle styles="mb-4">Buono pallet</SmallTitle>
      <PalletFormVoucherImage src={fileUrl} loading={fileUrl && isLoading} />
    </section>
  )
}
