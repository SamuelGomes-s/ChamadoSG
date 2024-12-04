import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import AuthProvider from "./context/authContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer autoClose={3000} />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
