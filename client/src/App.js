import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landingpage from "./components/Landingpage/Landingpage.jsx";
import Principal from "./components/Principal/Principal.jsx";
import { getRecipesBackend } from "./redux/actions.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesBackend());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/">
        <Landingpage />
      </Route>

      <Route
        path="/recipes"
        render={({ history, location }) => (
          <Principal history={history} location={location} />
        )}
      />
    </div>
  );
}

export default App;
