import  {userAxiosInstance} from "../axios/axios"

const userLogin = (values)=>{
    return userAxiosInstance.post("/signin",values)
}

const userSignup = (phone) =>{
    return userAxiosInstance.post("/user/exist",{phone})
}

const verifySignup = (userData,code)=>{
    return userAxiosInstance.post("/verify/signup",{userData,code})
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