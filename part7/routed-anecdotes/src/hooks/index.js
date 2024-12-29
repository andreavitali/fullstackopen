import { useState } from "react";

export const useField = type => {
  const initialState = "";
  const [value, setValue] = useState(initialState);

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialState);
  };

  return {
    props: { type, value, onChange },
    reset
  };
};
