import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export const Form = ({ data, redo }) => {
  const router = useRouter();
  // Check if data is empty or not provided
  if (!data || Object.keys(data).length === 0) {
    return null; // Return null or another placeholder if data is empty
  }

  const [pregnancies, setPregnancies] = useState(data["Pregnancies"]);
  const [glucose, setGlucose] = useState(data["Glucose"]);
  const [bloodPressure, setBloodPressure] = useState(data["Blood Pressure"]);
  const [skinThickness, setSkinThickness] = useState(data["Skin Thickness"]);
  const [insulin, setInsulin] = useState(data["Insulin"]);
  const [bmi, setBMI] = useState(data["BMI"]);
  const [diabetesPedigreeDegree, setDiabetesPedigreeDegree] = useState(data["Diabetes Pedigree Degree"]);
  const [age, setAge] = useState(data["Age"]);
  const [errorMessage, setErrorMessage] = useState("")

  const getPrediction = async (inputData) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(inputData), // Send inputData as JSON in the request body
      })
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
      }
    } catch (error) {
      setErrorMessage(error);
    }
    router.push('/profile')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberFields = [
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeDegree,
      age,
    ];
  
    // Check if all numberFields are valid numbers
    const areAllNumbersValid = numberFields.every((value) => !isNaN(parseFloat(value)));
  
    if (areAllNumbersValid) {
      const numbersArray = numberFields.map((value) => parseFloat(value));
      const inputValue = {}
      inputValue['array'] = numbersArray;
      inputValue['userId'] = Cookies.get('userId')
      inputValue['userEmail'] = Cookies.get('userEmail')
      getPrediction(inputValue);
    } else {
      setErrorMessage('Please enter valid numeric values for all fields');
    }
  };
  
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-bold text-left text-4xl">Your health data:</h1>

        <p className="mt-4 text-gray-500 text-left">
          Review your health data and make changes, otherwise scroll down to the
          bottom and click continue.
        </p>
      </div>

      <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <div className="relative">
            <div>
              <label
                htmlFor="pregnancies"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Pregnancies
              </label>

              <input
                type="text"
                value={pregnancies}
                onChange={(e) => setPregnancies(e.target.value)}
                placeholder="Pregnancies"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="glucose"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Glucose
              </label>

              <input
                type="text"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                placeholder="Glucose"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="bloodPressure"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Blood Pressure
              </label>

              <input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="Blood Pressure"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="skinThickness"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Skin Thickness
              </label>

              <input
                type="text"
                value={skinThickness}
                onChange={(e) => setSkinThickness(e.target.value)}
                placeholder="Skin Thickness"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="insulin"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Insulin
              </label>

              <input
                type="text"
                value={insulin}
                onChange={(e) => setInsulin(e.target.value)}
                placeholder="Insulin"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="bmi"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                BMI
              </label>

              <input
                type="text"
                value={bmi}
                onChange={(e) => setBMI(e.target.value)}
                placeholder="BMI"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="diabetesPedigreeDegree"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Diabetes Pedigree Degree
              </label>

              <input
                type="text"
                value={diabetesPedigreeDegree}
                onChange={(e) => setDiabetesPedigreeDegree(e.target.value)}
                placeholder="Diabetes Pedigree Degree"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-2"
              >
                Age
              </label>

              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 mx-1 inline-block rounded-lg bg-blue-400 px-5 py-3 text-sm font-semibold text-white"
          >
            Confirm
          </button>
          <button
            className="flex-1 mx-1 inline-block rounded-lg bg-red-400 px-5 py-3 text-sm font-semibold text-white"
            onClick={redo}
          >
            Retake
          </button>
        </div>
      </form>
    </div>
  );
};

