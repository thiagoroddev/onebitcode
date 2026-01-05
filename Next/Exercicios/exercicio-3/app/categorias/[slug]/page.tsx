import spaceships from "@/data/spaceships.json";
import Link from "next/link";
import {notFound} from "next/navigation";
import {TypographyH1} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  // Extrai as categorias únicas das naves
  const categorias = Array.from(new Set(spaceships.map((n) => n.category)));

  // Gera os slugs a partir dos nomes das categorias
  return categorias.map((categoria) => ({
    slug: slugify(categoria),
  }));
}

// Define os tipos para as props da página
interface CategoriaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoriaPage({params}: CategoriaPageProps) {
  const {slug} = await params;

  const navesDaCategoria = spaceships.filter(
    (n) => slugify(n.category) === slug
  );

  if (navesDaCategoria.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col items-center bg-fuchsia-500">
      <TypographyH1>Categoria: {navesDaCategoria[0].category}</TypographyH1>

      <ul className="flex gap-3 flex-wrap mt-6 w-full justify-center">
        {navesDaCategoria.map((nave) => (
          <Link href={`/espaconaves/${nave.id}`} key={nave.id}>
            <Button className="w-full">{nave.name}</Button>
          </Link>
        ))}
      </ul>
    </div>
  );
}
