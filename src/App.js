// src/App.js
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Aviator from './components/aviator';
import SVGs from './components/svgs';
import AviatorProvider from './store/aviator';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

function App() {
  useEffect(() => {
    // Browser tab title
    document.title = "SkyFly Crash";
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <SVGs />
      <SnackbarProvider maxSnack={3}>
        <AviatorProvider>
          <BrowserRouter>
            <Routes>
              {/* route path changed from "aviator" -> "skyfly" */}
              <Route path="skyfly">
                <Route index element={<Aviator />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AviatorProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
