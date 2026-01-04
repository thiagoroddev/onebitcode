// page.tsx
import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TypographyH1>Conheça as naves do universo Stars Wars</TypographyH1>
      <Button className="mt-10 w-fit">
        <Link href="/espaconaves" passHref>
          Ver Todos
        </Link>
      </Button>
    </div>
  );
}
