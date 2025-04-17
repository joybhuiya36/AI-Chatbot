import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const dynamodb = new AWS.DynamoDB();

async function createTables() {
  // Create Conversations table
  const conversationsParams = {
    TableName: "Conversations",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "title", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    await dynamodb.createTable(conversationsParams).promise();
    console.log("Conversations table created");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();
