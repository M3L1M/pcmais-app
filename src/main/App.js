import React from "react";

import Rotas from './Rotas';
import Navbar from '../components/Navbar';

import 'toastr//build/toastr.min';

import 'bootswatch/dist/cosmo/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import "bootstrap";


import ProvedorAutenticacao from "./ProvedorAutenticacao";

class App extends React.Component{

  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;