import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../../components/Card";
import ProgramaTable from "./ProgramaTable";
import ProgramaService from "../../../app/controle/service/ProgramaService";
import FormGroup from "../../../components/FormGroup";
import * as messages from "../../../components/Toastr";

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import ClienteService from "../../../app/pcmais/service/ClienteService";
import SelectMenu from "../../../components/SelectMenu";


class ConsultaPrograma extends React.Component {
    state = {
        id: null,
        descricao: '',
        cpfCnpj: '',
        nomeRazao: '',
        idCliente: null,

        atualizando: false,


        showConfirmDialog: false,
        showConfirmCadastro: false,
        programaDeletar: {},
        programaEditar: {},
        programaAdicionar: {},
        programas: []
    }
    constructor() {
        super();
        this.ProgramaService = new ProgramaService();
        this.ClienteService = new ClienteService();

    }



    componentDidMount() {
        this.ProgramaService
            .listar().then(resposta => {
                const lista = resposta.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado.")
                }
                this.setState({ programas: lista })
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





    //------------------
    abrirModalCadastro = () => {
        this.setState({ showConfirmCadastro: true })
    }

    fecharModalCadastro = () => {
        this.setState({ showConfirmCadastro: false, descricao: '', cpfCnpj: '', idCliente: '' })
    }
    //------------------
    abrirModalEditar = (id) => {
        console.log(id)
        if (id) {
            this.ProgramaService
                .obterProgramaPorId(id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }


        this.setState({ showConfirmCadastro: true, programaEditar: id })
    }

    fecharModalEditar = () => {
        this.setState({ showConfirmCadastro: false, programaEditar: {}, descricao: '', cpfCnpj: '', idCliente: '' })
    }
    //------------------
    abrirConfirmacao = (programa) => {
        this.setState({ showConfirmDialog: true, programaDeletar: programa })
    }
    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, programaDeletar: {}, descricao: '', cpfCnpj: '', idCliente: '' })
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
                this.showConfirmCadastro = false
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
                //this.props.history.push('/programa')
                messages.mensagemSucesso('Programa atualizado com sucesso')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }



    deletar = () => {

        this.ProgramaService
            .deletar(this.state.programaDeletar.id)
            .then(resposta => {
                const programas = this.state.programas;
                const index = programas.indexOf(this.state.programaDeletar);
                programas.splice(index, 1);
                this.setState({
                    programas: programas,
                    showConfirmDialog: false
                })
                messages.mensagemSucesso("Programa deletado com sucesso")
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o programa');
            })

    }

    formularioCadastroPrograma = () => {
        this.props.history.push('/cadastro-programa')
    }

    render() {
        const clientes='';

        const confirmDialogFooterAdicionar = (
            <div>
                {this.state.atualizando ?
                    (
                        <Button label='Editar' icon='pi pi-check' onClick={this.atualizar} />

                    ) : (
                        <Button label='Adicionar' icon='pi pi-check' onClick={this.submit} />
                    )
                }

                <Button label='Cancelar' icon='pi pi-times' onClick={this.fecharModalCadastro}
                    className="p-button-secondary" />
            </div>
        )

        const confirmDialogFooter = (
            <div>
                <Button label='Confirmar' icon='pi pi-check' onClick={this.deletar} />
                <Button label='Cancelar' icon='pi pi-times' onClick={this.cancelarDelecao}
                    className="p-button-secondary" />
            </div>
        )


        //props.history.push('/cadastro-programa')
        return (
            <Card title="Programa">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <button onClick={this.abrirModalCadastro} title="Cadastrar"
                                className="btn btn-danger">
                                <i className="pi pi-plus mr-2"></i>

                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ProgramaTable
                                programas={this.state.programas}
                                editAction={this.abrirModalEditar}
                                deleteAction={this.abrirConfirmacao}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirma exclusão"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p>
                            Confirma a exclusão deste programa?

                        </p>
                    </Dialog>

                    <Dialog header={this.state.atualizando ? 'Atualização de Cadastro' : 'Cadastro de Programa'}
                        visible={this.state.showConfirmCadastro}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooterAdicionar}
                        modal={true}
                        onHide={() => this.setState({
                            showConfirmCadastro: false,
                            descricao: '',
                            cpfCnpj: '',
                            idCliente: ''
                        })}>
                        <div className="row">
                            <div className="col-md-12">
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
                            <div className="col-md-8">
                                <FormGroup htmlFor="inputCliente" label="Programa: *">
                                    <SelectMenu id='inputCliente'
                                                value={this.state.idCliente}
                                                lista={clientes}
                                                name='clientes'
                                                className="form-control" />
                                    
                                </FormGroup>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.buscaCpf} className="btn btn-success" style={{ marginTop: '24px' }}>
                                    <i className="pi pi-search mr-2"></i>
                                </button>
                            </div>

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
                        </div>





                    </Dialog>
                </div>
            </Card>

        )
    }
}
/*
<input type="text"
                                        id="inputCliente"
                                        className="form-control"
                                        name="name"
                                        value={this.state.idCliente}
                                        onChange={e => this.setState({ idCliente: e.target.value })}
                                        placeholder="" />


*/
export default withRouter(ConsultaPrograma)