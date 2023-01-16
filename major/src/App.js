import './App.css';
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

//======================================
//   IMPORTS FOR COMPONENTS AND PAGES
//======================================

//COMPONENTS
import Nav from './components/Nav';
import EditIssue from './components/editIssue';
import IssueList from './components/issueList';
import NewIssue from './components/newIssue';
import newUserList from './components/newUserList';

//PAGES
import Admin from './Pages/Admin';
import BasicUser from './pages/basicUser';
import EditProfile from './pages/editProfile';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Support from './pages/support';
import viewIssue from './pages/viewIssue';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
