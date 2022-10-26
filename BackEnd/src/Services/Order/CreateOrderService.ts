import prismaClient from "../../Prisma"

interface orderRquest{
    table: number,
    name: string
}

class CreateOrderService{
    async execute({table, name}: orderRquest){
        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            }
        })
        return order
    }
}

export { CreateOrderService }