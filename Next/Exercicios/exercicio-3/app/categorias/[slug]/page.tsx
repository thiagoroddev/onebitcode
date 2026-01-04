import spaceships from "@/data/spaceships.json";
import Link from "next/link";
import {notFound} from "next/navigation";
import {TypographyH1} from "@/components/ui/typography";

export function generateStaticParams() {
  const categorias = Array.from(new Set(spaceships.map((n) => n.category)));

  return categorias.map((categoria) => ({
    slug: categoria.toLowerCase(),
  }));
}

interface CategoriaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoriaPage({params}: CategoriaPageProps) {
  const {slug} = await params;

  const navesDaCategoria = spaceships.filter(
    (n) => n.category.toLowerCase() === slug
  );

  if (navesDaCategoria.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TypographyH1>Categoria: {navesDaCategoria[0].category}</TypographyH1>

      <ul className="mt-6 space-y-2">
        {navesDaCategoria.map((nave) => (
          <li key={nave.id}>
            <Link
              href={`/espaconaves/${nave.id}`}
              className="text-blue-600 hover:underline"
            >
              {nave.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
