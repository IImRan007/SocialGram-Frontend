import UserCard from "../components/UserCard";
import PostHandler from "../components/PostHandler";

const Profile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-6 px-6 gap-8">
      <UserCard />
      <PostHandler />
    </div>
  );
};
export default Profile;
