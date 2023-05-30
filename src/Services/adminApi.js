import { adminAxiosInstance } from "../axios/axios";

const postAdminLogin = (values)=>{
    return adminAxiosInstance.post("/",values)
}

export {
    postAdminLogin
}