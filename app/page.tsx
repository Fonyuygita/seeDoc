import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

const page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image src="/assets/images/doc5.png" width={300} height={300} alt="Doctor" className="md:w-1/3 mb-8 w-full h-fit rounded-2xl px-5" />
      <h1 className="md:text-3xl  text-xl font-bold mb-4">
        <span className="typewriter">NO STRESS CONSULTATION 😃
        </span>
      </h1>
      <p className="text-lg text-gray-300 mb-8">Consult With No Stress.</p>
      <Link href="/home" className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300" >

        Get Started

      </Link>
    </div>
  );
};
export default page;
