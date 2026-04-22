import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GitProjectDescription from "./pages/GitProjectDescription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<GitProjectDescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
