import { ChangeEvent, useState } from "react";

type ReturnedType = [string, (e: ChangeEvent<HTMLInputElement>) => void, (value: string) => void, () => void];

const useInput = (initialState: string = ""): ReturnedType => {
  const [value, setValue] = useState<string>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue(initialState);
  };

  return [value, handleChange, setValue, resetValue];
};

export default useInput;
