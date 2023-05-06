import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';


// You probably shouldn't modify this file :)
// This is the entry point that React uses to render your app.



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId = "296281874095-j1kagpkpq2spn433j5bq2al44kgj2d0m.apps.googleusercontent.com">
  <React.StrictMode>

    <BrowserRouter>
      <App/>
    </BrowserRouter>
    
  </React.StrictMode>
  </GoogleOAuthProvider>
);
