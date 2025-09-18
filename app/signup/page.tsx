'use client'; import PasswordField from '@/components/PasswordField'; import ConstellationMenu from '@/components/ConstellationMenu'; import { useState } from 'react';
export default function SignUpPage({ searchParams }:{ searchParams:{ error?:string } }){
  const [omitDob,setOmitDob]=useState(false); const [error,setError]=useState<string|null>(null);
  function onSubmit(e:React.FormEvent<HTMLFormElement>){ const form=e.currentTarget;
    const pwd=(form.querySelector('input[name=password]') as HTMLInputElement).value;
    const confirm=(form.querySelector('input[name=confirm]') as HTMLInputElement).value;
    if(pwd!==confirm){ e.preventDefault(); setError('Las contraseñas no coinciden'); } }
  return (
    <section className="mt-10 max-w-md mx-auto card">
      <h2 className="text-2xl mb-4 lowercase">crear cuenta</h2>
      {searchParams?.error && <p className="mb-3 text-red-300">{decodeURIComponent(searchParams.error)}</p>}
      {error && <p className="mb-3 text-red-300">{error}</p>}
      <form className="grid gap-3" action="/auth/signup" method="post" onSubmit={onSubmit}>
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20" name="email" placeholder="correo" type="email" required />
        <PasswordField name="password" placeholder="contraseña" />
        <PasswordField name="confirm" placeholder="repite tu contraseña" />
        <div className="grid gap-2">
          <label className="text-sm text-white/70">fecha de nacimiento (opcional)</label>
          <div className="flex gap-2">
            <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20" name="dob" type="date" disabled={omitDob} />
            <button className="btn" type="button" onClick={()=>setOmitDob(v=>!v)}>{omitDob?'usar fecha':'omitir'}</button>
          </div>
          <p className="text-xs text-white/50">si omites, usaremos un menú predeterminado.</p>
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-white/70">tu constelación</label>
          <ConstellationMenu name="constellation" />
        </div>
        <input type="hidden" name="omitDob" value={omitDob?'1':'0'} />
        <button className="btn-primary" type="submit">crear cuenta</button>
      </form>
      <div className="mt-4"><a className="btn" href="/auth/oauth/google">registrarme con google</a></div>
    </section> ); }
