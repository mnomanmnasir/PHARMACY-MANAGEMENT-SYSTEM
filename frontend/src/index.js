import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import Dashboard from "./containers/Dashboard";
import Sidebar from "./components/Sidebar";
import Customer from "./containers/Customer";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Import your publishable key
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route
            path="/sign-in/*"
            element={
              <SignIn
                // redirectUrl={"/sidebar"}
                routing="path"
                path="/sign-in"
                hideBranding
              />
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <SignUp
                // redirectUrl={"/sidebar"}
                routing="path"
                path="/sign-up"
                hideBranding
              />
            }
          />
          <Route
            path="/sidebar"
            element={
              <>
                <SignedIn>
                  <ProtectedPage />
                </SignedIn>
                <SignedOut>
                  <ProtectedPage />
                </SignedOut>
              </>
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </ClerkProvider>
    </>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
