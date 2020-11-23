import React from 'react';
import Routes from './routes';

import GlobalStyles from './styles';

import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css' ;

function App() {
  return (
    <>
      <Routes />
      <ToastContainer/>
      <GlobalStyles/>
    </>
  );
}

export default App;
