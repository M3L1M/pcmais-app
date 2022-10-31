import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../../components/Card";
import FormGroup from "../../../components/FormGroup";
import * as messages from "../../../components/Toastr";

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import ContratanteService from "../../../app/controle/service/ContratanteService";
import ClienteService from "../../../app/pcmais/service/ClienteService";
import ContratanteTable from "./ContratanteTable";

class ConsultaContratante extends React.Component {
    state = {
        id: null,
        idCliente: '',
        ativo: '',
        nomeRazao: '',
        dataCadastroContratante: '',

        atualizando: false,

        showConfirmDeletar: false,
        showConfirmCadastro: false,

        contratanteDeletar: {},
        contratanteEditar: {},
        contratanteAdicionar: {},
        contratantes: []
    }

    constructor() {
        super();
        this.ContratanteService = new ContratanteService();
        this.ClienteService = new ClienteService();
    }

    componentDidMount() {
        this.ContratanteService
            .listar().then(resposta => {
                const lista = resposta.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado")
                }
                this.setState({ contratantes: lista })
            }).catch(erro => {
                messages.mensagemAlerta("Aconteceu algum erro.")
            })
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

    abrirModalCadastro = () => {
        this.setState({ showConfirmCadastro: true });
    }

    fecharModalCadastro = () => {
        this.setState({ showConfirmCadastro: false, nomeRazao: '', idCliente: '', id: '', atualizando: false })
    }

    abrirModalEditar = (id) => {
        if (id) {
            this.ContratanteService
                .obterContratantePorId(id)
                .then(response => {

                    this.setState({ ...response.data, atualizando: true })

                }).catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }


        this.setState({ showConfirmCadastro: true, programaEditar: id })
    }

    abrirConfirmacao = (contratante) => {
        this.setState({ showConfirmDeletar: true, contratanteDeletar: contratante })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDeletar: false, contratanteDeletar: {} })
    }



    submit = () => {
        const { idCliente, ativo } = this.state;
        const contratante = { idCliente, ativo }

        try {
            this.ContratanteService.validar(contratante);
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.ContratanteService
            .salvar(contratante)
            .then(response => {
                messages.mensagemSucesso("Contratante cadastrado com sucesso!")
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    deletar = () => {
        this.ContratanteService
            .deletar(this.state.contratanteDeletar.id)
            .then(resposta => {
                const contratantes = this.state.contratantes;
                const index = contratantes.indexOf(this.state.contratanteDeletar);
                contratantes.splice(index, 1)
                this.setState({
                    contratantes: contratantes,
                    showConfirmDeletar: false
                })
                messages.mensagemSucesso("Contratante deletado com sucesso")
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Contratante');
            })
    }

    render() {

        const confirmDialogFooterDelete = (
            <div>
                <Button label='Confirmar' icon='pi pi-check' onClick={this.deletar} />
                <Button label='Cancelar' icon='pi pi-times' onClick={this.cancelarDelecao}
                    className="p-button-secondary" />
            </div>
        )

        const confirmDialogFooterCadastro = (
            <div>
                <Button label='Confirmar' icon='pi pi-check' onClick={this.submit} />
                <Button label='Cancelar' icon='pi pi-times' onClick={this.fecharModalCadastro}
                    className="p-button-secondary" />
            </div>
        )

        return (
            <Card title="Contratante">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <button onClick={this.abrirModalCadastro} title="Cadastrar" className="btn btn-danger">
                                <i className="pi pi-plus mr-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ContratanteTable
                                contratantes={this.state.contratantes}
                                editAction={this.abrirModalEditar}
                                deleteAction={this.abrirConfirmacao}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirma exclusão"
                        visible={this.state.showConfirmDeletar}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooterDelete}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDeletar: false })}>
                        <p>
                            Confirma a exclusão deste Contratante?

                        </p>
                    </Dialog>

                    <Dialog header={this.state.atualizando ? 'Atualização de Cadastro' : 'Cadastro de Contratante'}
                        visible={this.state.showConfirmCadastro}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooterCadastro}
                        modal={true}
                        onHide={() => this.setState({ showConfirmCadastro: false })}>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup htmlFor="inputContratante" label="Contratante: *">
                                    <input type="text"
                                        id="inputContratante"
                                        className="form-control"
                                        name="name" readOnly
                                        value={this.state.nomeRazao}
                                        onChange={e => this.setState({ nomeRazao: e.target.value })}
                                        placeholder="Contratante" />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-check">
                                    <FormGroup htmlFor="inputAtivo" label="Ativo">
                                        <input class="form-check-input" id="inputAtivo" type="checkbox" value=""/>
                                        
                                    </FormGroup>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup htmlFor="inputCpfCnpj" label="Cpf/Cnpj">
                                    <input type="text"
                                        id="inputCpfCnpj"
                                        className="form-control"
                                        name="name"
                                        value={this.state.cpfCnpj}
                                        onChange={e => this.setState({ cpfCnpj: e.target.value })}
                                        placeholder="" />
                                </FormGroup>
                            </div>
                            <div className="col-md-1">

                                <input type="hidden"
                                    id="inputCliente"
                                    className="form-control"
                                    name="name" disabled
                                    value={this.state.idCliente}
                                    onChange={e => this.setState({ idCliente: e.target.value })}
                                    placeholder="" style={{ marginTop: '24px' }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <button onClick={this.buscaCpf} className="btn btn-success" style={{ marginTop: '24px' }}>
                                    <i className="pi pi-search mr-2"></i>
                                </button>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaContratante)