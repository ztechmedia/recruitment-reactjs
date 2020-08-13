import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authAction from "./store/actions/auth";

//ui components
import Spinner from "./components/ui/Spinner/Spinner";

//routing components
import Routes from "./components/routing/Routes";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.checkState);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.userLogged);

  const onAuthCheckState = useCallback(() => {
    dispatch(authAction.authCheckState());
  }, [dispatch]);

  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState]);

  let layout = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: window.innerHeight,
      }}
    >
      <Spinner />
    </div>
  );

  if (!loading) {
    layout = <Routes user={user} isAuthenticated={isAuthenticated} />;
  }

  return layout;
}

export default App;
