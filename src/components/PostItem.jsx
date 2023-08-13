/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// Icons
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
// Context
import { deletePost } from "../context/post/PostActions";
// import { PostContext } from "../context/post/PostContext";
import { UserContext } from "../context/user/UserContext";
// Lazy Loading Component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Loading Animation
import Lottie from "lottie-react";
import Loader from "../assets/loading.json";
// Toast
import toast from "react-hot-toast";

const PostItem = ({ post }) => {
  const [commentDiv, setCommentDiv] = useState(false);

  // const { dispatchPost } = useContext(PostContext);
  const { userState } = useContext(UserContext);

  const hanldeDeletePost = async (id) => {
    await deletePost(id, userState.user.token);
    toast.success("Post Deleted Successfully✌️");
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Lottie animationData={Loader} />
      </div>
    );
  } else {
    return (
      <div className="card bg-base-100 shadow-xl py-6 px-4 mt-10">
        <div className="flex items-center gap-4">
          <div className="avatar flex items-center gap-x-4">
            <div className="w-12 rounded-full">
              <img src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>
              <h2>{post?.user?.name}</h2>
              <h3 className="text-[14px]">Moments Ago</h3>
            </div>
            <div
              className="relative"
              onClick={() => hanldeDeletePost(post._id)}
            >
              <BiTrash
                size={24}
                className="bg-red-400 p-1 cursor-pointer hover:bg-red-600 rounded-full text-white flex items-center justify-center btn-ghost"
              />
            </div>
          </div>
        </div>
        {post.description && <div className="mt-4">{post.description}</div>}
        {post.imgFile && (
          <div className="mt-4">
            <LazyLoadImage
              effect="blur"
              src={post.imgFile?.secure_url}
              alt="post"
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        )}
        {post.videoFile && (
          <div className="mt-4">
            <video width="850" height="500" controls className="rounded-xl">
              <source src={post?.videoFile?.secure_url} type="video/mp4" />
            </video>
          </div>
        )}
        {post.audioFile && (
          <div className="mt-4">
            <audio
              className="w-full"
              src={post.audioFile?.secure_url}
              controls
            ></audio>
          </div>
        )}
        <div className="flex mt-4 gap-4">
          <AiOutlineHeart size={22} cursor={"pointer"} />
          <BiComment
            size={22}
            cursor={"pointer"}
            onClick={() =>
              !commentDiv ? setCommentDiv(true) : setCommentDiv(false)
            }
          />
        </div>
        {commentDiv ? (
          <div className="card bg-[#1d1d1d] shadow-xl py-6 px-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="avatar flex items-center gap-x-4">
                <div className="w-8 rounded-full">
                  <img src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg" />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <h2>User Name</h2>
                <h3 className="text-[14px]">Moments Ago</h3>
              </div>
            </div>
            <div className="px-12 mt-2 font-semibold">Comment</div>
            <hr className="mt-2" />
            <div className="mt-4 flex items-center  justify-between">
              <input
                type="text"
                placeholder="Write comment"
                className="input input-bordered input-accent w-full max-w-xs"
              />
              <div className="bg-[#526362] rounded-md text-center p-2">
                <AiOutlineSend size={20} cursor={"pointer"} />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
};
export default PostItem;
