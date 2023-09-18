'use client'
import Navbar from "../components/Navbar"
import { ProfileCard } from "../components/ProfileCard"
import firebase from "../../utils/firebase";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Community() {
  const [similarUsers, setSimilarUsers] = useState()
  const [emailString, setEmailString] = useState()
  const [fullUsers, setFullUsers] = useState()
  useEffect(() => {
    const getCommunity = async (userId) => {
      try {
        const response = await fetch('/api/community', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userId),
        })
        console.log(response)
        if (response.ok) {
          const responseData = await response.json();
          setSimilarUsers(responseData.similarUsers)
          setEmailString(responseData.similarUsers.map(user => user[1]).join(', '));
        }
      } catch (error) {
        console.error(error)
      }
    }
    const userId = Cookies.get('userId')
    getCommunity(userId)
    
  }, [])

  useEffect(() => {
    const createServer = async (input) => {
      try {
        const response = await fetch('/api/discord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })
        console.log(response)
        if (response.ok) {
          const responseData = await response.json();
          if (responseData !== 'success') {
            console.error('error')
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    createServer(emailString)
  }, [emailString])

  console.log(similarUsers)

  return (
    <>
    <h1 className="text-4xl font-bold mx-6 py-6">Your Curated Community</h1>
      {similarUsers &&
        similarUsers.map((user) => (
          <div key={user.id}>
            {" "}
            <h1>{user.name}</h1>
            <ProfileCard data={user} />
          </div>
        ))}

      <div className="flex items-center justify-center p-4 bottom-0 absolute w-full bg-slate-100 rounded-t-3xl">
        <Navbar />
      </div>
    </>
  );
}
