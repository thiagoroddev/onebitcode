import {Button} from "@/components/ui/button";
import categoriaNaves from "@/data/spaceships.json";
import {TypographyH2} from "@/components/ui/typography";
import Link from "next/link";

export default function Categorias() {
  const categoriasUnicas = Array.from(
    new Set(categoriaNaves.map((nave) => nave.category))
  );
  console.log(categoriasUnicas);
  return (
    <div className="w-full flex flex-col items-center m-4">
      <TypographyH2 className="text-center">Categorias</TypographyH2>
      <div className="grid grid-cols-3 md:grid-cols-4  gap-2 m-4 w-full max-w-6xl">
        {categoriasUnicas.map((categoria) => (
          <Link href={`/categorias/${categoria.toLowerCase()}`} key={categoria}>
            <Button key={categoria} className="w-full">
              {categoria}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
