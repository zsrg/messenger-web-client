import { useState } from "react";

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialState);

  const handleToggle = () => {
    setValue((value) => !value);
  };

  return [value, handleToggle];
};

export default useToggle;
