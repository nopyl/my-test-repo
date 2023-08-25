import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const {AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env;

AWS.config.update({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

export const sendSms = (smsOption) => {

    return new AWS.SNS()
    .publish(smsOption)
    .promise()
    .then()
    .catch(err => console.log(err));

}