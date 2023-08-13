import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Components
import PostItem from "./PostItem";
// Context
import { PostContext } from "../context/post/PostContext";
import { getAllPosts, getPosts } from "../context/post/PostActions";
// Lazy Loading Component
import Lottie from "lottie-react";
import Loader from "../assets/loading.json";
import { UserContext } from "../context/user/UserContext";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatchPost, postState } = useContext(PostContext);
  const { userState } = useContext(UserContext);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      let reversedData;
      if (pathname === "/") {
        const data = await getAllPosts();
        dispatchPost({ type: "GET_POSTS", payload: data });
        reversedData = data.reverse();
      } else if (pathname === "/profile") {
        const data = await getPosts(userState.user.token);
        dispatchPost({ type: "GET_USER_POSTS", payload: data });
        reversedData = data.reverse();
      }
      setPostData(reversedData);
    };

    fetchPosts();
    setLoading(false);
  }, [postState]);

  if (!postData || loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Lottie animationData={Loader} />
      </div>
    );
  } else {
    return postData.map((post) => <PostItem key={post._id} post={post} />);
  }
};
export default Posts;
