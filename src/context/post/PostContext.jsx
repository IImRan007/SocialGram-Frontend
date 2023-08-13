import { createContext, useReducer } from "react";
import PostReducer from "./PostReducer";

export const PostContext = createContext();

// eslint-disable-next-line react/prop-types
export const PostProvider = ({ children }) => {
  const initialState = {
    posts: [],
    post: {},
    error: false,
    success: false,
    loading: false,
    message: "",
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  return (
    <PostContext.Provider value={{ postState: state, dispatchPost: dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
