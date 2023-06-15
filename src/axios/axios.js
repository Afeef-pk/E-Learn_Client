import axios from "axios"
const userBaseURL = import.meta.env.VITE_UserBaseURL
const tutorBaseURL = import.meta.env.VITE_TutorBaseURL
const adminBaseURL = import.meta.env.VITE_AdminBaseURL

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    timeoutErrorMessage: "Request timeout... Please Try Again!!!"
  })
  return instance
}

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName)
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`
  }
  return req
}

const userAxiosInstance = createAxiosInstance(userBaseURL)
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req,"token")
  return modifiedReq
})

const tutorAxiosInstance = createAxiosInstance(tutorBaseURL)
tutorAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "tutorToken")
  return modifiedReq
})

const adminAxiosInstance = createAxiosInstance(adminBaseURL)
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken")
  return modifiedReq
})

export {userAxiosInstance,tutorAxiosInstance, adminAxiosInstance }