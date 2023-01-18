import './App.css';
import {Routes, Route, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

//======================================
//   IMPORTS FOR COMPONENTS AND PAGES
//======================================

//COMPONENTS
//import Nav from './components/Nav';
import IssueList from './components/issueList/issueList';

//PAGES
import Home from './Pages/Home/home';
import EditProfile from './Pages/editProfile/editProfile';
import Login from './Pages/Login/login';
import SignUp from './Pages/Signup/signup';
import ViewIssue from './Pages/viewIssue/viewIssue';
import NewIssue from './Pages/newIssue/newIssue';
import EditIssue from './Pages/editIssue/editIssue';
import NewUserList from './Pages/newUserList/newUserList';
import RequestAccess from './Pages/requestAccess/requestAccess';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/editIssue" element={<EditIssue />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="requestAccess" element={<RequestAccess />}/>
          <Route path="/viewIssue" element={<ViewIssue />}/>
          <Route path="/newIssue" element={<NewIssue />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/editprofile" element={<EditProfile />}/>
          <Route path="/newUsers" element={<NewUserList />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
