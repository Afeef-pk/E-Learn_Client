import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminHomePage from '../pages/admin/AdminHomePage'

const AdminRouter= ()=> {
  return (
    <Routes>
        <Route path='/' element={<AdminLoginPage/>} />
        <Route path='/dashboard' element={<AdminHomePage/>} />
    </Routes>
  )
}

export default AdminRouter
