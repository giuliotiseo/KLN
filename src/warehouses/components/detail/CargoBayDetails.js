export default function CargoBayDetails({ maxLength }) {
  return (
    <div className="flex flex-col">
      <h4 className="title-4">Accesso al magazzino</h4>
      { maxLength && <p>Massimale metraggio transito: <b>{parseFloat(maxLength).toFixed(1)}m</b></p> }
    </div>
  )
}