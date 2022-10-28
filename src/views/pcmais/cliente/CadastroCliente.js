import moment from "moment/moment";
import React from "react";
import { withRouter } from "react-router-dom";
import ClienteService from "../../../app/pcmais/service/ClienteService";
import Card from "../../../components/Card";
import FormGroup from "../../../components/FormGroup";
import SelectMenu from "../../../components/SelectMenu";




import * as message from '../../../components/Toastr'


class CadastroCliente extends React.Component {
    state = {
        id: null, nomeRazao: '', tipoPessoa: '', cpfCnpj: '', ieRg: '', inscricaoSuframa: '', endereco: '',
        numero: '', bairro: '', cep: '', complemento: '', idCidade: '', contribuinteIcms: '', fone: '',
        celular: '', email: '', homePage: '', idFuncionarioRespon: '', idPais: '', dataNascimento: '',
        dataCadastro: '', condicaoPagPadrao: '', parcVencVista: '', cadastroIncompleto: '', msgOutroMotivo: '',
        outroMotivo: '', melhorDiaPagto: '', limiteCredito: '', saldoVencido: '', dataAbertura: '', nomeFantasia: '',
        ativo: '', cliFornTrans: '', fax: '', diasPrevistoPs: '', contato: '', observacao: '', observacaoNFEORC: '',
        prVenda: '', codForn: '', referencia: '', atualizando: false
    }

    constructor() {
        super();
        this.ClienteService = new ClienteService();
    }



    componentDidMount() {
        const params = this.props.match.params;

        if (params.id) {
            console.log(params)
            console.log(this.state.idCidade)
            this.ClienteService
                .obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(erros => {
                    message.mensagemErro(erros.response.data);
                })
        }
    }

