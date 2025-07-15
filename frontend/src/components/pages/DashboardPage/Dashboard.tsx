"use client";

import PageTemplate from '@/components/templates/DashboardTemplate/PageTemplate';
import { useAuth, JWTPayload } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import useApiClientPrivate from '@/hooks/useApiClientPrivate';
import { useToast } from '@/hooks/useToast';

export default function DashboardPage() {
  const auth = useAuth();
  const router = useRouter();
  const apiClientPrivate = useApiClientPrivate();
  const toast = useToast();

  const handleLogout = async () => {
    await auth.logout();
    router.replace('/');
    toast.success('You have logged out successfully.');
  };

  const makeProtectedRequest = async () => {
    // call to a protected route and include access token
    try {
      await apiClientPrivate.get('/');

      if (!auth.accessToken) {
        alert("No access token found. Please log in again.");
        return;
      }

      // display decoded JWT payload
      const decodedToken: JWTPayload = jwtDecode<JWTPayload>(auth.accessToken? auth.accessToken : '');

      alert(`${decodedToken?.fullName || 'N/A'}, you have made a protected request!`);
    } catch (error) {
      console.error('Error making protected request:', error);
      alert('Failed to make protected request. Please try again.');
    }
  };

  return (
    <PageTemplate>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="font-eudoxus-sans mb-4 text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-300">This is the dashboard.</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-5">
          <button onClick={handleLogout}>
            <span className="rounded-full bg-cyan-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 text-shadow-md hover:bg-cyan-700">
              Logout
            </span>
          </button>
          <button onClick={makeProtectedRequest}>
            <span className="rounded-full bg-cyan-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 text-shadow-md hover:bg-cyan-700">
              Protected request
            </span>
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}