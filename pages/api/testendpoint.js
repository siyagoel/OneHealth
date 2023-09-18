import Tesseract from "tesseract.js";

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { imageData } = req.body;
      if (!imageData) {
        return res.status(400).json({ error: 'Missing imageData' });
      }

      const is_jpeg = typeof String ? imageData.includes("data:image\/jpeg;base64,") : false;
      console.log(is_jpeg);
      if (is_jpeg) {
        Tesseract.recognize(
          "imageData",
          "eng",
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          console.log(text);
        });
      } else {
        return res.status(400).json({ error: 'Image is not jpeg format' });
      }
      res.status(200).json({ message: 'Hello from the API!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// data:image/jpeg;base64,

