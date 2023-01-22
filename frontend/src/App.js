import './App.css';
import {Routes, Route, useParams, Navigate, Outlet, RedirectFunction} from 'react-router-dom';
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
import EditUser from './Pages/editUser/editUser';



function App() {

  const [user, setUser] = useState(null)
  
  const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  const checkCreds = () => {
    if (localStorage.getItem('accessToken')) {
      let user = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        email: localStorage.getItem('email'),
        _id: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
      }
      setUser(user);
    }
  }

  return (
    <>
    {!user && checkCreds()}
    <header>
      <Nav user={user} setUser={setUser} />
    </header>
      <main>
        <Routes>
          
          <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
          <Route path="/requestAccess" element={<RequestAccess />}/>
          <Route path="/users/signup/:userId" element={<SignUp user={user} setUser={setUser} />}/>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home user={user} setUser={setUser} />}/>
            <Route path="/editIssue/:issueId" element={<EditIssue user={user} />}/>
            <Route path="/viewIssue/:issueId" element={<ViewIssue user={user} />}/>
            <Route path="/newIssue" element={<NewIssue user={user} />}/>
            <Route path="/editprofile" element={<EditProfile user={user} setUser={setUser} />}/>
            <Route path="/userList" element={<UserList user={user} />}/>
            <Route path="/myPosts" element={<UserIssues user={user} />}/> 
            <Route path="/editUser/:userId" element={<EditUser user={user} />}/>
          </Route>
          <Route path="*" element={<Navigate replace to="/" />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
