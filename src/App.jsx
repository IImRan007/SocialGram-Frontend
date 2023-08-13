import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Layout
import Navbar from "./layout/Navbar";
// Component
import PrivateRoute from "./components/PrivateRoute";
// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Context
import { UserProvider } from "./context/user/UserContext";
import { PostProvider } from "./context/post/PostContext";
import { ProfileProvider } from "./context/profile/ProfileContext";
// Toast
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <PostProvider>
        <ProfileProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
          <Toaster />
        </ProfileProvider>
      </PostProvider>
    </UserProvider>
  );
};
export default App;
