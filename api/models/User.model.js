import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const User = db.define("User", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  ,
        validate: {
            is: {
                args: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                msg: "Invalid email format"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("Male", "Female", "None of them"),
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    phoneNumberCode: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    phoneNumberCodeExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    isPhoneNumberVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    emailCode: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    emailCodeExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    resetPasswordTokenExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    lastPasswordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

await User.sync();
export default User;