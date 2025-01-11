import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import LandingPage from './pages/LandingPage';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/signup" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </Router>
  )
}