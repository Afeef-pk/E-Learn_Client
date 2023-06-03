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

const updateTutorStatus = (tutorId)=>{
    return adminAxiosInstance.patch(`/tutor/status?tutorId=${tutorId}`)
}

const getTutorsList = ()=>{
    return adminAxiosInstance.get("/tutors")
}

const getTutorDetails = (tutorId)=>{
    return adminAxiosInstance.get(`/tutor/view?tutorId=${tutorId}`)
}
export {
    postAdminLogin,
    adminAuth,
    dashboardData,
    getUserList,
    updateUserStatus,
    getTutorsList,
    updateTutorStatus,
    getTutorDetails,
}