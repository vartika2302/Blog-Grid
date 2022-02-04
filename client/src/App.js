import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SinglePost from "./components/singlePost/SinglePost";
import NotFound404 from "./pages/notFound404/NotFound404";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route exact path="/post/:postId" element={<Single />} />
        <Route
          exact
          path="/settings"
          element={user ? <Settings /> : <Register />}
        />
        <Route exact path="/write" element={user ? <Write /> : <Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
