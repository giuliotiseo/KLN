import { useNavigate } from "react-router-dom";
import Button from "../../globals/components/buttons_v2/Button";
import { AiOutlineStop } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section className="flex flex-col flex-1 h-full items-center justify-center">
      <div className="text-center">
        <AiOutlineStop className="text-5xl text-red-600 inline-block mb-2" />
        <h1 className="title-1">Accesso negato</h1>
        <p className="mt-2">Non possiedi le autorizzazioni per accedere a questa pagina</p>
        <Button
          text="Torna indietro"
          icon={<FaLongArrowAltLeft />}
          className="btn-primary mx-auto mt-8"
          onClick={goBack}
        />
      </div>
    </section>
  )
}

export default Unauthorized;