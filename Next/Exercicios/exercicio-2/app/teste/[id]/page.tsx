export default async function Id({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <div>
      <h1>Página Dinâmica {id}</h1>
      <p>Esta é uma página dinâmica dentro da subpasta teste.</p>
    </div>
  );
}
