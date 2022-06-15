import React, { lazy, Suspense, useEffect, useState } from "react";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import { createBrowserHistory } from "history";

import Progress from "./components/Progress";
const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/Dashboard"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

//<BrowserRouter> will create Browser History
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);
  return (
    // <BrowserRouter>

    //easy to access history. create history manual
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path={"/auth"}>
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path={"/dashboard"}>
                {!isSignedIn && <Redirect to={"/"} />}
                <DashboardLazy />
              </Route>
              <Route path={"/"} component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
    // </BrowserRouter>
  );
};
