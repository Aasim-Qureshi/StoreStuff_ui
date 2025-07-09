import { useState } from 'react';

type UseToggleReturn = [
  boolean,
  {
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
  }
];

export const useToggle = (initial = false): UseToggleReturn => {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse }];
};
