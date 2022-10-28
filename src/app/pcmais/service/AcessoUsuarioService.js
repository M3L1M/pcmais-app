import PcMaisApiService from "../PCMaisApiService";

class AcessoUsuarioService extends PcMaisApiService{
    constructor(){
        super('/api/acessousuario')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    obterNomePorId(id){
        return this.get(`/${id}/nome`)
    }
}

export default AcessoUsuarioService;