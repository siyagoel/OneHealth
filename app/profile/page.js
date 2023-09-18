'use client'
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Cookies from "js-cookie"

export default function Profile() {
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const userId = Cookies.get('userId')
    const getUserInfo = async (userId) => {
      try {
        const response = await fetch("/api/userInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            },
          body: JSON.stringify(userId), // Send inputData as JSON in the request body
        });
        console.log(response)
        if (response.ok) {
          console.log(response)
          const responseData = await response.json();
          setUserInfo(responseData.data);
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (userId) getUserInfo(userId);
  }, [])
  if (!userInfo) return <div></div>

  return (
    <>
      <h1 className="text-4xl font-bold mx-6 py-6">Your Profile</h1>
      <div className="mx-4 my-4">
        <article class="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <div class="rounded-[10px] bg-white p-4 sm:p-6">
            <h2 className="text-2xl font-semibold pb-20 pt-4">
              Personal Information
            </h2>
            <time datetime="2022-10-10" class="block text-xs text-gray-500">
              {userInfo.email}
            </time>

            <a href="#">
              <h3 class="mt-0.5 text-lg font-medium text-gray-900">
                {userInfo.userId}
              </h3>
            </a>
          </div>
        </article>
      </div>
      <div className="mx-4 my-4">
        <article class="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <div class="rounded-[10px] bg-white p-4 sm:p-6">
            <h2 className="text-2xl font-semibold pb-20 pt-4">
              Health Information
            </h2>
            <time datetime="2022-10-10" class="block text-xs text-gray-500">
              {userInfo['health-score'] > 0.5 ? "You are at a high risk of diabetes. Please consult your medical professional for assistance!" : "You are below the range considered to be at range for diabetes. Keep up the good work!"}
            </time>

            <a href="#">
              <h3 class="mt-0.5 text-lg font-medium text-gray-900">
              {userInfo['health-score']}
              </h3>
            </a>
          </div>
        </article>
      </div>
      <div className="flex items-center justify-center p-4 bottom-0 absolute w-full bg-slate-100 rounded-t-3xl">
        <Navbar />
      </div>
    </>
  );
}
