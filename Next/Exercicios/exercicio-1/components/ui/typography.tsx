import {cn} from "@/lib/utils"; // Utilitário que vem por padrão no shadcn

export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className // Isso permite que você adicione classes de cor ou margem depois
      )}
    >
      {children}
    </h1>
  );
}
