import React from "react";

import { withRouter } from "react-router-dom";

import ProgramaService from "../../../app/controle/service/ProgramaService";
import ClienteService from "../../../app/pcmais/service/ClienteService";


import Card from "../../../components/Card";
import FormGroup from "../../../components/FormGroup";
import * as messages from "../../../components/Toastr";



class CadastroPrograma extends React.Component {


    state = {
        id: null,
        descricao: '',
        cpfCnpj: '',
        nomeRazao: '',
        idCliente: '',
        atualizando: false,


    }


    constructor() {
        super();
        this.ProgramaService = new ProgramaService();
        this.ClienteService = new ClienteService();

       
        
        
    }

    


    buscaCpf = () => {
        try {

            this.ClienteService
                .obterId(this.state.cpfCnpj).then(resposta => {
                    const resultado = resposta.data;
                    this.cpfCnpj = resultado.nomeRazao
                })

        } catch (erro) {
            messages.mensagemErro("CPF não esta cadastrado na base de dados")
            return false;
        }

    }

    submit = () => {
        const { descricao, idCliente } = this.state;
        const programa = { descricao, idCliente }

        try {
            this.ProgramaService.validar(programa)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.ProgramaService
            .salvar(programa)
            .then(response => {
                this.props.history.push('/programa')
                messages.mensagemSucesso("Programa cadastrado com sucesso!");
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }



    atualizar = () => {
        const { descricao, idCliente } = this.state;
        const programa = { descricao, idCliente }

        this.ProgramaService
            .atualizar(programa)
            .then(response => {
                this.props.history.push('/programa')
                messages.mensagemSucesso('Programa atualizado com sucesso')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }


    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    render() {

       
        return (
            <div className="container">

                <Card title={this.state.atualizando ? 'Atualização de Cadastro' : 'Cadastro de Programa'}>
                    <div className="row">
                        <div className="col-md-5">
                            <FormGroup htmlFor="inputDescricao" label="Descricao: *">
                                <input type="text"
                                    id="inputDescricao"
                                    className="form-control"
                                    name="name"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descricao" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <FormGroup htmlFor="inputCnpj" label="Cnpj: *">
                                <input type="text"
                                    id="inputCnpj"
                                    className="form-control"
                                    name="name"
                                    value={this.state.cpfCnpj}
                                    onChange={e => this.setState({ cpfCnpj: e.target.value })}
                                    placeholder="" />
                            </FormGroup>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.buscaCpf} className="btn btn-success">
                                <i className="pi pi-search mr-2"></i>
                            </button>
                        </div>

                        <div className="col-md-3">
                            <FormGroup htmlFor="inputCliente">
                                <input type="text"
                                    id="inputCliente"
                                    className="form-control"
                                    name="name"
                                    value={this.state.idCliente}
                                    onChange={e => this.setState({ idCliente: e.target.value })}
                                    placeholder="" />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            {this.state.atualizando ?
                                (
                                    <button onClick={this.atualizando} title='Atualizar'
                                        className="btn btn-success">
                                        <i className="pi pi-refresh mr-2"></i>
                                    </button>
                                ) : (
                                    <button onClick={this.submit}
                                        className="btn btn-success">
                                        <i className="pi pi-save mr-2"></i>Salvar
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </Card>
            </div>

        )
    }
}

export default withRouter(CadastroPrograma)