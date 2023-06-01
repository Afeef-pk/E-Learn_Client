import { adminAxiosInstance } from "../axios/axios";

const postAdminLogin = (values)=>{
    return adminAxiosInstance.post("/",values)
}

const adminAuth = ()=>{
    return adminAxiosInstance.get("/auth")
}

const getUserList = ()=>{
    return adminAxiosInstance.get("/users")
}

const getTutorsList = ()=>{
    return adminAxiosInstance.get("/tutors")
}


export {
    postAdminLogin,
    adminAuth,
    getUserList,
    getTutorsList
}