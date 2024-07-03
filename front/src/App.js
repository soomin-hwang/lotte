import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import SearchByText from "./pages/SearchByText";

// pages

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path:'/center', element:<SearchByCenter/>},
      {path:'/topic', element:<SearchByTopic/>},
      {path:'/text', element:<SearchByText/>}
    ]
  }])

  return <RouterProvider router={router}/>;
}