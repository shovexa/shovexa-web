import React from 'react'
import Image from 'next/image';
import {  useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SignUpWithGoogleComponent = () => {

  const searchParams = useSearchParams(); // call once, store it
  const trackedPath = searchParams.get('track') || '/';

  const restParams = new URLSearchParams(searchParams.toString());
  restParams.delete('track'); // <-- the missing piece
  const restQuery = restParams.toString();

  const loginHref = `/login?track=${encodeURIComponent(trackedPath)}${restQuery ? `&${restQuery}` : ''}`;

  
  return (
    <div className="flex justify-center items-center mt-4">
      <Link
        type='reset'
        href={loginHref}
        className="flex items-center cursor-pointer gap-3 bg-white text-gray-700 border border-gray-300 rounded-full px-6 py-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
      >
        <Image
        width={5}
        height={5}
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium">Sign up with Google</span>
      </Link>
    </div>

  )
}

export default SignUpWithGoogleComponent
