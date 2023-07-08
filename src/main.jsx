import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route index element={<Home />} />
      <Route path="learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </Router>
);

function NoMatch() {
  return <p>There's nothing here: 404!</p>;
}

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
      <Link to="/learn">Learn</Link>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link to="/learn/courses">courses</Link> |
      <Link to="/learn/bundles">bundle</Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "Nodejs"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses List</h1>
      <h4>Courses Card</h4>

      <p>More Test</p>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow",
          };
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <br />
      <NavLink to={`/learn/courses/tests`}>tests</NavLink>

      <Outlet />
    </div>
  );
}

function CourseId() {
  const navigate = useNavigate();
  const { courseid } = useParams();
  return (
    <div>
      <h1>URL Params is : {courseid}</h1>
      <button
        onClick={() => {
          navigate("/dashboard", { state: courseid });
        }}
      >
        Price
      </button>
      // Alternative
      <Link to="/dashboard" state={"DJANGO"}>
        Test Link
      </Link>
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that I got here is : {location.state}</h1>
    </div>
  );
}
