import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Car from "../models/car.interface";

interface HomeProps {
  cars: Car[];
}

const Home: NextPage<HomeProps> = ({ cars }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>WattsUp</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center"></span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              2022 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Our incredible Next.js community got together in San Francisco for
              our first ever in-person conference!
            </p>
          </div>
          {cars.map(({ id, model_name, image_url }) => (
            <Image
              key={id}
              alt={model_name}
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
              src={image_url}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                      (max-width: 1280px) 50vw,
                      (max-width: 1536px) 33vw,
                      25vw"
            />
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Made with ❤️ by iMrLopez & choyz
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const response = await axios.get(`${backendUrl}/cars`);
    return {
      props: {
        cars: response.data.cars || [],
      },
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      props: {
        cars: [],
      },
    };
  }
}
