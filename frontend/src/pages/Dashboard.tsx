import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, session, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login');
    }
  }, [loading, session, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition"
            >
              Migration Mind
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.email}! 👋
          </h2>
          <p className="text-gray-600 mb-6">
            You are successfully logged in to your account.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Session Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-600">Email</dt>
                  <dd className="text-base text-gray-900 font-semibold break-words">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">User ID</dt>
                  <dd className="text-xs text-gray-600 break-words font-mono">{user?.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Auth Method</dt>
                  <dd className="text-base text-gray-900 font-semibold capitalize">
                    {session?.user?.user_metadata?.provider || 'Email/Password'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Session Token Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Auth Token</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Access Token (first 50 chars):</p>
                <code className="text-xs bg-gray-900 text-green-400 p-3 rounded block break-all overflow-auto max-h-24">
                  {session?.access_token?.substring(0, 50)}...
                </code>
                <p className="text-xs text-gray-500">Token is valid and stored in session</p>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Authentication:</span>
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Session:</span>
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-semibold">
                    Valid
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Access:</span>
                  <span className="inline-block px-3 py-1 bg-indigo-500 text-white text-xs rounded-full font-semibold">
                    Granted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Metadata */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">User Metadata</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-xs">
            {JSON.stringify(
              {
                id: user?.id,
                email: user?.email,
                provider: session?.user?.user_metadata?.provider || 'email',
                created_at: user?.created_at,
                last_sign_in_at: user?.last_sign_in_at,
                role: session?.user?.role,
                aud: session?.user?.aud,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
