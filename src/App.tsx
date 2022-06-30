import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import MainContents from "./layout/MainContents";
import "./styles/global.css";

const App = () => {
  return (
    <BrowserRouter>
      <MainContents />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
