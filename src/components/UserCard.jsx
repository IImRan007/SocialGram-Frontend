import { RiUserSettingsFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Icons
import { MdLocationPin } from "react-icons/md";
import { BiBriefcase } from "react-icons/bi";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { VscEdit } from "react-icons/vsc";
// Context
import { UserContext } from "../context/user/UserContext";
import { ProfileContext } from "../context/profile/ProfileContext";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../context/profile/ProfileActions";

const UserCard = () => {
  const [userInfo, setUserInfo] = useState({
    userLocation: "",
    userDesignation: "",
    userLinkedinUrl: "",
    userGithubUrl: "",
  });
  const [profileData, setProfileData] = useState([]);
  const { userState } = useContext(UserContext);
  const { profileState, dispatchProfile } = useContext(ProfileContext);

  const { userLocation, userDesignation, userLinkedinUrl, userGithubUrl } =
    userInfo;

  const pathname = useLocation().pathname;

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getProfile(userState.user.token);
      console.log({ data });
      dispatchProfile({ type: "GET_USER_PROFILE", payload: data });
      setProfileData(data);
      setUserInfo({
        userLocation: data[0].location,
        userDesignation: data[0].designation,
        userLinkedinUrl: data[0].linkedinUrl,
        userGithubUrl: data[0].githubUrl,
      });
    };
    fetchProfiles();
  }, [userState.user.token]);

  const handleChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleData = async () => {
    console.log("SAVE");
    if (profileData.length > 0) {
      const data = await updateProfile(
        profileData[0]?._id,
        {
          location: userLocation,
          designation: userDesignation,
          linkedinUrl: userLinkedinUrl,
          githubUrl: userGithubUrl,
        },
        userState.user.token
      );
      console.log({ data });
      setProfileData([
        {
          ...profileData[0],
          location: userLocation,
          designation: userDesignation,
          linkedinUrl: userLinkedinUrl,
          githubUrl: userGithubUrl,
        },
      ]);
    } else {
      const data = await createProfile(
        {
          location: userLocation,
          designation: userDesignation,
          linkedinUrl: userLinkedinUrl,
          githubUrl: userGithubUrl,
        },
        userState.user.token
      );
      setProfileData(data);
      dispatchProfile({ type: "CREATE_PROFILE", payload: data });
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl py-6 px-4 h-[25rem]">
        <div className="flex items-center justify-between">
          <div className="avatar flex items-center gap-x-4">
            <div className="w-12 rounded-full">
              <img src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg" />
            </div>
            <div className="w-40 h-12">
              <h2 className="w-fit">
                {userState.user ? userState.user?.name : "Name"}
              </h2>
              <h3 className="w-fit">
                {userState.user ? userState.user?.email : "Email"}
              </h3>
            </div>
          </div>
          <Link to="/profile">
            <RiUserSettingsFill className="cursor-pointer" />
          </Link>
        </div>
        <hr className="mt-4" />
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <MdLocationPin />
            <div className="w-full flex justify-between items-center">
              <h2>
                {profileData &&
                  (profileData ? profileData[0]?.location : "Location")}
              </h2>
              {pathname === "/profile" ? (
                <label htmlFor="location">
                  <VscEdit cursor={"pointer"} />
                </label>
              ) : (
                ""
              )}
            </div>
            {/* Location Dialog */}
            <input type="checkbox" id="location" className="modal-toggle" />
            <label htmlFor="location" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold text-center">Location</h3>
                <div className="m-auto flex items-center justify-center py-2">
                  <input
                    type="text"
                    id="userLocation"
                    value={userLocation}
                    placeholder="Type here"
                    className="input input-bordered input-accent w-full max-w-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className=" py-2 text-center">
                  <label
                    htmlFor="location"
                    onClick={handleData}
                    className="p-2 bg-cyan-400 text-white rounded btn-ghost cursor-pointer"
                  >
                    Save
                  </label>
                </div>
              </label>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <BiBriefcase />
            <div className="w-full flex justify-between items-center">
              <h2>
                {profileData &&
                  (profileData ? profileData[0]?.designation : "Designation")}
              </h2>
              {pathname === "/profile" ? (
                <label htmlFor="designation">
                  <VscEdit cursor={"pointer"} />
                </label>
              ) : (
                ""
              )}
            </div>
            {/* Designation Modal */}
            <input type="checkbox" id="designation" className="modal-toggle" />
            <label htmlFor="designation" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold text-center">Designation</h3>
                <div className="m-auto flex items-center justify-center py-2">
                  <input
                    type="text"
                    id="userDesignation"
                    value={userDesignation}
                    placeholder="Type here"
                    className="input input-bordered input-accent w-full max-w-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className=" py-2 text-center">
                  <label
                    htmlFor="designation"
                    onClick={handleData}
                    className="p-2 bg-cyan-400 text-white rounded btn-ghost cursor-pointer"
                  >
                    Save
                  </label>
                </div>
              </label>
            </label>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4">
          <div className="flex items-center gap-4 justify-between">
            <h2>Profile Views in last 7 days</h2>
            <h2>21</h2>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <h2>Impressions in last 7 days</h2>
            <h2>1021</h2>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <AiFillLinkedin size={22} />
              <div>
                <h2>LinkedIn</h2>
                <h2>Network Platform</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profileData[0]?.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <LiaExternalLinkAltSolid size={20} cursor={"pointer"} />
              </a>
              {pathname === "/profile" ? (
                <label htmlFor="linkedin">
                  <VscEdit cursor={"pointer"} />
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Linkedin Modal */}
          <input type="checkbox" id="linkedin" className="modal-toggle" />
          <label htmlFor="linkedin" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold text-center">Linkedin</h3>
              <div className="m-auto flex items-center justify-center py-2">
                <input
                  type="text"
                  id="userLinkedinUrl"
                  value={userLinkedinUrl}
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full max-w-xs"
                  onChange={handleChange}
                />
              </div>
              <div className=" py-2 text-center">
                <label
                  htmlFor="linkedin"
                  onClick={handleData}
                  className="p-2 bg-cyan-400 text-white rounded btn-ghost cursor-pointer"
                >
                  Save
                </label>
              </div>
            </label>
          </label>
          <div className="flex items-center gap-4 justify-between mt-2">
            <div className="flex items-center gap-4">
              <AiFillGithub size={22} />
              <div>
                <h2>Github</h2>
                <h2>Developers Platform</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profileData[0]?.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <LiaExternalLinkAltSolid size={20} cursor={"pointer"} />
              </a>
              {pathname === "/profile" ? (
                <label htmlFor="github">
                  <VscEdit cursor={"pointer"} />
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Github Modal */}
          <input type="checkbox" id="github" className="modal-toggle" />
          <label htmlFor="github" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold text-center">Github</h3>
              <div className="m-auto flex items-center justify-center py-2">
                <input
                  type="text"
                  id="userGithubUrl"
                  value={userGithubUrl}
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full max-w-xs"
                  onChange={handleChange}
                />
              </div>
              <div className=" py-2 text-center">
                <label
                  htmlFor="github"
                  onClick={handleData}
                  className="p-2 bg-cyan-400 text-white rounded btn-ghost cursor-pointer"
                >
                  Save
                </label>
              </div>
            </label>
          </label>
        </div>
      </div>
    </>
  );
};
export default UserCard;
