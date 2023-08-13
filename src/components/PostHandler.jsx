import { useContext, useState } from "react";
// Icons
import { BsFileEarmarkImage } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
// Components
import Posts from "./Posts";
// Context
import { UserContext } from "../context/user/UserContext";
import { PostContext } from "../context/post/PostContext";
import { createPost } from "../context/post/PostActions";
// Toast
import { toast } from "react-hot-toast";

const PostHandler = () => {
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [prevImgFile, setPrevImgFile] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const { userState } = useContext(UserContext);
  const { dispatchPost } = useContext(PostContext);

  const onFileChange = (event) => {
    const { name, files } = event.target;
    let file = files[0];

    if (name === "image") {
      setImgFile(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPrevImgFile(reader.result);
        };
      }
    } else if (name === "audio") {
      setAudioFile(files[0]);
    } else if (name === "video") {
      setVideoFile(files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      document.getElementById("postBtn").disabled = true;
      let formData = new FormData();
      formData.append("description", description);
      formData.append("imgFile", imgFile);
      formData.append("audioFile", audioFile);
      formData.append("videoFile", videoFile);

      const response = await createPost(formData, userState.user.token);
      console.log({ response });
      dispatchPost({ type: "CREATE_POST", payload: response });
      setDescription("");
      setImgFile(null);
      setAudioFile(null);
      setVideoFile(null);
      setPrevImgFile("");
      toast.success("Post Created Successfully😎");
      document.getElementById("postBtn").disabled = false;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className="card bg-base-100 shadow-xl py-6 px-4 h-full"
      >
        <div className="flex items-center gap-4">
          <div className="avatar flex items-center gap-x-4">
            <div className="w-12 rounded-full">
              <img src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg" />
            </div>
          </div>
          <div className="w-full">
            <textarea
              type="text"
              placeholder="What's on your mind..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered input-accent w-full"
            />
          </div>
        </div>
        <hr className="mt-2" />
        <div className="mt-2">
          {prevImgFile && (
            <img src={prevImgFile} className="h-40 w-40 rounded object-fill" />
          )}
        </div>
        <div className="flex items-center justify-evenly mt-4">
          <div className="flex gap-3 sm:gap-12 min-w-full justify-around">
            <input
              id="audio"
              type="file"
              hidden
              name="audio"
              accept="audio/*"
              onChange={onFileChange}
            />
            <input
              id="video"
              type="file"
              hidden
              name="video"
              accept="video/*"
              onChange={onFileChange}
            />
            <input
              id="image"
              type="file"
              hidden
              name="image"
              accept="image/*"
              onChange={onFileChange}
            />

            <div className="flex items-center gap-2 hover:text-[aquamarine]">
              <BsFileEarmarkImage />
              <label htmlFor="image" className="cursor-pointer">
                Image
              </label>
            </div>
            <div className="flex items-center gap-2 hover:text-[aquamarine]">
              <BsPlayCircle />
              <label htmlFor="video" className="cursor-pointer">
                Clip
              </label>
            </div>
            <div className="flex items-center gap-2 hover:text-[aquamarine]">
              <AiFillAudio />
              <label htmlFor="audio" className="cursor-pointer">
                Audio
              </label>
            </div>
            <button
              id="postBtn"
              className="btn btn-info bg-[#2ee7a9] border-black"
            >
              Post
            </button>
          </div>
        </div>
      </form>
      <div>
        <Posts />
      </div>
    </div>
  );
};
export default PostHandler;
