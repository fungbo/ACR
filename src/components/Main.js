import React from "react";
import "normalize.css/normalize.css";
import "styles/App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Router, Route, browserHistory} from "react-router";
import Login from "./login";
import QRPage from "./qr";

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Login}/>
          <Route path="/qr/:uuid" component={QRPage}/>
        </Router>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
