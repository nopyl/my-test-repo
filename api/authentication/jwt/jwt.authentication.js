import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../../models/User.model.js";
import Message from "../../utils/message/message.util.js";


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

passport.use(new Strategy(options, async function(payload, done){

    const user = await User.findOne({
        where: {
            uuid: payload.sub
        }
    });

    if(user){
        return done(null, user);
    }

    return done(Message.Unauthorized, false);

}));