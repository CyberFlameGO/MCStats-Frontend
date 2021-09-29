import { BrowserRouter, Switch, Route } from "react-router-dom";

import Breadcrumb from "./components/layout/breadcrumb";
import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";

import Main from "./pages/main";
import Search from "./pages/search";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app">
        <div className="wrapper">
          <Sidebar />
          <div className="container">
            <Breadcrumb />
            <div className="view">
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/search">
                  <Search />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
