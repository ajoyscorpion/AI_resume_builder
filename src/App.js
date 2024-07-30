import './App.css';
import Navbar from './Components/Navbar';
import Landing from './Pages/landing';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error_404 from './Pages/error_404';
//import Dashboard from './Pages/dashboard';
import Footer from './Components/Footer';
import CreateResume from './Pages/CreateResume';
//import UpdateResume from './Pages/UpdateResume';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    // eslint-disable-next-line
    errorElement: <Error_404/>
    
  },
  {
    path:"/create_resume",
    element:<CreateResume/>
  },
]);

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Landing/> */}
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;
