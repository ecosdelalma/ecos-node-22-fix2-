export default function LoginPage({ searchParams }:{ searchParams:{ error?:string } }){ return (
  <section className="mt-10 max-w-md mx-auto card">
    <h2 className="text-2xl mb-4 lowercase">entrar</h2>
    {searchParams?.error && <p className="mb-3 text-red-300">{decodeURIComponent(searchParams.error)}</p>}
    <form className="grid gap-3" action="/auth/signin" method="post">
      <input className="px-3 py-2 rounded bg-white/10 border border-white/20" name="email" placeholder="correo" type="email" required />
      <input className="px-3 py-2 rounded bg-white/10 border border-white/20" name="password" placeholder="contraseña" type="password" required />
      <button className="btn-primary" type="submit">entrar</button>
    </form>
    <div className="mt-4"><a className="btn" href="/auth/oauth/google">continuar con google</a></div>
  </section> ); }
