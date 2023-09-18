import React from 'react';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full h-8 flex justify-between">
      <button onClick={() => router.push('/community')} className="w-full px-4 h-full text-sm font-xl font-bold text-gray-700 hover:bg-gray-50 focus:relative">
        Community
      </button>

      <button onClick={() => router.push('/scan')} className="w-full px-4 h-full text-sm font-lg text-gray-700 font-bold hover:bg-gray-50 focus:relative">
        Scan
      </button>

      <button onClick={() => router.push('/profile')} className="w-full px-4 h-full text-sm font-lg text-gray-700 font-bold hover:bg-gray-50 focus:relative">
        Profile
      </button>
    </div>
  );
}
