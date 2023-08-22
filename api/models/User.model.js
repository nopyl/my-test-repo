import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

}, {timestamps: false});

User.addHook("beforeSave", (user) => {

    if(user.changed("password")){
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        user.password = hash;
    }

});

User.prototype.generateJwt = function(){

    const {JWT_SECRET_KEY, JWT_ISSUER, JWT_AUDIENCE, JWT_EXPIRES} = process.env;
 
    const payload = {
        uuid: this.uuid,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        notBefore: Date.now(),
        expiresIn: JWT_EXPIRES
    });

    return token;
}

await User.sync();
export default User;