/* eslint-disable react/jsx-props-no-spreading */
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import Home from './components/Home';
import PrivateComponent from './components/PrivateComponent';
import NotFound from './components/NotFound';
import TopBar from './components/TopBar';
import Login from './components/Login';
import { useAuth } from './contexts/AuthContext';

// Temp
import Verticals from './components/Verticals';
import Nodes from './components/Nodes';
import NodeDetail from './components/NodeDetail';
import CreateVertical from './components/CreateVertical';
import CreateNodeType from './components/CreateNodeType';
import CreateNode from './components/CreateNode';

function PrivateRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

function PublicRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}

function App() {
  return (
    <Router>
      <TopBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="private" element={<PrivateRoute />}>
            <Route path="/private" element={<PrivateComponent />} />
          </Route>
          <Route path="verticals" element={<PrivateRoute />}>
            <Route path="/verticals" element={<Verticals />} />
          </Route>
          <Route path="nodes" element={<PrivateRoute />}>
            <Route path="/nodes" element={<Nodes />} />
            <Route path="/nodes/:id" element={<NodeDetail />} />
          </Route>
          <Route path="create-vertical" element={<PrivateRoute />}>
            <Route path="/create-vertical" element={<CreateVertical />} />
          </Route>
          <Route path="create-node-type" element={<PrivateRoute />}>
            <Route path="/create-node-type" element={<CreateNodeType />} />
          </Route>
          <Route path="create-node" element={<PrivateRoute />}>
            <Route path="/create-node" element={<CreateNode />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TopBar>
    </Router>
  );
}

export default App;
