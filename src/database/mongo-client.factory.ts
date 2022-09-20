import { Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';

export const mongoClientFactory = async () => {
  const logger = new Logger('MongoClient');
  // const url = 'mongodb://localhost:27018/nest';
  const url = "mongodb+srv://demo:fbUXcE27xZCTXwdt@nestjsassignmenr.hasun7o.mongodb.net/?retryWrites=true&w=majority"
  // Dt76KmPFi#eC#k.
  logger.log(`connecting to ${url}`);

  const client = new MongoClient(url);
  await client.connect();
  logger.log(`connected to ${url}`);
  return client;
};
