import React from 'react'

import Login from '../views/Login'
import Home from '../views/Home'

import { AuthConsumer } from './ProvedorAutenticacao'

import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
import ConsultaCliente from '../views/pcmais/cliente/ConsultaCliente'
import CadastroCliente from '../views/pcmais/cliente/CadastroCliente'
import ConsultaPrograma from '../views/controle/programa/ConsultaPrograma'
import CadastroPrograma from '../views/controle/programa/CadastroPrograma'
import ConsultaContratante from '../views/controle/contratante/ConsultaContratante'

function RotaAutenticada({component:Component, isUsuarioAutenticado,...props}){
    return(
        <Route exact {...props} render = { (componentProps) =>{
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={{pathname : '/login',state : {from: componentProps.location}}}/>
                )
            }
        }}/>
    )
}

function Rotas(props){
    return(
        
        <HashRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cliente" component={ConsultaCliente}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-cliente/:id?" component={CadastroCliente}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/programa" component={ConsultaPrograma}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-programa/:id?" component={CadastroPrograma}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/contratante" component={ConsultaContratante} />

            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
    { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
</AuthConsumer>
)

 


