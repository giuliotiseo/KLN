import { FiList } from "react-icons/fi";

const Multiselect = ({
  show,
  multiselect,
  setMultiselect
}) => {
  if(!show) return null;
  return (
    <button
      data-tip={`${multiselect ? "Disabilita selezione multipla" : "Abilita selezione multipla"}`}
      className={`bg-base-100 p-2 rounded-full border border-zinc-300 dark:border-2 dark:border-dark-100 absolute -left-12 -translate-x-full outline-none text-lg hover:text-primary-200 dark:hover:text-primary-300 ${multiselect && 'text-primary-200 dark:text-primary-300'}`}
      onClick={() => setMultiselect(prev => !prev)}
    >
      <FiList />
    </button>
  )
}

export default Multiselect;