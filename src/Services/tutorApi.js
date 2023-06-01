import { tutorAxiosInstance } from "../axios/axios";

const tutorSignin = (values)=>{
    return tutorAxiosInstance.post("/signin",values)
}

const signupApi = (values) =>{
    return tutorAxiosInstance.post("/signup",values)
}

const tutorAuth =()=>{
    return tutorAxiosInstance.get("/tutorauth")
}

export {
    tutorSignin,
    signupApi,
    tutorAuth
}