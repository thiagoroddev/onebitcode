import {Button} from "@/components/ui/button";
import categoriaNaves from "@/data/spaceships.json";
import {TypographyH1} from "@/components/ui/typography";
import Link from "next/link";

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function Categorias() {
  const categoriasUnicas = Array.from(
    new Set(categoriaNaves.map((nave) => nave.category))
  );

  return (
    <div className="w-full flex flex-col items-center m-4">
      <TypographyH1 className="text-center">Categorias</TypographyH1>
      <div className="grid grid-cols-3 md:grid-cols-4  gap-2 m-4 w-full max-w-6xl">
        {categoriasUnicas.map((categoria) => (
          <Link href={`/categorias/${slugify(categoria)}`} key={categoria}>
            <Button className="w-full">{categoria}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
