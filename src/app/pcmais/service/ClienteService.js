import PcMaisApiService from "../PCMaisApiService";

class ClienteService extends PcMaisApiService{
    constructor(){
        super('/api/cliente')
    }

    listar(){
        return this.get('/lista')
    }

    listarPaginacao(numeroPagina,tamanhoPagina){
        return this.get(`/list/${numeroPagina}/${tamanhoPagina}`)
    }

    obterId(cpfCnpj){
        return this.get(`/obter-id/${cpfCnpj}`)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    obterTipoCliente(){
        return [
            {label : 'Selecione...',value : ''},
            {label : 'Ambos',value : 0},
            {label : 'Cliente',value : 1},
            {label : 'Fornecedor',value : 2},
            {label : 'Transportadora',value : 3},
            {label : 'Fornecedor de Matéria Prima',value : 4},
        ]
    }

    obterTipoPessoa(){
        return [
            {label : 'Selecione...',value : ''},
            {label : 'Física',value : 'Física'},
            {label : 'Jurídica',value : 'Jurídica'},
        ]
    }

    obterTipoIcms(){
        return[
            {label : 'Selecione...',value : ''},
            {label : 'Simples Nacional',value : 'SN '},
            {label : 'Regime Normal',value : 'NOR'}
        ]
    }

    consultar(clienteFiltro){
        console.log(clienteFiltro);
        let params ="";

        params=`?cpfCnpj=${clienteFiltro.cpfCnpj}`;

        if(clienteFiltro.nomeRazao){
            params=`${params}&nomeRazao=${clienteFiltro.nomeRazao}`;
        }

        return this.get(params)
    }


}

export default ClienteService;