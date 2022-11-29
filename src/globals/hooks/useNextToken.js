import { useEffect, useState } from "react";

export const useNextToken = (inputToken) => {
  const [ page, setPage ] = useState(1);
  const [ previousTokens, setPreviousTokens ] = useState([]);
  const [ currentToken, setCurrentToken ] = useState(undefined);
  const [ nextToken, setNextToken ] = useState(inputToken);

  useEffect(() => {
    if(inputToken && (inputToken !== nextToken)) {
      setNextToken(inputToken);
    }
  }, [inputToken]);

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

  return [{
    goNext: next,
    goBack: prev,
    reset
  }, currentToken, previousTokens, page ]
}