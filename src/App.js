import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analyze from "./scenes/Analyze";
import AddDrug from "./scenes/AddDrug";
import Login from "./components/Login";
import DrugList from "./components/DrugList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path = '/'  />
        <Route path = '/analyze'  Component = {Analyze} />
        <Route path = '/adddrug'  Component = {AddDrug} />
        <Route path = '/login'  Component = {Login} />
        <Route path = '/druglist'  Component = {DrugList} />


        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
