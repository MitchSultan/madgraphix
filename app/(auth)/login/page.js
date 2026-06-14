// app/login/page.jsx  (NO 'use client' directive)
import LoginForm from '../../../components/shared/LoginForm';

export default function LoginPage({ searchParams }) {
  // searchParams is a regular object, safe to use on the server
  const redirectTo = searchParams?.redirect ?? null;

  return <LoginForm redirectTo={redirectTo} />;
}