import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import { withRouter } from 'react-router-dom'

import {mensagemErro} from '../components/Toastr'
import { AuthContext } from '../main/ProvedorAutenticacao'
import AcessoUsuarioService from '../app/pcmais/service/AcessoUsuarioService'

class Login extends React.Component{

    state = {
        nome: '',
        senha: ''
    }

    constructor(){
        super();
        this.acessoUsuarioService = new AcessoUsuarioService();
    }

    entrar = () => {
        this.acessoUsuarioService.autenticar({
            nome : this.state.nome,
            senha : this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    
    
    }


    render(){
        return(
            <div className='row'>
                <div className='col-md-6' style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='bs-component'>
                                        <fieldset>
                                        <FormGroup label='Email: *' htmlFor='exampleInputEmail1'>
                                                <input type="email" value={this.state.nome}
                                                    onChange={e => this.setState({ nome: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputEmail1" aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label='Senha: *' htmlFor='exampleInputPassword1'>
                                                <input type="password" value={this.state.senha} 
                                                    onChange={e => this.setState({senha:e.target.value})}
                                                    className="form-control" id="exampleInputPassword1"
                                                    placeholder="Senha"/>
                                            </FormGroup>
                                            <button onClick={this.entrar} title="Entrar"
                                                    className='btn btn-success'>
                                                        <i className="pi pi-sign-in mr-2"></i>
                                            </button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext
export default withRouter(Login) 