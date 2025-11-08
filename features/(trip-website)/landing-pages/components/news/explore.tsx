import Image from "next/image";
import ExploreImage from "@/assets/images/exploreImg.jpg";

export default function Explore() {
  return (
    <div className="mt-17 flex items-center justify-center">
      <div className="relative flex h-[500px] w-full items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={ExploreImage}
            alt="why us"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/*<div className="absolute inset-0 bg-gradient-to-b from-(--chart-6) via-(--chart-6)/20 to-(--chart-7)/100" />*/}

        <div className="absolute inset-0 bg-black/40 bg-none" />

        <div className="relative z-10 flex max-w-full flex-col items-center gap-4 px-4 text-center text-white sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <h1 className="text-4xl font-bold md:text-5xl">
            How to Build a Recognition Culture That Actually Works
          </h1>
          <p className="mt-2 text-lg">
            Creating a workplace where appreciation thrives isnt just about
            saying thank you more often. Its about building systems, habits, and
            mindsets that make recognition a natural part of your organizations
            DNA.
          </p>
        </div>
      </div>
    </div>
  );
}
