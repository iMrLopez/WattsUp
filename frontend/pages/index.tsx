import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import CarComponent from "../components/car.component";
import React, { useEffect } from "react";
import LeftMainBarComponent from "../components/leftMainBar.component";
import Car from '../models/car.interface';

interface HomeProps {
  cars: Car[];
}

const Home: NextPage<HomeProps> = ({ cars }: HomeProps) => {
  const [car, setPressedCar] = React.useState<Car | null>(null);

  return (
    <>
      <Head>
        <title>WattsUp</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="gap-4 sm:columns-4 xl:columns-4 2xl:columns-4">
          <LeftMainBarComponent car={car} />
          {cars ? (
            cars.map((car) => (
              <CarComponent car={car} onPress={(car) => setPressedCar(car)} />
            ))
          ) : (
            <></>
          )}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Made with ❤️ by <a href="https://github.com/iMrLopez">iMrLopez</a> &{" "}
        <a href="https://github.com/shoys89">shoys89</a>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meta/cars`);
    return {
      props: {
        cars: response.data || [],
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
