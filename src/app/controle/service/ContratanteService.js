import ControleApiService from "../ControleApiService";

class ContratanteService extends ControleApiService {
    constructor() {
        super('/api/contratante')

    }
    
    validar(contratante){
        const erros = [];
        if(!contratante.idCliente){
            erros.push("Informe o CONTRATANTE")
        }
    }


    salvar(contratante) {
        return this.post('/', contratante)
    }

    atualizar(contratante){
        return this.put(`/${contratante.id}`,contratante)
    }
    
    listar(){
        return this.get('/listar')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterContratantePorId(id){
        return this.get(`/contratante/${id}`)
    }
}

export default ContratanteService;