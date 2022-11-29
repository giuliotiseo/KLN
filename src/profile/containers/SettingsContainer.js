import ThemeToggle from "../../globals/components/buttons/ThemeToggle";

export default function SettingsContainer() {
  return (
    <div className="m-4">
      <ul>
        <li className="flex items-center"><ThemeToggle /> Cambia modalità </li>
      </ul>
    </div>
  )
} 