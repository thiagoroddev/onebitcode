import Image from "next/image";
import sat from "@/public/images/sat.webp";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-fuchsia-500">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {/* Usando a fonte local definida no layout */}
        <h1 className="text-5xl font-chandia">Testando importação local</h1>
        {/* Importando uma imagem local por string */}
        <Image
          src="/images/image.png"
          alt="Exercício Dois"
          width={600}
          height={400}
          priority={true}
          className="w-full h-auto max-2-[600px]"
        />
        <h2>Testanto importação com módulo</h2>
        {/* Importando uma imagem local por módulo, recomendado para imagens fixas */}
        <Image src={sat} alt="Satélite" placeholder="blur" />
      </main>
    </div>
  );
}
