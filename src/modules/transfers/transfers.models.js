import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";


const Transfer = sequelize.define('transfers',{
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },

    amount: {
        type:DataTypes.FLOAT,
        allowNull: false
    },

    senderUserId: {//id que envia la transferencia
        type: DataTypes.INTEGER,
        allowNull: false
    },

    receiverUserId: {//id quien recibe la transferencia
        type: DataTypes.INTEGER,
        allowNull: false
    }


})

export default Transfer;