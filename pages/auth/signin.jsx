import {React, useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'

export default function singin({ providers }) {
  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);
  return (
    <div className='flex justify-center mt-20'>
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
      />
      <div className="">
        {Object.values(providers).map((provider) => {
          <div className="flex flex-col items-center">
            <img
              classN ame="w-36 object-cover"
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter logo"
            />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with Google
            </button>
          </div>
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}