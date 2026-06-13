// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabaseBrowser } from '../../lib/supabase/client';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// export default function LoginPage() {
//   const router = useRouter();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError('');
    
//     const supabase = supabaseBrowser();
//     const { error: signInError } = await supabase.auth.signInWithPassword({
//       email: data.email,
//       password: data.password,
//     });

//     if (signInError) {
//       setError(signInError.message);
//       setLoading(false);
//     } else {
//       router.push('/dashboard');
//       router.refresh();
//     }
//   };

//   return (
//     <>
    
    
//     <div className="min-h-screen m-2 flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">Mad Graphix Login</h2>
        
//         {error && (
//           <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               {...register('email')}
//               type="email"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               {...register('password')}
//               type="password"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// }

// import { LoginForm } from '../../components/auth/LoginForm'

// export const metadata = { title: 'Sign In — MadGraphix' }

// export default async function LoginPage({ searchParams }) {
//   const params = await searchParams

//   const error = params?.error
//   const redirect = params?.redirect

//   return (
//     <div className="w-full max-w-md">
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold tracking-tight">
//           MAD <span className="text-[#F5A623]">Graphix</span>
//         </h1>
//         <p className="mt-2 text-sm text-gray-400">
//           Sign in to your workspace
//         </p>
//       </div>

//       {error === 'account_disabled' && (
//         <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
//           <p className="text-sm text-red-400">
//             Your account has been disabled. Contact the administrator.
//           </p>
//         </div>
//       )}

//       <LoginForm redirectTo={redirect} />
//     </div>
//   )
// }



'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseBrowser } from '../../../lib/supabase/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROLE_HOME } from '../../../lib/roles';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect'); // e.g., "/admin/dashboard"

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const supabase = supabaseBrowser();

    // 1. Sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    

    if (signInError) {
      // Generic message for security
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    // 2. Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Fetch profile to determine role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

      console.log({
        redirectTo,
        role: profile?.role,
      });

    // 4. Handle missing profile
    if (profileError || !profile) {
      console.error('Profile fetch failed:', profileError);
      setError('Your account is not fully set up. Please contact support.');
      setLoading(false);
      
      // Sign out to avoid half‑authenticated state
      await supabase.auth.signOut();
      return;
    }

    // 5. Determine destination
    const destination =
      redirectTo ??                     // original request (from ?redirect=)
      ROLE_HOME[profile.role] ??        // role‑based home
      '/error';                         // ultimate fallback – NEVER '/login'

    router.push(destination);
    router.refresh();
    // loading will be cleared by the unmount
  };

  return (
    <div className="min-h-screen m-2 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Mad Graphix Login</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}