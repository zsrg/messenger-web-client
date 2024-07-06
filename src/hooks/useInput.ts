import { ChangeEvent, useState } from "react";

const useInput = (initialState: string = ""): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

export default useInput;
