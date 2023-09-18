
'use client'
import { signInWithGoogle } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const UserLogin = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
      }
      Cookies.set('userId', user?.uid)
      Cookies.set('userEmail', user?.email)
      setUser(user);
      // console.log(user.uid);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const signOut = () => {
    firebase.auth().signOut();
    Cookies.remove('userId')
    Cookies.remove('userEmail')
  };

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div>
      {user ? (
        <button
          onClick={signOut}
          className="block w-full px-12 py-3 mt-12 text-sm font-medium text-white rounded shadow bg-gray-500 sm:w-auto focus:outline-none focus:ring"
        >
          Log Out
        </button>
      ) : (
        <button
          className="block w-full px-12 py-3 mt-12 text-sm font-medium text-white rounded shadow bg-blue-500 sm:w-auto active:bg-blue-400 hover:bg-blue-400 focus:outline-none focus:ring"
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </button>
      )}
    </div>
  );
};
