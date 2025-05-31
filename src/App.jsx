import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";


import Layout from "./components/layout";
import Home from "./pages/Homes";
import LoginAndRegister from "./pages/LoginAndRegister";
import Services from "./pages/Services";
import YouknowWho from "./pages/YouknowWho";
import ActivateWorkshopOwner from "./pages/ActivateWorkshopOwner";
import DashboardInstructor from "./pages/DashboardInstructor";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart"
import ProductPage from "./pages/Product";
import UploadExample from "./utils/imagekit-upload";
import WorkshopPage from "./pages/WorkshopPage";
import HistoryTransaction from "./pages/HistoryTransaction";
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
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/services",
          element: <Services />
        },
        {
          path: "/Banlaai",
          element: <YouknowWho />
        },
        {
          path: "/activateWorkshopOwner",
          element: <ActivateWorkshopOwner />
        },
        {
          path: "/dashboardInstructor",
          element: <DashboardInstructor />
        },
        {
          path: "/product/:id",
          element: <ProductDetail />
        },
        {
          path: "/product",
          element: <ProductPage />
        },
        {
          path: "/upload",
          element: <UploadExample />
        },
        {
          path: "/workshop",
          element: <WorkshopPage />
        },
        {
          path: "/historyTransaction",
          element: <HistoryTransaction />
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
