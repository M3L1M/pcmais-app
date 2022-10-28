import React from "react";


import { AuthContext } from "../main/ProvedorAutenticacao";
import AcessoUsuarioService from "../app/pcmais/service/AcessoUsuarioService";
class Home extends React.Component{

    state = {
        nome : '',
        nomeRazao : ''
    }

    constructor(){
        super();
        this.acessoUsuarioService = new AcessoUsuarioService();
    }

    componentDidMount(){
        const usuarioLogado = this.context.usuarioAutenticado;
        
        
        this.acessoUsuarioService
            .obterNomePorId(usuarioLogado.id)
            .then(response =>{
                this.setState({nome:response.data})
            }).catch(erro => {
                console.error(erro.response);
            })
        
    }   

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo {this.state.nome}!</h1>
            
            </div>
        )
    }

}

Home.contextType=AuthContext;
export default Home;