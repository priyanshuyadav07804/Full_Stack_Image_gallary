import Galary from "./components/Galary";
import { useSelector } from 'react-redux';
import Modal from './components/Modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddImage from "./components/AddImage";
import Desc from "./components/Desc";

const App = () => {
  const { isOpen } = useSelector((store) => store.modal);
  
  return (
    <>
      {isOpen && <Modal />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Galary />} />
          <Route path="/add-img" element={<AddImage />} />
          <Route path="/single-item/:id" element={<Desc />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
