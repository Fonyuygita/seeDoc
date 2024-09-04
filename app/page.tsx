import ClientForm from "@/components/forms/ClientForm";
import { PasskeyModal } from "@/components/PassKeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <h2 className="text-2xl text-white">Patients Form here</h2>
          <ClientForm />
          <div className="text-l4 regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @ 2024 SeedInnovatess
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin?</Link>
          </div>

        </div>
      </section>

      {/* right side section */}
      <Image
        src="/assets/images/doc5.png"
        height={1000}
        width={1000}
        alt="doctor_picture"
        className="side-img max-w-[50%]"
      />
      <h1>Say hi here please</h1>

    </div>
  );
}

export default Home