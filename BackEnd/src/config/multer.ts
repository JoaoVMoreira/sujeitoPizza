import crypto from 'crypto' //Criação de hash para que os nomes das imagens não se repitam
import multer from 'multer' //manipulação de imagens
import { extname, resolve } from 'path' //Manipulação de caminhos


//Configurando o envio de imagens para tmp
export default{
    upload(folder:string){ //Quando este metodo for chamado deverá ser informada a pasta onde as imagens serão salvas
        return{
            storage: multer.diskStorage({ //Acessando o storage
                destination: resolve(__dirname, "..", "..", folder), //Para onde serão encaminhadas as imagens (__dirname = diretorio atual)
                filename: (request, file, callback) => { //Criando filename para evitar conflito de nome
                    const fileHash = crypto.randomBytes(16).toString("hex") //Gerando um hash de 16 caracteres para diferenciar os arquivos
                    const fileName = `${fileHash}-${file.originalname}` //Informando que o nome da imagem será fileHash-Nome original

                    return callback(null, fileName)
                }
            })
        }
    }
}

//As imagens ficarão salvar em tmp