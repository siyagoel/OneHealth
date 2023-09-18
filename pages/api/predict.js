import { loadLayersModel, tensor2d } from '@tensorflow/tfjs-node';
import { db } from '../../utils/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Pinecone } from "@pinecone-database/pinecone";

const configurePineconeDb = async () => {
  const pinecone = new Pinecone({
    environment: "asia-southeast1-gcp-free",
    apiKey: process.env.PINECONE_API,
  });
  const index = pinecone.Index("hack-mit");
  return index;
}

const insertIntoVectorDatabase = async (userId, values, userEmail) => {
  const pineConeIndex = await configurePineconeDb();
  let pineConeResult = await pineConeIndex.upsert([
    {
      id: userId,
      values: values,
      metadata: {'email': userEmail}
    },
  ]);
}

const addDataToFirestore = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

async function loadModel() {
  const modelPath = './tfjs_model/model.json'; // Replace with the actual path
  const model = await loadLayersModel(`file://${modelPath}`);
  return model;
}

export default async function handler(req, res) {
  const inputData = req.body;

  try {
    const model = await loadModel();

    // Check if the model is loaded correctly
    if (!model) {
      res.status(500).json({ error: 'Model loading failed.' });
      return;
    }

    // You can now use the loaded model for predictions or other tasks
    // For example, you can make a test prediction here
    const testInput = tensor2d([inputData.array], [1, 8]);
    const predictions = await model.predict(testInput).dataSync();
    const dataToAdd = {
      userId: inputData.userId,
      "health-score": predictions[0],
      email: inputData.userEmail,
    };
    insertIntoVectorDatabase(inputData.userId, inputData.array, inputData.userEmail)
    addDataToFirestore("users", dataToAdd);
    
    res.status(200).json({ message: 'Model loaded successfully', predictions });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
