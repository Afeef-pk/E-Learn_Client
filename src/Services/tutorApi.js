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

const uploadCourse = (courseData,imageURL,courseURL)=>{
    return tutorAxiosInstance.post("/upload/course",{courseData,imageURL,courseURL})
}

const dashboardCourses = ()=>{
    return tutorAxiosInstance.get("/all-course/")
}

const deleteCourse = (courseId)=>{
    return tutorAxiosInstance.delete(`/delete/${courseId}`)
}

export {
    tutorSignin,
    signupApi,
    tutorAuth,
    uploadCourse,
    dashboardCourses,
    deleteCourse
}