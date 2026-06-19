// app/login/page.jsx  (NO 'use client' directive)
import LoginForm from '../../../components/shared/LoginForm';

export default async function LoginPage({ searchParams }) {
  // searchParams is a regular object, safe to use on the server
   const params = await searchParams;
  const redirectTo = params?.redirect ?? null;

  return <LoginForm redirectTo={redirectTo} />;
}