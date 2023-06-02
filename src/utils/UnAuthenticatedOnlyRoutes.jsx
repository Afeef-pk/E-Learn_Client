import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedOnlyRoutes = (props) => {
  if(props.role == "user"){
    const { authorized } = useSelector((state) => state.user)
    return !authorized ? <Outlet /> : <Navigate to={'/'} />
  }else if(props.role ==="tutor"){
    const { authorized } = useSelector((state) => state.tutor)
    return !authorized ? <Outlet /> : <Navigate to={'/tutor/dashboard'} />
  }else if(props.role ==="admin"){
    const { authorized,token } = useSelector((state) => state.admin)
    return !authorized ? <Outlet /> : <Navigate to={'/admin/dashboard'} />
  }
}

export default UnAuthenticatedOnlyRoutes