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


export {
    userSignup,
    userLogin,
    verifySignup,
    userAuth
}