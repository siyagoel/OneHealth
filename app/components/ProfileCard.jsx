import React, { useEffect, useState } from 'react'

export const ProfileCard = ({ data }) => {
  if (!data) {
    return <></>
  }
  
  return (
    <div className="mx-4 my-4">
      <article class="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
          <time datetime="2022-10-10" class="block text-xs text-gray-500">
            {data[0]}
          </time>

          <a href="#">
            <h3 class="mt-0.5 text-lg font-medium text-gray-900">
              {data[1]}
            </h3>
          </a>
        </div>
      </article>
    </div>
  );
}
