import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./components/home";
import { SmoothScroll } from "./components/SmoothScroll";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { ThemeProvider } from "./context/ThemeContext";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home /> 
  }, 
  { path: "*", element: <Home /> }, 
]);

function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <SmoothScroll>
        <Cursor />
        <RouterProvider router={router} />
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App;
