import { UserService } from '../users/user.service.js';
import { TransferService } from './transfers.service.js';

export const makeTransfer = async (req, res) => {
  try {
    
    const { amount, receptionAccountNumber, senderAccountNumber } = req.body;

    const receptionUserPromise = UserService.findOneAccount(receptionAccountNumber);

    const senderUserPromise = UserService.findOneAccount(senderAccountNumber);

    const [receptionUser, senderUser] = await Promise.all([
      receptionUserPromise,
      senderUserPromise,
    ]);

    if (!receptionUser) {
      //valida recepcionista del dinero
      return res.status(400).json({
        status: 'error',
        message: 'Reception account does not exist',
      });
    }

    if (!senderUser) {
      return res.status(400).json({// valida remitente del dinero
        status: 'error',
        message: 'Sender account does not exist',
      });
    }

    if (amount > senderUser.amount) {//valida que cuente con el dinero suficiente para transferir
      return res.status(400).json({
        status: 'error',
        message: 'insufficient balance',
      });
    }

    const newReceptionBalance = amount + receptionUser.amount; // valida que el dinero trasnferido si se sume  a la cuenta del recepcionista

    const newSenderBalance = senderUser.amount - amount;

   
    //actualiza las cuentas despues de hacer las transferencias

  

    const updateSenderUserPromise = UserService.updateAmount(
      senderUser,
      newSenderBalance
    );
    

    const updateReceptionUserPromise = UserService.updateAmount(
      receptionUser,
      newReceptionBalance
    );

    
    const transferPromise = TransferService.createRecordTransfer(
      amount,
      senderUser.id,
      receiverUser.id
    );

    await Promise.all([
      updateSenderUserPromise,
      updateReceptionUserPromise,
      transferPromise,
    ]);

    return res.status(201).json({
      message: 'All ok!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
