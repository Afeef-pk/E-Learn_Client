import { adminAxiosInstance } from "../axios/axios";

const postAdminLogin = (values)=>{
    return adminAxiosInstance.post("/",values)
}

const adminAuth = ()=>{
    return adminAxiosInstance.get("/auth")
}

const dashboardData = ()=>{
    return adminAxiosInstance.get("/dashboard")
}
const getUserList = ()=>{
    return adminAxiosInstance.get("/users")
}

const updateUserStatus = (userId)=>{
    return adminAxiosInstance.patch(`/user/status?userId=${userId}`)
}

const getTutorsList = ()=>{
    return adminAxiosInstance.get("/tutors")
}


export {
    postAdminLogin,
    adminAuth,
    getUserList,
    updateUserStatus,
    getTutorsList,
    dashboardData
}