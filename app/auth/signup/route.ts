import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabaseserver';
export async function POST(request:Request){
  const f=await request.formData();
  const email=String(f.get('email')||'');
  const password=String(f.get('password')||'');
  const dob=String(f.get('dob')||'');
  const omitDob=String(f.get('omitDob')||'0')==='1';
  const constellation=String(f.get('constellation')||'origen');
  const s=createServer();
  const { data:d, error } = await s.auth.signUp({ email, password });
  if(error) return NextResponse.redirect(new URL('/signup?error='+encodeURIComponent(error.message), request.url));
  const user=d.user;
  if(user){
    const payload:any={ id:user.id, constellation:constellation||'origen', updated_at:new Date().toISOString() };
    if(!omitDob && dob) payload.dob=dob;
    await s.from('profiles').upsert(payload);
  }
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
