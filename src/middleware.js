import { NextResponse, NextRequest} from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || null
  const ispublicPath =  path === '/Login'
  const isprivatePath = path === '/Profile'


  if(ispublicPath && token) {
    return NextResponse.redirect(new URL('/Profile', request.url))
  }

    if(isprivatePath && !token) {
        return NextResponse.redirect(new URL('/Login', request.url))
    }
  

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/Login', '/About', '/Blog', '/Contact', '/','/Profile'],
}



