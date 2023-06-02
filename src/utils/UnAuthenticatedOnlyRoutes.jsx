import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedOnlyRoutes = ({role}) => {
  if(role === "user"){
    const { authorized } = useSelector((state) => state.user)
    return !authorized ? <Outlet /> : <Navigate to={'/'} />
  }else if(role === "tutor"){
    const { authorized } = useSelector((state) => state.tutor)
    return !authorized ? <Outlet /> : <Navigate to={'/tutor/dashboard'} />
  }else if(role === "admin"){
    const { authorized } = useSelector((state) => state.admin)
    return !authorized ? <Outlet /> : <Navigate to={'/admin/dashboard'} />
  }
}

export default UnAuthenticatedOnlyRoutes