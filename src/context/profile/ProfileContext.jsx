import { createContext, useReducer } from "react";
import ProfileReducer from "./ProfileReducer";

export const ProfileContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
  const initialState = {
    profiles: [],
    profile: {},
    error: false,
    success: false,
    loading: false,
    message: "",
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  return (
    <ProfileContext.Provider
      value={{ profileState: state, dispatchProfile: dispatch }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
