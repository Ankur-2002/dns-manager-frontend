import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Auth/Login';
import AuthProvider from './store/authContext';
import context from './store/createStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import Outlet from './components/Outlet/Outlet';
import Home from './pages/Home/Home';
import CreateDomain from './pages/CreateDomain/CreateDomain';
import Domain from './pages/Domain/Domain';

const AuthenticatedRoute = () => {
  const { currentUser, loading } = useContext(context);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-domain" element={<CreateDomain />} />
        <Route path="/domain/:name/:id" element={<Domain />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <AuthenticatedRoute />
      </Router>
    </AuthProvider>
  );
}

export default App;
