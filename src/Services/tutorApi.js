import { tutorAxiosInstance } from "../axios/axios";

const tutorSignin = (values)=>{
    return tutorAxiosInstance.post("/signin",values)
}

const signupApi = ({tutorData,imageUrl}) =>{
    return tutorAxiosInstance.post("/signup",{tutorData,imageUrl})
}

const tutorAuth =()=>{
    return tutorAxiosInstance.get("/tutorauth")
}

export {
    tutorSignin,
    signupApi,
    tutorAuth
}