// layout.tsx
import "./globals.css";
import {TypographyH3} from "@/components/ui/typography";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body className="h-full flex flex-col">
        <header className="shrink-0">
          <div className="flex flex-row justify-between items-center gap-4 p-4 max-w-7xl mx-auto">
            <TypographyH3>Meu Site</TypographyH3>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Início
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/espaconaves" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Espaçonaves
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/categorias">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Categorias
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Separator />
        </header>

        <main className="flex-1 flex justify-center">{children}</main>
      </body>
    </html>
  );
}
