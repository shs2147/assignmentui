import logo from './logo.svg';
import './App.css';
import SignUpForm from  './SignUpForm';
import LoginForm from './LoginForm';
import { Route,  Routes } from 'react-router-dom';
import IncidentPage from './IncidentPage';
import ForgotPassword from './Component/forgotPassword';
function App() {
  return (
    <div className="App">
    {/* <h1>Signup Form</h1>
    <SignUpForm /> */}
    <Routes>
      <Route path={'/signup'} element={<SignUpForm/>} />
      <Route path='/' element={<LoginForm />} />
      <Route path='/incident' element={<IncidentPage />} />
      <Route path='/forgetPassword' element={<ForgotPassword />} />
    </Routes>
</div>
);

}

export default App;
