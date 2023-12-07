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
import { createContext, useEffect, useState } from 'react';

// Get nodes data
import sampleNodesData from './assets/nodesdata.json';
import { RingLoader } from 'react-spinners';
import { Box } from '@mui/material';
import Swal from 'sweetalert2';

function PrivateRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

function PublicRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}

export const DataContext = createContext();

function App() {
  const [nodesData, setNodesData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateNodesData = (newNodesData) => {
    console.log('newNodesData', newNodesData);
    setNodesData(newNodesData);
    localStorage.setItem('nodesData', JSON.stringify(newNodesData));
  };

  useEffect(() => {
    console.log(sampleNodesData);
    // check local storage for nodes data
    const localNodesData = localStorage.getItem('nodesData');
    if (localNodesData !== null && localNodesData !== 'undefined' && localNodesData !== '') {
      // check if valid JSON or if empty
      if (!JSON.parse(localNodesData) || JSON.parse(localNodesData).length === 0) {
        // set nodes data
        setNodesData(sampleNodesData);
        // save nodes data to local storage
        localStorage.setItem('nodesData', JSON.stringify(nodesData));
      } else {
        // set nodes data
        setNodesData(JSON.parse(localNodesData));
      }
    } else {
      // set nodes data
      setNodesData(sampleNodesData);
      // save nodes data to local storage
      localStorage.setItem('nodesData', JSON.stringify(sampleNodesData));
    }

    // load for 3 seconds
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: 'Data loaded successfully!',
        text: 'Data loaded successfully! It took 3 seconds because we want to show the loading spinner',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, 3000);
  }, []);

  return (
    <DataContext.Provider value={{ nodesData, updateNodesData }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}>
          <RingLoader
            color="#36d7b7"
            loading={loading}
            css={{
              display: 'block',
              margin: 'auto',
              marginTop: '20%',
              // center the spinner
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            size={200}
          />
        </Box>
      ) : (
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
      )}
    </DataContext.Provider>
  );
}

export default App;
