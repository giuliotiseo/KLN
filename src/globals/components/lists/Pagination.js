import { useEffect, useState } from "react";
import ActionButton from "../buttons/ActionButton";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function Pagination({
  inputToken,
  callback,
  className,
  externalTrigger = null
}) {
  const [ page, setPage ] = useState(1);
  const [ currentToken, setCurrentToken ] = useState(undefined);
  const [ nextToken, setNextToken] = useState();
  const [ previousTokens, setPreviousTokens ] = useState([]);

  useEffect(() => {
    if(inputToken && (inputToken !== nextToken)) {
      setNextToken(inputToken);
    }
  }, [inputToken]);

  useEffect(() => {
    callback(currentToken);
  }, [currentToken]);

  useEffect(() => {
    reset();
  }, [externalTrigger]);

  const next = () => {
    setPreviousTokens((prev) => [...prev, currentToken]);
    setCurrentToken(nextToken);
    setNextToken(null);
    setPage(prev => prev + 1);
  }

  const prev = () => {
    if(page <= 0) return null;
    setCurrentToken(previousTokens.pop());
    setPreviousTokens([...previousTokens]);
    setNextToken(null);
    setPage(prev => prev - 1);
  }

  const reset = () => {
    setPage(1);
    setCurrentToken(null);
    setNextToken(inputToken);
    setPreviousTokens([]);
  }

  return (
    <aside className={`flex items-center ${className}`}>
      <ActionButton
        disabled={previousTokens?.length <= 0}
        styles="hover:text-primary-200 dark:hover:text-primary-300"
        icon={() => <FiChevronLeft />}
        onClick={prev}
      />
      
      <span className="font-bold inline-block mx-1">{page}</span>
      
      <ActionButton
        disabled={!nextToken}
        styles="hover:text-primary-200 dark:hover:text-primary-300"
        icon={() => <FiChevronRight />}
        onClick={next}
      />
    </aside>
  )
}