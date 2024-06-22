import MyProfile from "../components/MyProfile";
import UserOptions from "../components/UserOptions";
import Header from "../components/Header";

const Profile = () => {
 

  return (
    <>
      <Header />
      <UserOptions className="fixed right-1 mmd:right-6 top-7" />
      <MyProfile />
    </>
  );
};

export default Profile;
