import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { SignUp } from './Components/Pages/Auth/SignUp';
import { Layout } from './Components/Layout';

function App() {
  return (
    <BrowserRouter>

      <Routes>

      <Route path='/' element={<Layout />}>


        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="sign/up" element={<SignUp />} />
        </Route>

      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
