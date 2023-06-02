import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import TutorRouter from "./routes/TutorRouter";
import AdminRouter from "./routes/AdminRouter";
import './index.css'
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<UserRouter />} />
          <Route path={"/tutor/*"} element={<TutorRouter />} />
          <Route path={"/admin/*"} element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

