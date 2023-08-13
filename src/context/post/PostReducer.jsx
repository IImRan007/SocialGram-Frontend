const PostReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        post: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Product Created Successfully",
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        post: null,
        error: false,
        success: true,
        loading: false,
        message: "Products Fetched Successfully",
      };
    case "GET_USER_POSTS":
      return {
        ...state,
        posts: action.payload,
        post: null,
        error: false,
        success: true,
        loading: false,
        message: "Products Fetched Successfully",
      };
    case "GET_POST":
      return {
        ...state,
        posts: null,
        post: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Get Single Product",
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: null,
        post: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Product Updated Successfully",
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: null,
        post: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Product Deleted Successfully",
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default PostReducer;
