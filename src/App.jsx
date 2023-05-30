import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import TutorRouter from "./routes/TutorRouter";
import AdminRouter from "./routes/AdminRouter";
import './index.css'

function App() {
  return (
    <>
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

