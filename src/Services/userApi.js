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

const getCourseList =(page,size,searchQuery,category)=>{
    return userAxiosInstance.get("/course", {
        params:{
            page,
            size,
            searchQuery,
            category
        }
    })
}

const getCourseView = (courseId)=>{
    return userAxiosInstance.get(`/course-details/${courseId}`)
}

const getUserDetails = ()=>{
    return userAxiosInstance.get('/profile',)
}

const updateUserDetails = (userData)=>{
    return userAxiosInstance.put('/update/profile',{...userData})
}

const getCourseWatch = (courseId)=>{
    return userAxiosInstance.get(`/course/view/${courseId}`)
}

const applyCouponCode = (couponCode)=>{
    return userAxiosInstance.post('/apply-coupon',{couponCode})
}

const paymentGateway = (courseId,address)=>{
    return userAxiosInstance.post('/create-checkout-session',{courseId,...address})
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
    updateUserDetails,
    getCourseWatch,
    applyCouponCode,
    paymentGateway
}