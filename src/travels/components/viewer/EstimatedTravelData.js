export default ({ length, time, costs }) => (
  <div className="absolute bottom-8 left-4 bg-base-100 rounded-md p-4 shadow-md">
    <ul>
      { length && <li className="block pb-1">Lunghezza percorso: <b className="text-secondary-200 dark:text-secondary-300">{length}</b></li>}
      { time && <li className="block pb-1">Tempi di percorrenza: <b className="text-secondary-200 dark:text-secondary-300">{time}</b></li>}
      { costs && <li className="block pb-1">Costi stimati: <b className="text-secondary-200 dark:text-secondary-300">{costs}</b></li>}
    </ul>
  </div>
)