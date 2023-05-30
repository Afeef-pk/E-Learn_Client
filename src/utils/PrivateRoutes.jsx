import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {Navigate,Outlet,useNavigate} from 'react-router-dom' 
import { userAuth } from '../Services/userApi'

function PrivateRoutes({role,route}) {
const dispatch= useDispatch()
let [auth,setAuth]=useState(null)
const navigate=useNavigate()

useEffect(() => {
  if(role==="user"){
   userAuth().then((response)=>{
    console.log(response.data);
    if(!response.data.status){
       
       
    }else if(response.data.status){
          
    }
    setAuth(response.data?.status)    
    
}).catch((response)=>{
    console.log(response);
       
   }) 
}
//   }else if(role==="admin"){
//     authAdmin().then((resp)=>{
//         if(!resp.data.auth){
//             localStorage.removeItem('admintoken')
//             dispatch(adminlogout())
//         }else if(resp.data.auth){
//             dispatch(adminlogin(resp.data.result))
//         }
//         setAuth(resp.data.auth)
//     }).catch(resp=>{
//         setAuth(resp.data?.auth)
//         navigate('/admin/login')
//     })
//   }else if(role==="expert"){
//     authExpert().then(resp=>{
//         if(!resp.data.auth){
//             localStorage.removeItem('experttoken')
//             dispatch(expertlogout())
//         }else{
//             dispatch(expertlogin(resp.data))
//         }
//         setAuth(resp.data.auth)
//     }).catch(resp=>{
//         setAuth(resp.data?.auth || null)
//         navigate('/expert/login')
//     })
//   }
}, [])
console.log(auth);
if(auth==null) return

  return (
    auth ? <Outlet/> : <Navigate to={route}/>
  )
}

export default PrivateRoutes