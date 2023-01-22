
import './App.css';
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Narbar';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';


let App = () => {
  return (
    <React.Fragment>
      <Navbar>
      </Navbar>

      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}></Route>
        <Route path={'/contacts/list'} element={<ContactList/>}></Route>
        <Route path={'/contacts/add'} element={<AddContact/>}></Route>
        <Route path={'/contacts/view/:id'} element={<ViewContact/>}></Route>
        <Route path={'/contacts/edit/:id'} element={<AddContact/>}></Route>
      </Routes>

    </React.Fragment>
  );
}

export default App;
