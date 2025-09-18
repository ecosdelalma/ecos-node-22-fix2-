'use client'; import { useEffect, useState } from 'react'; import { createClient } from '@/lib/supabaseClient'; import ConstellationMenu from '@/components/ConstellationMenu';
export default function ProfilePage(){ const supabase=createClient(); const [loading,setLoading]=useState(true);
  const [profile,setProfile]=useState<any>({ display_name:'', eco_word:'', eco_type:'', color:'', bio:'', dob:'', constellation:'origen' }); const [message,setMessage]=useState<string>('');
  useEffect(()=>{(async()=>{ const {data:{user}}=await supabase.auth.getUser(); if(!user) return; const {data}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle(); if(data) setProfile((p:any)=>({...p,...data})); setLoading(false); })();},[]);
  async function save(){ setMessage(''); const {data:{user}}=await supabase.auth.getUser(); if(!user) return; const payload={ id:user.id, ...profile, updated_at:new Date().toISOString() }; const {error}=await supabase.from('profiles').upsert(payload); if(error) setMessage(error.message); else setMessage('guardado ✓'); }
  if(loading) return <p className="mt-10">cargando…</p>;
  return (<section className="mt-10 max-w-xl mx-auto card"><h2 className="text-2xl mb-4 lowercase">perfil</h2><div className="grid gap-3">
    <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="nombre o seudónimo" value={profile.display_name||''} onChange={e=>setProfile(p=>({...p, display_name:e.target.value}))} />
    <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="palabra que te representa" value={profile.eco_word||''} onChange={e=>setProfile(p=>({...p, eco_word:e.target.value}))} />
    <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="tipo de eco" value={profile.eco_type||''} onChange={e=>setProfile(p=>({...p, eco_type:e.target.value}))} />
    <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="color emocional" value={profile.color||''} onChange={e=>setProfile(p=>({...p, color:e.target.value}))} />
    <textarea className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="breve bio" value={profile.bio||''} onChange={e=>setProfile(p=>({...p, bio:e.target.value}))} />
    <div className="grid gap-2"><label className="text-sm text-white/70">fecha de nacimiento</label><input className="px-3 py-2 rounded bg-white/10 border border-white/20" type="date" value={profile.dob||''} onChange={e=>setProfile(p=>({...p, dob:e.target.value}))} /></div>
    <div className="grid gap-2"><label className="text-sm text-white/70">tu constelación</label><ConstellationMenu name="constellation" defaultValue={profile.constellation||'origen'} /></div>
    <button className="btn-primary" onClick={save}>guardar</button>{message && <p className="text-white/70">{message}</p>}
  </div></section>); }
