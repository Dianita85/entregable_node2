import Transfer from './transfers.models.js';


export class TransferService{
    
    static async createRecordTransfer(amount, senderUserId, receiverUserId){

        return await Transfer.create({
            amount, 
            senderUserId,
            receiverUserId,
        })
    }

}

