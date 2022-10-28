import React from "react";

import PcMaisAuthService from "../app/pcmais/service/PCMaisAuthService"

export const AuthContext=React.createContext();
export const AuthConsumer=AuthContext.Consumer;

const AuthProvider=AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{
    
    state = {
        usuarioAutenticado:null,
        isAutenticado:null,
        nome:null
    }

    iniciarSessao = (usuario) => {
        PcMaisAuthService.logar(usuario);
        this.setState({isAutenticado : true,usuarioAutenticado : usuario, nome:usuario.nome})
    }

    encerrarSessao = () => {
        PcMaisAuthService.removerUsuarioAutenticado();
        this.setState({isAutenticado:false,usuarioAutenticado:null})
    }

    render(){
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto} >
                {this.props.children}
            </AuthProvider>
        )
    }
}


export default ProvedorAutenticacao;