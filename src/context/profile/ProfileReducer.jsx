const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_PROFILE":
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        profile: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Profile Created Successfully",
      };
    case "GET_USER_PROFILE":
      return {
        ...state,
        profiles: action.payload,
        profile: null,
        error: false,
        success: true,
        loading: false,
        message: "Profile Fetched Successfully",
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profiles: null,
        profile: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Profile Updated Successfully",
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

export default ProfileReducer;
