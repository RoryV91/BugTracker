import './App.css';
import {Routes, Route, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

//======================================
//   IMPORTS FOR COMPONENTS AND PAGES
//======================================

//COMPONENTS
//import Nav from './components/Nav';
import EditIssue from './components/editIssue/editIssue';
import IssueList from './components/issueList/issueList';
import NewIssue from './components/newIssue/newIssue';
import newUserList from './components/newUserList/newUserList';

//PAGES
import Admin from './Pages/Admin/admin';
import BasicUser from './Pages/basicUser/basicUser';
import EditProfile from './Pages/editProfile/editProfile';
import Login from './Pages/Login/login';
import SignUp from './Pages/Signup/signup';
import Support from './Pages/Support/support';
import ViewIssue from './Pages/viewIssue/viewIssue';

function App() {
  return (
    <>
      <header className="App-header">
      </header>
      <main>
        <Routes>
          <Route path="/" element={<BasicUser />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/support" element={<Support />}/>
          <Route path="/viewIssue" element={<ViewIssue />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/editprofile" element={<EditProfile />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
