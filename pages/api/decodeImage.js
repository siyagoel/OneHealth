const { Buffer } = require('buffer');
const Tesseract = require('tesseract.js');
import stringSimilarity from '@/utils/stringSimilarity';

function decodeDataUriToBuffer(dataUri) {
  const data = dataUri.split(';base64,').pop();
  return Buffer.from(data, 'base64');
}

function filterText(text) {
  // Define the regular expression pattern as a literal
  const englishWordPattern = /^[a-zA-Z0-9]+$/;

  // Use the regular expression to find English words in the text
  const englishWords = text.match(englishWordPattern);

  // Check if englishWords is not null or undefined
  if (englishWords) {
    const returnWords = englishWords.filter((word) => word.length > 1);
    return returnWords;
  } else {
    // Handle the case when no English words are found
    return [];
  }
}

function createKeyValuePairs(text) {
  const lines = text.split('\n');
  const keyValuePairs = {};

  for (let line of lines) {
    const parts = line.split(':');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      keyValuePairs[key] = value;
    }
  }
  return keyValuePairs;
}

async function recognizeImage(imageBuffer) {
  try {
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
    // console.log(text)
    const keyValuePairs = createKeyValuePairs(text);
    const filteredKeyValuePairs = {};
    const keyValues = ['Pregnancies', 'Glucose', 'Blood Pressure', 'Skin Thickness', 'Insulin', 'BMI', 'Diabetes Pedigree Degree', 'Age'];
    for (const keyValue of keyValues) {
      for (const [key, value] of Object.entries(keyValuePairs)) {
        if (stringSimilarity(key, keyValue) > 0.9) {
          filteredKeyValuePairs[keyValue] = value;
        }
      }
    }
    console.log(filteredKeyValuePairs);
    return { data: filteredKeyValuePairs, status: 200 };
  } catch (error) {
    console.error('OCR Error:', error);
    // Handle the error and return an error response
    return { error: 'OCR Error', status: 500 };
  }
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const body = JSON.parse(req.body);
  const snapshot = body.snapshot;

  if (!snapshot) {
    res.status(400).json({ found: false, error: true });
    return;
  }

  const imageBuffer = decodeDataUriToBuffer(snapshot);

  const { data, status, error } = await recognizeImage(imageBuffer);

  if (error) {
    // Handle the error and send an error response
    res.status(status).json({ error });
  } else {
    // Send the success response
    res.status(status).json({ message: 'Image decoded successfully', data });
  }
};

export default handler;
