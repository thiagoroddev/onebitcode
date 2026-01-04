import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import dataNaves from "../../data/spaceships.json";
import Link from "next/link";

export default function EspaconavesPage() {
  return (
    <div className="w-full flex flex-col items-center m-4">
      <div>
        <TypographyH1 className="my-4">Todas as Espaçonaves</TypographyH1>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 m-4 w-full max-w-6xl">
        {dataNaves.map((nave) => (
          <Link href={`/espaconaves/${nave.id}`} key={nave.id}>
            <Button className="w-full">{nave.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
