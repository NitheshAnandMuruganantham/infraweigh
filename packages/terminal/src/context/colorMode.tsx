import React, { createContext, FunctionComponent, useState } from 'react';

export const ColorModeContext = createContext<any>(null);

const ColorModeWrapper: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    (new Date().getHours() > 18 || new Date().getHours()) < 7 ? 'dark' : 'light'
  );
  return (
    <ColorModeContext.Provider value={[mode, setMode]}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeWrapper;
