import {
    protectedRoutes,
    authRoutes,
    publicRoutes,
} from '@/routes';

export function middleware(request) {
    const { nextUrl } = request;

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtected = protectedRoutes.includes(nextUrl.pathname);

    const token = request.cookies.get('jwt');

    if (isProtected) {
        if (!token) {
            return Response.redirect(new URL('/login', nextUrl));
        }
        return;
    }

    if (isAuthRoute) {
        if (token) {
            return Response.redirect(new URL('/chat', nextUrl));
        }
    }
    return;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}