import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";


import Layout from "./components/layout";
import Home from "./pages/Homes";
import LoginAndRegister from "./pages/LoginAndRegister";
import Services from "./pages/Services";
import YouknowWho from "./pages/YouknowWho";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        
        {
          path: "/services",
          element: <Services />
        },
        {
          path: "/Banlaai",
          element: <YouknowWho />
        }
      ],
      
    },
    {
      path: "/loginAndRegister",
      element: <LoginAndRegister />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
