import { adminAxiosInstance } from "../axios/axios";

const postAdminLogin = (values)=>{
    return adminAxiosInstance.post("/",values)
}

const adminAuth = ()=>{
    return adminAxiosInstance.get("/auth")
}

export {
    postAdminLogin,
    adminAuth
}