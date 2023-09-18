'use client'
import React, { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { Form } from '../components/Form';
import Navbar from '../components/NavBar';

export default function Test() {
  const webcamRef = useRef(null);
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [userData, setUserData] = useState();
  const [showImage, setShowImage] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const updateShowImage = () => {
    setShowImage(!showImage);
  }

  const navigateToNewPage = (data) => {
    router.push('/');
  };

  const capture = useCallback(() => {
    if (!webcamRef.current) return;

    const image = webcamRef.current.getScreenshot();

    setCaptured(true);
    setSnapshot(image);
  }, []);

  const redo = () => {
    setCaptured(false);
    setConfirmed(false);
    setSnapshot(null);
  };

  const confirm = async () => {
    if (!snapshot) return;
    try {
      const response = await fetch('/api/decodeImage', {
        method: 'POST',
        body: JSON.stringify({
          snapshot,
        }),
      });
  
      if (response.ok) {
        // If the response status is OK (e.g., 200), you can access the response data
        const responseData = await response.json();
        setUserData(responseData.data)
        setConfirmed(true);
        console.log(userData);
      } else {
        // If the response status is not OK, handle it accordingly
        console.error('Fetch error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white">
        {captured && confirmed && (
          <Form data={userData} updateShowImage={updateShowImage} redo={redo} />
        )}
        {captured && (
          <img
            className="mx-auto border-none rounded-3xl my-4"
            src={snapshot}
          />
        )}
        {!captured && (
          <div className="flex mx-auto w-4/5 lg:w-1/2 my-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              style={{ width: "100%", height: "100%", borderRadius: "2em" }}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-grow">
        {!captured && (
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={capture}
          >
            Capture
          </button>
        )}
        {captured && !confirmed && (
          <>
            <button
              className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={redo}
            >
              Retake
            </button>
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={confirm}
            >
              Confirm
            </button>
          </>
        )}
      </div>
      <div className="sticky bottom-0 w-full h-16 p-4 bg-slate-100 rounded-t-3xl">
        <Navbar />
      </div>
    </div>
  );
}
