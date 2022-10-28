import React from "react";
import { withRouter } from "react-router-dom";
import PCMaisLocalStorageService from "../../../app/pcmais/service/PCMaisLocalStorageService";
import ClienteService from "../../../app/pcmais/service/ClienteService";
import * as messages from "../../../components/Toastr";
import Card from "../../../components/Card";
import FormGroup from "../../../components/FormGroup"

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ClienteTable from "./ClienteTable";
class ConsultaCliente extends React.Component {
    state = {
        id: '',
        cpfCnpj: '',
        nomeRazao: '',

        showConfirmDialog: false,
        clienteDeletar: {},
        clienteEditar: {},
        clientes: [],


    }


    constructor() {
        super();
        this.ClienteService = new ClienteService();
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-cliente/${id}`)
    }
    

    buscar = () => {

        const clienteFiltro = {
            nomeRazao: this.state.nomeRazao,
            cpfCnpj: this.state.cpfCnpj
        }

        this.ClienteService
            .consultar(clienteFiltro)
            .then(resposta => {
                const lista = resposta.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado")
                }
                this.setState({ clientes: lista })
            }).catch(error => {
                console.log(error)
            })
    }



    componentDidMount() {
        
    }

    render() {



        return (
            <div>
                <Card title="Cliente">

                    
                    
                    <div className="col-lg-5">
                        <div className="bs-component">
                            <FormGroup label="CPF/CNPJ:" htmlFor="inputCpfCnpj">
                                <input type="text"
                                    id="inputCpfCnpj"
                                    className="form-control"
                                    name="cpfCnpj"
                                    value={this.state.cpfCnpj}
                                    onChange={e => this.setState({ cpfCnpj: e.target.value })}
                                    placeholder="Digite CPF/CNPJ"
                                />
                            </FormGroup>


                            <FormGroup label="Nome Razão:" htmlFor="inputNomeRazao">
                                <input type="text"
                                    id="inputNomeRazao"
                                    className="form-control"
                                    name="nomeRazao"
                                    value={this.state.nomeRazao}
                                    onChange={e => this.setState({ nomeRazao: e.target.value })}
                                    placeholder="Digite o Nome"
                                />
                            </FormGroup>

                            <button onClick={this.buscar} title="Buscar"
                                className="btn btn-success">
                                <i className="pi pi-search mr-2"></i>
                            </button>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <ClienteTable clientes={this.state.clientes}
                                    editAction={this.editar}
                                    />
                            </div>
                        </div>
                    </div>
                </Card>



            </div>

        )
    }


}

export default withRouter(ConsultaCliente);