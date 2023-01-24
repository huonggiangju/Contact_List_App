
import './App.css';
import React, { useEffect }from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Narbar';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import Auth from './components/user/Auth'


const App = () => {
 
  return (
    <React.Fragment>
      <Navbar/>

      <Routes>
          <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
          <Route path={'/contacts/list'} element={<ContactList/>}/>
          <Route path={'/contacts/add'} element={<AddContact/>}/>
          <Route path={'/contacts/view/:id'} element={<ViewContact/>}/>
          <Route path={'/contacts/edit/:id'} element={<AddContact/>}/>
          <Route path={"/auth"}  element={<Auth/>}/>
          
      </Routes>


    </React.Fragment>
  );
}

export default App;
