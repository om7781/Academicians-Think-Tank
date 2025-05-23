import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  const isPublicPath = path === '/Login';
  const isPrivatePath = ['/Profile', '/Blog/createBlog'].includes(path);
  const isAdminPath = path === '/AdminDashboard';
  const isAdminLogin = path === '/Admin'

  if(isAdminLogin && token) {
    return NextResponse.json({message:"Logout First!"})
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/Profile', request.url));
  }

  if ((isPrivatePath || isAdminPath) && !token) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  if (token && isAdminPath) {
    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }

  return NextResponse.next();
}
