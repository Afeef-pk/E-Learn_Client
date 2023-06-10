import  {userAxiosInstance} from "../axios/axios"

const userLogin = (userData)=>{
    return userAxiosInstance.post("/signin",userData)
}

const userSignup = (phone) =>{
    return userAxiosInstance.post("/user/exist",{phone})
}

const verifySignup = (userData,code,googleAuth=false)=>{
    return userAxiosInstance.post("/verify/signup",{userData,code,googleAuth})
} 

const userAuth = ()=>{
    return userAxiosInstance.get("/userAuth")
}

const homeCourseLoad = ()=>{
    return userAxiosInstance.get("/home-course")
}

const getCourseList =()=>{
    return userAxiosInstance.get("/course")
}

const getCourseView = (courseId)=>{
    return userAxiosInstance.get(`/course-details/${courseId}`)
}

const getUserDetails = ()=>{
    return userAxiosInstance.get('/profile',)
}

const updateUserDetails = (userData)=>{
    return userAxiosInstance.post('/update/profile',{...userData})
}

export {
    userSignup,
    userLogin,
    verifySignup,
    userAuth,
    homeCourseLoad,
    getCourseList,
    getCourseView,
    getUserDetails,
    updateUserDetails
}