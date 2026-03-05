import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./components/home";
import { SmoothScroll } from "./components/SmoothScroll";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home /> 
  }, 
  { path: "*", element: <Home /> }, 
]);

function App() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <Cursor />
        <RouterProvider router={router} />
      </SmoothScroll>
    </>
  )
}

export default App;
