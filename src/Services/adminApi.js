import { adminAxiosInstance } from "../axios/axios";

const postAdminLogin = (values) => {
    return adminAxiosInstance.post("/", values)
}

const adminAuth = () => {
    return adminAxiosInstance.get("/auth")
}

const dashboardData = () => {
    return adminAxiosInstance.get("/dashboard")
}
const getUserList = () => {
    return adminAxiosInstance.get("/users")
}

const updateUserStatus = (userId) => {
    return adminAxiosInstance.patch(`/user/status?userId=${userId}`)
}

const updateTutorStatus = (tutorId) => {
    return adminAxiosInstance.patch(`/tutor/status?tutorId=${tutorId}`)
}

const getTutorsList = () => {
    return adminAxiosInstance.get("/tutors")
}

const getTutorDetails = (tutorId, tutorView ,status) => {
    return adminAxiosInstance.post('/tutor/view', { tutorId, status,tutorView })
}

const addCategory = (categoryName)=>{
    return adminAxiosInstance.post("/category",{categoryName})
}

const getCourseData = () => {
    return adminAxiosInstance.get("/courses")
}

const getCourseDetails = (courseId,status=false) => {
    return adminAxiosInstance.post(`/course/view`,{courseId, status})
}

const manageCourse = (courseId)=>{
    return adminAxiosInstance.post("/course/manage",{courseId})
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
    getCourseData,
    getCourseDetails,
    manageCourse,
    addCategory
}