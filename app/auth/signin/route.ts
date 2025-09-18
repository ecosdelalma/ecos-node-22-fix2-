import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabaseserver';
export async function POST(request:Request){
  const f=await request.formData();
  const email=String(f.get('email')||'');
  const password=String(f.get('password')||'');
  const s=createServer();
  const { error } = await s.auth.signInWithPassword({ email, password });
  if(error) return NextResponse.redirect(new URL('/login?error='+encodeURIComponent(error.message), request.url));
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
