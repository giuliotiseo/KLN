import { HugeParagraph } from "../typography/paragraphs";

export default ({ title, children }) => (
  <div className="flex w-full h-full flex-col items-center justify-center">
    <HugeParagraph styles="text-center mb-3 text-primary-200 dark:text-primary-300">{ title }</HugeParagraph>
    <div styles="text-center">{children}</div>
  </div>
)