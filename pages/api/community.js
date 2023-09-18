import { Pinecone } from "@pinecone-database/pinecone";

const configurePineconeDb = async () => {
  const pinecone = new Pinecone({
    environment: "asia-southeast1-gcp-free",
    apiKey: process.env.PINECONE_API,
  });
  const index = pinecone.Index("hack-mit");
  return index;
}

const getUserCommunity = async (userId) => {
  // Get the Pinecone index
  const pineConeIndex = await configurePineconeDb();

  // Fetch the user's vector
  const fetchUserResponse = await pineConeIndex.fetch([userId])
  const userValues = fetchUserResponse.records[userId].values
  const matches = await pineConeIndex.query({
    vector: userValues,
    topK: 10,
    includeMetadata: true,
  })
  const similarUsers = [];
  matches.matches.map((user) => {
    const userInfo = [user.id, user.metadata.email]
    similarUsers.push(userInfo);
  })
  return similarUsers
};

export default async function handler(req, res) {
  const userId = req.body;
  res.status(200).send({ similarUsers: await getUserCommunity(userId) });
  // if (req.method === 'POST') {
  //   insertIntoVectorDatabase('123123', ['1', '2', '3', '4', '5', '6', '7', '8']);
  // }
  // else if (req.method === 'GET') {
  //   getUserCommunity()
  // }
}
