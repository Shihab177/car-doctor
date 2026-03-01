import{ MongoClient, ServerApiVersion } from "mongodb"
const uri = process.env.NEXT_PUBLIC_MONGODB_URI!
export const collectionNameObj={
   serviceCollection : "services",
   userCollection : "users",
   bookingCollection:"booking"
}

export default function dbConnect(collectionName : string) {
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_NAME).collection(collectionName)
}

