import Image from "next/image";
import { useRouter } from "next/navigation";

import schoolImg from "@/assets/images/home.png";

export const Index = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto" id="home">
      <div className="flex justify-between pt-24 p-6">
        <div className="flex flex-col justify-center">
          <h6 className="text-4xl mb-4 leading-tight">
            Alphabet <br /> School Management System
          </h6>
          <p className=" mb-8 text-gray-600 text-lg leading-relax">
            Efficiently manage student enrollment, attendance, grades, and more
            with our intelligent school management platform.
          </p>

          <button
            className="bg-gray-900 rounded-md px-6 py-3 w-1/4 !text-white cursor-pointer"
            type="button"
            onClick={() => router.push("/auth/login")}
          >
            Get Started
          </button>
        </div>

        <div className="flex justify-center">
          <Image
            src={schoolImg}
            alt="School Illustration"
            width={600}
            height={500}
            className="w-[600px] h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};
