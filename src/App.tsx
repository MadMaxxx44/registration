import Register from "./Register";
import SignIn from "./SignIn";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/signIn" element={<SignIn />} />
    </Routes>
  );
}

export default App;
