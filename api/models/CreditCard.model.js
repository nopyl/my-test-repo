import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const CreditCard = db.define("CreditCard", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    cardOwner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cardNumber: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            is: /^4[0-9]{12}(?:[0-9]{3})?$/
        }
    },
    expireDate: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    cvv: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    
}, { timestamps: false});

await CreditCard.sync();
export default CreditCard;