import React from "react";
import PrimeReact from "primereact/api";
import { Switch } from "react-router";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

//Context
import { LoadingContextProvider } from "./context/Loading";
import { ToasterContextProvider } from "./context/ToasterContext";
import { UserContextProvider } from "./context/UserContext";
import { AppContextProvider } from "./context/AppContext";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import pageURL from "./utils/pageUrls";

//Pages
const TheLayout = React.lazy(() => import("./template/TheLayout"));
const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
  PrimeReact.ripple = true;


  return (
    <LoadingContextProvider>
      <AppContextProvider>
        <ToasterContextProvider>
          <UserContextProvider>
            <React.Suspense fallback={<Loader isLoaderShow={true}></Loader>}>
              <Switch>
                <PublicRoute component={Login} path={pageURL.login} exact />
                <PrivateRoute component={TheLayout} path="*" exact />
              </Switch>
            </React.Suspense>
          </UserContextProvider>
        </ToasterContextProvider>
      </AppContextProvider>
    </LoadingContextProvider>
  );
};

export default App;
