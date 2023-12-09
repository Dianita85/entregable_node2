import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js"


export const sequelize = new Sequelize(envs.DB_URI, {
    logging:false,
});

export async function authenticate(){//funcion para autenticar
    try {
        await sequelize.authenticate();
        console.log('Connection OK 🤗');

    }catch(error){
        console.log(error);

    }
}

export async function syncUp(){// funcion para sincronizar
    try {
        await sequelize.sync();
        console.log('Database has been synced successfully 🤗');
    }catch(error){
          console.log(error);
    }
}