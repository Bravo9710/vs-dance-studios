import { Hero } from "@/components/hero";
import { ClassFinder } from "@/components/class-finder";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <ClassFinder />
      </main>
    </>
  );
}
