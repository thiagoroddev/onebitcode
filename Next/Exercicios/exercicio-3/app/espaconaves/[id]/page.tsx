import spaceships from "@/data/spaceships.json";
import {notFound} from "next/navigation";
import {TypographyH1} from "@/components/ui/typography";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {Separator} from "@radix-ui/react-separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";

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

  let nexNaveId = Number(id) + 1;
  if (nexNaveId > spaceships.length) {
    nexNaveId = 1;
  }

  let prevNaveId = Number(id) - 1;
  if (prevNaveId < 1) {
    prevNaveId = spaceships.length;
  }

  return (
    <Card className="flex flex-col justify-around m-20 max-w-2xl">
      <CardHeader>
        <TypographyH1>{nave.name}</TypographyH1>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 my-6">
          <Image
            src={nave.imageUrl}
            alt={nave.name}
            fill
            className="object-contain rounded-lg className relative w-full h-64 my-6"
            priority
          />
        </div>
        <CardDescription className="mt-10">{nave.description}</CardDescription>
        <CardDescription className="mt-5 text-sm text-muted-foreground">
          Categoria: {nave.category}
        </CardDescription>
      </CardContent>
      <div className="flex flex-row justify-between mx-5">
        <Link href={`/espaconaves/${prevNaveId}`}>
          <Button variant="outline">Voltar</Button>
        </Link>
        <Link href={`/espaconaves/${nexNaveId}`}>
          <Button variant="outline">Próximo</Button>
        </Link>
      </div>
    </Card>
  );
}
