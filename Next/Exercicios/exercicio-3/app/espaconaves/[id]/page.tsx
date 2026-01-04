import spaceships from "@/data/spaceships.json";
import {notFound} from "next/navigation";
import {TypographyH1} from "@/components/ui/typography";
import Image from "next/image";

export function generateStaticParams() {
  return spaceships.map((nave) => ({
    id: String(nave.id),
  }));
}

interface EspaconavePageProps {
  params: {
    id: string;
  };
}

export default async function EspaconavePage({params}: EspaconavePageProps) {
  const {id} = await params;

  const nave = spaceships.find((nave) => nave.id === Number(id));

  if (!nave) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TypographyH1>{nave.name}</TypographyH1>
      <div className="relative w-full h-64 my-6">
        <Image
          src={nave.imageUrl}
          alt={nave.name}
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
      <p className="mt-4">{nave.description}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Categoria: {nave.category}
      </p>
    </div>
  );
}
