import './App.css';
import {Routes, Route, useParams, useNavigate, Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';

//======================================
//   IMPORTS FOR COMPONENTS AND PAGES
//======================================

//COMPONENTS
import Nav from './components/Nav/nav';

//PAGES
import Home from './Pages/Home/home';
import EditProfile from './Pages/editProfile/editProfile';
import Login from './Pages/Login/login';
import SignUp from './Pages/Signup/signup';
import ViewIssue from './Pages/viewIssue/viewIssue';
import NewIssue from './Pages/newIssue/newIssue';
import EditIssue from './Pages/editIssue/editIssue';
import UserList from './Pages/userList/userList';
import RequestAccess from './Pages/requestAccess/requestAccess';
import UserIssues from './Pages/userIssues/userIssues';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const requireAuth = () => {
    return (isLoggedIn == true ? <Outlet /> : <Navigate to="/login" replace />)
  }

  return (
    <>
    <header>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </header>
      <main>
        <Routes>
            <Route path="/" 
          element={<Home/>}/>
          
          <Route path="/editIssue/:issueId" element={<EditIssue />}/>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="requestAccess" element={<RequestAccess />}/>
          <Route path="/viewIssue/:issueId" element={<ViewIssue />}/>
          <Route path="/newIssue" element={<NewIssue />}/>
          <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/editprofile" element={<EditProfile />}/>
          <Route path="/userList" element={<UserList />}/>
          <Route path="/myPosts" element={<UserIssues />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
