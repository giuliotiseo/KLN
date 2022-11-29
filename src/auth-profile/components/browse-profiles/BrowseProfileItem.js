import { useEffect, useRef } from "react"
import { useRole } from "../../hooks";
import Avatar from "../../../globals/components/layout/Avatar";
import Button from "../../../globals/components/buttons_v2/Button";
import LoginProfile from "./LoginProfile";
import { RiKeyLine } from "react-icons/ri";
import { ROLES, ROLES_DESCRIPTORS } from "../../../globals/libs/helpers";

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function BrowseProfileItem ({
  profile,
  company,
  callback,
  clear,
  isProfileSelected,
  isActive
}) {
  const { roles } = useRole(profile.roleIds);
  const itemRef = useRef(null);

  useEffect(() => {
    const b = itemRef.current;
    const a = b.querySelector(`#item-password-${profile.id}`);
    a.style.left = b.offsetLeft + "px";
    a.style.top = b.offsetTop + "px";
    a.style.width = b.offsetWidth + "px";
    a.style.height = b.offsetHeight + "px";

    if(isActive) {
      a.style.left = "50%";
      a.style.top = "50%";
    }
  }, [isActive, profile?.id]);

  useEffect(() => {
    // // Add event listener
    // window.addEventListener("resize", clear);
    // // Call handler right away so state gets updated with initial window size
    // clear();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", clear);
  }, [clear]); // Empty array ensures that effect is only run on mount

  return (
    <div className="m-4">
      <div className={`${isActive}`} ref={itemRef}>
        <div className={` flex flex-col items-center justify-center cursor-pointer transition-all ease-in-out duration-300 ${isProfileSelected ? "opacity-0 pointer-events-none" : "opacity-75 hover:opacity-100 pointer-events-all"}`} onClick={callback}>
          <Avatar
            name={profile.searchable}
            size={150}
            stepColor={100}
            src={profile?.avatar}
          />
          
          <div className="mt-6 text-center">
            <h4 className="title-3">
              <Button
                text={`${ profile.name } ${ profile.surname }`}
                className="font-bold text-primary-200 dark:text-primary-300 mx-auto inline-block whitespace-nowrap"
              />
            </h4>
            { !isActive && <p>{ROLES_DESCRIPTORS[ROLES[roles[0]]]}</p> }
            { !profile?.psw 
              ? <div className="flex mt-1 animate-pulse justify-center"><RiKeyLine className="text-red-500 text-3xl" /></div>
              : <div className="flex mt-1 justify-center"><RiKeyLine className="text-lime-500 text-3xl" /></div>
            }
          </div>
        </div>

        <LoginProfile
          profile={profile}
          companyId={company.id}
          isProfileSelected={isProfileSelected}
          isActive={isActive}
          clear={clear}
        />
      </div>
    </div>
  )
}