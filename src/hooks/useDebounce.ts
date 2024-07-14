import { useRef } from "react";

const useDebounce = (cb: () => void, delay: number) => {
  const timerDebounceRef = useRef<NodeJS.Timeout>(null);

  return () => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(cb, delay);
  };
};

export default useDebounce;
