import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppSubModuleOne from "./AppSubModuleOne.js";
//import AppSubModuleTwo from "./Components/AppSubModuleTwo.js";
const App=()=>
{
const navigate = useNavigate();
return (<div><button onClick={() => navigate("/AppSubModuleOne.js")}>X</button></div>);
}
export default App;


