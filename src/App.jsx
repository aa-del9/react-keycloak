import React, { useState } from "react";
import "./App.css";

import Keycloak from "keycloak-js";

let initOptions = {
  url: "http://localhost:8080/",
  realm: "react",
  clientId: "react-client",
  onLoad: "check-sso", // check-sso | login-required
  KeycloakResponseType: "code",

  // silentCheckSsoRedirectUri: (window.location.origin + "/silent-check-sso.html")
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: initOptions.onLoad,
  KeycloakResponseType: "code",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  checkLoginIframe: false,
  pkceMethod: "S256",
}).then(
  (auth) => {
    console.log(auth);
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
      console.log("auth", auth);
      console.log("Keycloak", kc);
      kc.onTokenExpired = () => {
        console.log("token expired");
      };
    }
  },
  () => {
    console.error("Authenticated Failed");
  }
);

function App() {
  const [infoMessage, setInfoMessage] = useState("");

  return (
    <div className="App">
      <h1>React Keycloak</h1>
      <div className="grid">
        <div className="col">
          <button
            onClick={() => {
              setInfoMessage(
                kc.authenticated
                  ? "Authenticated: TRUE"
                  : "Authenticated: FALSE"
              );
            }}
            className="m-1"
          >
            Is Authenticated
          </button>
          <button
            onClick={() => {
              kc.login();
            }}
            className="m-1"
            label=""
            severity="success"
          >
            Login
          </button>
          <button
            onClick={() => {
              setInfoMessage(kc.token);
            }}
            severity="info"
          >
            Show Access Token
          </button>
          <button
            onClick={() => {
              setInfoMessage(JSON.stringify(kc.tokenParsed));
            }}
            className="m-1"
            severity="info"
          >
            Show Parsed Access token
          </button>
          <button
            onClick={() => {
              setInfoMessage(kc.isTokenExpired(5).toString());
            }}
            className="m-1"
            label=""
            severity="warning"
          >
            Check Token expired
          </button>
          <button
            onClick={() => {
              kc.updateToken(10).then(
                (refreshed) => {
                  setInfoMessage("Token Refreshed: " + refreshed.toString());
                },
                (e) => {
                  setInfoMessage("Refresh Error");
                }
              );
            }}
            className="m-1"
            label=""
          >
            Update Token (if about to expire)
          </button>
          {/** 10 seconds */}
          <button
            onClick={() => {
              kc.logout({ redirectUri: "http://localhost:5173/" });
            }}
            className="m-1"
            label=""
            severity="danger"
          >
            Logout
          </button>
        </div>
      </div>
      {/* <div className='grid'>
      <div className='col'>
        <h2>Is authenticated: {kc.authenticated}</h2>
      </div>
        </div> */}
      <div className="grid">
        <div className="col-2"></div>
        <div className="col-8">
          <p style={{ wordBreak: "break-all" }} id="infoPanel">
            {infoMessage}
          </p>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default App;
