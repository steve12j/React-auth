import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import Editor from "./components/Editor";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Admin from "./components/Admin";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  USER: 2001,
  EDITOR: 2675,
  ADMIN: 5420,
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <LinkPage />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        element: <PersistLogin />,
        children: [
          {
            path: "home",
            element: (
              <RequireAuth allowedRoles={[ROLES.USER]} >
                <Home />
              </RequireAuth>
            ),
          },
          {
            path: "admin",
            element: (
              <RequireAuth allowedRoles={[ROLES.ADMIN]}>
                <Admin />
              </RequireAuth>
            ),
          },
          {
            path: "editor",
            element: (
              <RequireAuth allowedRoles={[ROLES.EDITOR]}>
                <Editor />
              </RequireAuth>
            ),
          },
          {
            path: "lounge",
            element: (
              <RequireAuth allowedRoles={[ROLES.EDITOR, ROLES.ADMIN]}>
                <Lounge />
              </RequireAuth>
            ),
          },
        ]
      },
      {
        path: "*",
        element: <Missing />,
      },
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
