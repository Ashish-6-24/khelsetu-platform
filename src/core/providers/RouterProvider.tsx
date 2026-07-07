import { BrowserRouter } from 'react-router-dom';

interface RouterProviderProps {
  children: React.ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
