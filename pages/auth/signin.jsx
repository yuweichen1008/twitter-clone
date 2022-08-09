import { React, useState, useEffect } from 'react'
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'

export default function singin({ providers }) {
  // const checkProviders = (
  //   providers &&
  //   providers.length
  // );
  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);
  // console.log("Providers", providers);
  return (
    <div className='flex justify-center mt-20'>
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover h-40 md:w-50 rotate-6  md:inline-flex"
      />
      <div className="">
      { Object.values(providers).map((provider) => (
          
          <div key={provider.name}>
              <button className="flex w-auto mt-10 p-4 bg-blue-500 text-white h-auto rounded-lg focus:outline-none"
                onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })} >

                Log in with {provider.name}
              </button>
          </div>
        ))}
        
      </div>
    </div>
  )
}

// server side
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
        props: { providers },
  };
}