import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function Gabarito() {
  return (
    <>
      <Card className="w-lvh bg-amber-300 font-sans">
        <CardHeader>
          <CardTitle className="font-bold text-5xl">
            Conheça a família Macbook
          </CardTitle>
          <CardDescription>Agora com novos modelos M3</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row">
          <Card className="w-1/2 m-4 text-center">
            <CardHeader>
              <Image
                src="https://www.apple.com/v/mac/home/ca/images/overview/select/product_tile_mbp_14_16__bkl8zusnkpw2_large.png"
                alt="Macbook Pro 14 e 16 polegadas"
                width={400}
                height={300}
              />
              <CardTitle className="text-2xl">
                Macbook Air de 13 e 15 pol.
              </CardTitle>
              <CardDescription className="font-bold">
                Chip M3, M3 Pro ou M3 Max
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Os notebooks Macbook Pro de 14 e 16 polegadas são ideais para
                profissionais que precisam de alto desempenho e portabilidade.
              </CardDescription>
              <CardTitle className="mt-5">A partir de R$ 4.999</CardTitle>
            </CardContent>
            <CardFooter className="flex gap-4 justify-around">
              <Button variant="secondary">Saiba mais</Button>
              <Button variant="default">Comprar</Button>
            </CardFooter>
          </Card>
          <Card className="w-1/2 m-4 text-center">
            <CardHeader>
              <Image
                src="https://www.apple.com/v/mac/home/ca/images/overview/select/product_tile_mbp_14_16__bkl8zusnkpw2_large.png"
                alt="Macbook Pro 14 e 16 polegadas"
                width={400}
                height={300}
              />
              <CardTitle className="text-2xl">
                Macbook Air de 14 e 16 pol.
              </CardTitle>
              <CardDescription className="font-bold">
                Chip M3, M3 Pro ou M3 Max
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Os notebooks Macbook Pro de 14 e 16 polegadas são ideais para
                profissionais que precisam de alto desempenho e portabilidade.
              </CardDescription>
              <CardTitle className="mt-5">A partir de R$ 9.999</CardTitle>
            </CardContent>
            <CardFooter className="flex gap-4 justify-around">
              <Button variant="secondary">Saiba mais</Button>
              <Button variant="default">Comprar</Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
