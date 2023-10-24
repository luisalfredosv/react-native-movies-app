import {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (colors: ImageColors) => void;
  setMainPrevColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext<ContextProps>({} as ContextProps);

export const GradientProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (colors: ImageColors) => {
    setColors(colors);
  };

  const setMainPrevColors = (colors: ImageColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{colors, prevColors, setMainColors, setMainPrevColors}}>
      {children}
    </GradientContext.Provider>
  );
};
