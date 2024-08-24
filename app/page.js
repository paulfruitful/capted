import Image from "next/image";
import Hero from "./_components/Hero";
import { Kanit, Mulish } from "next/font/google";

const kanit=Kanit({subsets:['latin'], weight:['100','200','300','400','500','600','700','800','900']})
const mulish=Mulish({subsets:['cyrillic'],weight:['200','400','700']})
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
  <Hero kanit={kanit} mulish={mulish}/>
    </main>
  );
}
