import PCMaisLocalStorageService from "./PCMaisLocalStorageService"

export const USUARIO_LOGADO='_usuario_logado'

export default class PCMaisAuthService{

    static isUsuarioAutenticado(){
        const usuario = PCMaisLocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado(){
        PCMaisLocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario){
        PCMaisLocalStorageService.adicionarItem(USUARIO_LOGADO,usuario)
    }

    static obterUsuarioAutenticado(){
        return PCMaisLocalStorageService.obterItem(USUARIO_LOGADO)
    }

}