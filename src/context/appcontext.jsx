import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isseller, setIsSeller] = useState(false);
  const [showUserlogin, setShowUserLogin] = useState(false);

  const contextValue = {navigate, user, setUser, isseller, setIsSeller, showUserlogin, setShowUserLogin};
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Rename this hook to useAppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};