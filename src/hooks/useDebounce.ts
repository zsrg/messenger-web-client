import { useRef } from "react";

type ReturnedType = () => void;

const useDebounce = (cb: () => void, delay: number): ReturnedType => {
  const timerDebounceRef = useRef<NodeJS.Timeout>(null);

  return () => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(cb, delay);
  };
};

export default useDebounce;
