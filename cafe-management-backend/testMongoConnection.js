const { MongoClient } = require('mongodb');

const uri = "your_connection_string_here";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000,  // 45 seconds socket timeout
  retryWrites: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Failed to connect:", err);
  } finally {
    await client.close();
  }
}

run();