    dataAtualFormatada = (data) => {
        if (data === null) {
            const currentDate = null;
            return '';
        } else {
            const currentDate = moment(data).format('DD/MM/YYYY');
            console.log(currentDate)
            return currentDate;
        }



    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    render() {
        const clienteFornecedor = this.ClienteService.obterTipoCliente();
        const tipoPessoa = this.ClienteService.obterTipoPessoa();
        const icms = this.ClienteService.obterTipoIcms();

        return (
            <Card title={
                this.state.atualizando ?
                    'Atualização de Cliente' : 'Cadastro de Cliente'
            }>
                <legend>Identificação</legend>
                <div className="row">
                    <div className="col-md-2">
                        
                       
                    



                        <FormGroup label="Id" htmlFor="inputId" >
                            <input id="inputId" type="text"
                                className="form-control"
                                name="id" readOnly
                                value={this.state.id}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup label="Tipo" htmlFor="inputClienteFonecedor" >
                            <SelectMenu id="inputClienteFonecedor"
                                className="form-control"
                                name="cliFornTrans"
                                value={this.state.cliFornTrans}
                                onChange={this.handleChange}
                                lista={clienteFornecedor} />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup label="Pessoa" htmlFor="inputTipoPessoa" >
                            <SelectMenu id="inputTipoPessoa"
                                className="form-control"
                                name="tipoPessoa"
                                value={this.state.tipoPessoa}
                                onChange={this.handleChange}
                                lista={tipoPessoa} />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup label="Data Cadastro" htmlFor="inputDataCadastro" >

                            <input id="inputDataCadastro" type="text"
                                className="form-control"
                                name="dataCadastro" readOnly
                                value={this.dataAtualFormatada(this.state.dataCadastro)}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">

                        {this.state.tipoPessoa === "Jurídica" ?
                            <FormGroup label="CNPJ" htmlFor="inputCnpj" >
                                <input id="inputCnpj" type="text"
                                    className="form-control"
                                    name="cnpj" readOnly
                                    value={this.state.cpfCnpj}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            :
                            <FormGroup label="CPF" htmlFor="inputCpf">
                                <input id="inputCpf" type="text"
                                    className="form-control"
                                    name="cpf" readOnly
                                    value={this.state.cpfCnpj}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        }
                    </div>

                </div>


                {this.state.tipoPessoa === "Jurídica" ?
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup label="Nome Razão" htmlFor="inputNomeRazao" >
                                    <input id="inputNomeRazao" type="text"
                                        className="form-control"
                                        name="nomerazao" readOnly
                                        value={this.state.nomeRazao}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-6">
                                <FormGroup label="Nome Fantasia" htmlFor="inputNomeFantasia" >
                                    <input id="inputNomeFantasia" type="text"
                                        className="form-control"
                                        name="nomefantasia" readOnly
                                        value={this.state.nomeFantasia}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Regime de Apur. de  ICMS" htmlFor="inputIcms" >
                                    <SelectMenu id="inputIcms"
                                        className="form-control"
                                        name="icms"
                                        value={this.state.contribuinteIcms}
                                        onChange={this.handleChange}
                                        lista={icms} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Inscrição Estadual" htmlFor="inputInscricaoEstadual" >
                                    <input id="inputInscricaoEstadual" type="text"
                                        className="form-control"
                                        name="inscricaoEstadual" readOnly
                                        value={this.state.ieRg}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Data de Abertura" htmlFor="inputDataAbertura" >
                                    <input id="inputDataAbertura" type="text"
                                        className="form-control"
                                        name="dataAbertura" readOnly
                                        value={this.dataAtualFormatada(this.state.dataAbertura)}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Contato" htmlFor="inputContato">
                                    <input id="inputContato" type="text"
                                        className="form-control" placeholder="Contato"
                                        name="contato" readOnly
                                        value={this.state.contato}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row"></div>
                        <legend>Endereco/Fone</legend>

                        <div className="row">
                            <div className="col-md-2">
                                <FormGroup label="CEP" htmlFor="inputCep">
                                    <input id="inputCep" type="text"
                                        className="form-control"
                                        name="cep" readOnly
                                        value={this.state.cep}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-5">
                                <FormGroup label="Endereço" htmlFor="inputEndereco">
                                    <input id="inputEndereco" type="text"
                                        className="form-control"
                                        name="endereco" readOnly
                                        value={this.state.endereco}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Numero" htmlFor="inputNumero">
                                    <input id="inputNumero" type="text"
                                        className="form-control"
                                        name="numero" readOnly
                                        value={this.state.numero}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Bairro" htmlFor="inputBairro">
                                    <input id="inputBairro" type="text"
                                        className="form-control"
                                        name="bairro" readOnly
                                        value={this.state.bairro}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <FormGroup label="Complemento" htmlFor="inputComplemento">
                                    <input id="inputComplemento" type="text"
                                        className="form-control"
                                        name="Complemento" readOnly
                                        value={this.state.complemento}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Cidade" htmlFor="inputCidade">
                                    <input id="inputCidade" type="text"
                                        className="form-control"
                                        name="Cidade" readOnly
                                        value={this.state.idCidade}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Fone" htmlFor="inputFone">
                                    <input id="inputFone" type="text"
                                        className="form-control"
                                        name="Fone" readOnly
                                        value={this.state.fone}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Celular" htmlFor="inputCelular">
                                    <input id="inputCelular" type="text"
                                        className="form-control"
                                        name="Celular" readOnly
                                        value={this.state.celular}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Pais" htmlFor="inputPais">
                                    <input id="inputPais" type="text"
                                        className="form-control"
                                        name="Pais" readOnly
                                        value={this.state.idPais}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup label="Email" htmlFor="inputEmail">
                                    <input id="inputEmail" type="text"
                                        className="form-control"
                                        name="Email" readOnly
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup label="Funcionario" htmlFor="inputFuncionario">
                                    <input id="inputFuncionario" type="text"
                                        className="form-control"
                                        name="Funcionario" readOnly
                                        value={this.state.idFuncionarioRespon}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                        </div>

                    </div>




                    /* ----------------- */
                    :
                    /* ----------------- */


                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <FormGroup label="Nome" htmlFor="inputNome">
                                    <input id="inputNome" type="text"
                                        className="form-control"
                                        name="nome" readOnly
                                        value={this.state.nomeRazao}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Data de Nascimento" htmlFor="inputDataNascimento">
                                    <input id="inputDataNascimento" type="text"
                                        className="form-control"
                                        name="Datadenascimento" readOnly
                                        value={this.dataAtualFormatada(this.state.dataNascimento)}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="RG" htmlFor="inputRg">
                                    <input id="inputRg" type="text"
                                        className="form-control"
                                        name="rg" readOnly
                                        value={this.state.ieRg}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Contato" htmlFor="inputContato">
                                    <input id="inputContato" type="text"
                                        className="form-control" placeholder="Contato"
                                        name="contato" readOnly
                                        value={this.state.contato}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>


                        </div>

                        <legend>Endereco/Fone</legend>
                        <div className="row">
                            <div className="col-md-2">
                                <FormGroup label="CEP" htmlFor="inputCep">
                                    <input id="inputCep" type="text"
                                        className="form-control"
                                        name="cep" readOnly
                                        value={this.state.cep}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-5">
                                <FormGroup label="Endereço" htmlFor="inputEndereco">
                                    <input id="inputEndereco" type="text"
                                        className="form-control"
                                        name="endereco" readOnly
                                        value={this.state.endereco}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Numero" htmlFor="inputNumero">
                                    <input id="inputNumero" type="text"
                                        className="form-control"
                                        name="numero" readOnly
                                        value={this.state.numero}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Bairro" htmlFor="inputBairro">
                                    <input id="inputBairro" type="text"
                                        className="form-control"
                                        name="bairro" readOnly
                                        value={this.state.bairro}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <FormGroup label="Complemento" htmlFor="inputComplemento">
                                    <input id="inputComplemento" type="text"
                                        className="form-control"
                                        name="Complemento" readOnly
                                        value={this.state.complemento}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup label="Cidade" htmlFor="inputCidade">
                                    <input id="inputCidade" type="text"
                                        className="form-control"
                                        name="Cidade" readOnly
                                        value={this.state.idCidade}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Fone" htmlFor="inputFone">
                                    <input id="inputFone" type="text"
                                        className="form-control"
                                        name="Fone" readOnly
                                        value={this.state.fone}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Celular" htmlFor="inputCelular">
                                    <input id="inputCelular" type="text"
                                        className="form-control"
                                        name="Celular" readOnly
                                        value={this.state.celular}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-2">
                                <FormGroup label="Pais" htmlFor="inputPais">
                                    <input id="inputPais" type="text"
                                        className="form-control"
                                        name="Pais" readOnly
                                        value={this.state.idPais}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup label="Email" htmlFor="inputEmail">
                                    <input id="inputEmail" type="text"
                                        className="form-control"
                                        name="Email" readOnly
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup label="Funcionario" htmlFor="inputFuncionario">
                                    <input id="inputFuncionario" type="text"
                                        className="form-control"
                                        name="Funcionario" readOnly
                                        value={this.state.idFuncionarioRespon}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>

                        </div>

                    </div>
                }

            </Card>


        )
    }
}
export default withRouter(CadastroCliente)