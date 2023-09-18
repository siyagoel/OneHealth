import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const getUserByID = async (collectionName, userId) => {
  try {
    const userRef = doc(db, collectionName, 'RttYchOlPqkPEKaXE3mp');
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log("No matching document.");
      return null; // User not found
    }

    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.error(error);
  }
};

export default async function handler(req, res) {
  const userId = req.body;
  console.log(userId);
  const user = await getUserByID('users', userId);
  if (user) {
    console.log('User data:', user);
    res.status(200).send({ data: user })
  } else {  
    console.log('User not found');
  }
}
