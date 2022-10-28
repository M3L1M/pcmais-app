import React from 'react';

import NavbarItem from './NavbarItem';
import {AuthConsumer} from '../main/ProvedorAutenticacao';

import logopcmais from '../img/logopcmais.ico';
import NavbarDropdown from './NavbarDropdown';

function Navbar(props){
    //<NavbarDropdown render={props.isUsuarioAutenticado}  label='Licenca'/>
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
            <div className="container-fluid">

                
                <a href="#/home" className="navbar-brand"><img src={logopcmais} width="64" height="64" /></a> 
                <button className="navbar-toggler" type="button" 
                        data-toggle="collapse" data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav me-auto"> 
                        <NavbarItem render={props.isUsuarioAutenticado} href='#/home' label='Home'/>
                        
                        
                        <NavbarItem render={props.isUsuarioAutenticado} href='#/cliente' label='Cliente'/>
                        <NavbarItem render={props.isUsuarioAutenticado} href='#/programa' label='Programa'/>        

                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href='#/login' label='Sair'/>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>
        )}
    </AuthConsumer>
)