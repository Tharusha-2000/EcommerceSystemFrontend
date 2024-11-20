import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar'
import AdminProductTable from '../features/admin/components/AdminProductTable'



export const AdminViewProducts = () => {
  return (
    <>
    <Navbar/>
     <AdminProductTable/>
    </>
  )
}
