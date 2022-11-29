import { TbHome,  TbBuildingSkyscraper, TbBuildingWarehouse, } from "react-icons/tb";
import { useLocation } from "react-router-dom";

export const steps = [
  {
    id: "intro",
    text: "Home",
    icon: <TbHome className="text-inherit" />
  },
  {
    id: "registry",
    text: "Anagrafica azienda",
    icon: <TbBuildingSkyscraper className="text-inherit" />
  },
  {
    id: "warehouse",
    text: "Punti di interesse",
    icon: <TbBuildingWarehouse className="text-inherit" />
  }
]

const useStepIndex = () => {
  const { pathname } = useLocation();
  const currentRouteArray = pathname.split("/").filter(el => el);
  const currentRoute = currentRouteArray?.length === 2
    ? currentRouteArray[1]
    : "";

  const currentRouteIndex = steps.map(({ id }) => id).indexOf(currentRoute);
  return {
    index: currentRouteIndex,
    steps
  };
}

export default useStepIndex;