import { useState } from "react";

type ReturnedType = [boolean, () => void];

const useToggle = (initialState: boolean = false): ReturnedType => {
  const [value, setValue] = useState<boolean>(initialState);

  const handleToggle = () => {
    setValue((value) => !value);
  };

  return [value, handleToggle];
};

export default useToggle;
