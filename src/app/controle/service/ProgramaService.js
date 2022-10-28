import ControleApiService from "../ControleApiService";

class ProgramaService extends ControleApiService{
    constructor(){
        super('/api/programa')
    }

    salvar(programa){
        return this.post('/',programa)
    }

    validar(programas){
        const erros=[];
        if(!programas.descricao){
            erros.push("Informe a DESCRIÇÃO")
        }
        
        if(!programas.idCliente){
            erros.push("Informe o CLIENTE")
        }
        
    }

    atualizar(programa){
        return this.put(`/${programa.id}`,programa)
    }

    listar(){
        return this.get('/listar')
    }

    obterProgramaPorId(id){
        return this.get(`/${id}`)
    }

    /*obterPrograma(){
        return [
            
            {label:'',value:''}
        ]
    }*/

    deletar(id){
        return this.delete(`/${id}`)
    }



    
}

export default ProgramaService;