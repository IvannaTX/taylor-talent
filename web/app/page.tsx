import { Hero } from "@/components/site/hero";
import { Finale } from "@/components/site/finale";
import { AudiencePaths } from "@/components/home/AudiencePaths";

/**
 * Homepage.
 *
 * A concise trust narrative. Detailed company, leader and founder content lives
 * on its own route so every primary-nav click reveals something new.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AudiencePaths />
      <Finale />
    </>
  );
}
