export class AuthTokenError extends Error{
    constructor(){
        super('Erro de authenticação do token')
    }
}