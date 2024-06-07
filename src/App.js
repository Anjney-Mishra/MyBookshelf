import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersonalBookshelf from "./pages/PersonalBookshelf";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/personalbookshelf" element={<PersonalBookshelf/>} />
    </Routes>
    <Toaster position='top-center'/>
    </>
  );
}

export default App;
