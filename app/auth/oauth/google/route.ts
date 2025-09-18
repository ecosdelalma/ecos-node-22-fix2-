import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabaseClient';
export async function GET(request:Request){
  const s=createServer();
  const {data,error}=await s.auth.signInWithOAuth({provider:'google',options:{redirectTo:new URL('/dashboard', request.url).toString()}});
  if(error) return NextResponse.redirect(new URL('/login?error='+encodeURIComponent(error.message), request.url));
  return NextResponse.redirect(data.url!);
}
