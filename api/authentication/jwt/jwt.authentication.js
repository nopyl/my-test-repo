import passport from "passport";
import { Strategy } from "passport-jwt";
import User from "../../models/User.model.js";
import Message from "../../utils/message/message.util.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const cookieExtractor = (req) => {
    
    var token = null;
    
    if(req && req.cookies){
        token = req.cookies.jwt
    }

    return token;
}

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
};

passport.use(new Strategy(options, async(payload, done) => {


    try{

        const user = await User.findOne({
            where: {
                uuid: payload.uuid
            }
        });

        if(user){

            return done(null, user);
        }
        else {

            return done(null, false);
        }
    
    }
    catch(err){
        return done(err, false);
    }

}));

