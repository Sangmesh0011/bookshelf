import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Bookshelf from "./components/Bookshelf";

function App() {
  return (
    <div className="w-full flex flex-col justify-center align-middle">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shelf" element={<Bookshelf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
