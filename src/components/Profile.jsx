import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-[#0b1120] rounded-3xl shadow-2xl border border-white/10 p-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={user.avatar || "https://i.imgur.com/yhW6Yw1.jpg"}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 shadow-lg shadow-emerald-500/20"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0b1120]" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
            <p className="text-gray-400 mb-2">{user.email}</p>

            {user.role && (
              <span className="text-xs px-3 py-1 bg-emerald-500/15 text-emerald-400 rounded-full font-medium uppercase tracking-wide">
                {user.role}
              </span>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-400 text-sm">User ID</span>
              <span className="text-white font-medium">#{user.id}</span>
            </div>

            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Email</span>
              <span className="text-white font-medium">{user.email}</span>
            </div>

            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white font-medium">{user.name}</span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full mt-8 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 py-3 rounded-xl font-semibold transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
