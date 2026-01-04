import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, session, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  // If already logged in, send to dashboard
  useEffect(() => {
    if (!loading && session) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, session, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    setSubmitting(true);
    try {
      const { session: newSession } = await signIn(formData.email, formData.password);

      // If email confirmation is required, Supabase won't return a session until confirmed
      if (!newSession) {
        setInfo('Check your email to confirm your account before logging in.');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google login failed');
      setSubmitting(false);
    }
  };

  {/* UI updated - login page */}


  return (
  <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">

    {/* BACKGROUND GLOW */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-black"></div>

    {/* HEADER — MIGRATION MIND LOGO */}
    <header
      className="relative z-10 w-full h-14 flex items-center px-8
      bg-gradient-to-r from-black via-[#1a120d] to-black
      border-b border-white/10"
    >
      <span className="text-white text-lg font-semibold tracking-wide">
        Migration Mind
      </span>
    </header>

    {/* MAIN CONTENT */}
    <div className="relative z-10 flex-1 flex items-center justify-center px-8">
      <div className="w-full max-w-6xl flex justify-between items-center">

        {/* LEFT TEXT */}
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Log In to Your <br />
            <span className="text-orange-500">Account</span>
          </h1>
          <p className="text-gray-400 mt-4">
            Unlock the full potential of your data.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center">

          {/* LOGIN CARD */}
          <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-xl text-white">
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 transition text-black font-semibold py-2 rounded-md"
              >
                {submitting ? "Logging in..." : "Log In"}
              </button>

              <p className="text-xs text-center text-gray-300 mt-3">
                Don’t have an account?{" "}
                <a href="/signup" className="text-orange-400 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>

          {/* GOOGLE / LINKEDIN — BOX ER BAIRE */}
          <div className="flex gap-4 mt-4">
            <button onClick={handleGoogleLogin} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-xs text-white hover:bg-white/20">
              <img
                src="https://s3-alpha.figma.com/hub/file/2729744958/2a5758d6-4edb-4047-87bb-e6b94dbbbab0-cover.png"
                className="w-4 h-4"
              />
              Google
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-xs text-white hover:bg-white/20">
              <img
                src="https://img.freepik.com/premium-vector/square-linkedin-logo-isolated-white-background_469489-892.jpg"
                className="w-4 h-4"
              />
              LinkedIn
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* FOOTER — TERMS & PRIVACY */}
    <footer className="relative z-10 text-gray-400 text-xs px-10 py-4 flex justify-between">
      <div className="flex gap-4">
        <a href="#" className="hover:text-white">Terms</a>
        <a href="#" className="hover:text-white">Privacy</a>
      </div>
    </footer>

  </div>
);

}
