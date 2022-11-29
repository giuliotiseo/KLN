import { useState, useCallback, useEffect } from "react";

export default function useLoadingMeter(inputSlot, inputSize) {
  const [ loadingMeter, setLoadingMeter ] = useState("NO_LIMIT");

  const calculate = useCallback((slot, size) => {
    const calculateLoadingMeter = parseFloat((size.reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * slot).toFixed(2));
    setLoadingMeter(calculateLoadingMeter);
  }, []);

  // Initial value
  useEffect(() => {
    if(inputSlot && inputSize?.length === 2) {
      calculate(inputSlot, inputSize);
    } else {
      setLoadingMeter("NO_LIMIT");
    }
  }, [inputSlot, inputSize, calculate]);

  return [ loadingMeter, (inputSlot = 1, inputSize = [ 80, 120 ]) => {
    if(inputSlot  && inputSize?.length === 2) {
      calculate(inputSlot, inputSize);
    }
  }];
}