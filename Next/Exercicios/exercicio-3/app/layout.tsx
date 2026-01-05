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
                  <NavigationMenuLink
                    href="/"
                    className={navigationMenuTriggerStyle()}
                  >
                    Início
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/espaconaves"
                    className={navigationMenuTriggerStyle()}
                  >
                    Espaçonaves
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/categorias"
                    className={navigationMenuTriggerStyle()}
                  >
                    Categorias
                  </NavigationMenuLink>
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
