import dotenv from "dotenv";

dotenv.config();

import AWS from "aws-sdk";

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION, // Setting AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
