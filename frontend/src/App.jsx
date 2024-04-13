import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom'


function App() {
  return (
    <>
    <Link to="/sign-in"> SignIn </Link>
    </>
  );
}

export default App;
