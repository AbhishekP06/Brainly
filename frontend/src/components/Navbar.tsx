import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  password: string;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/api/v1/${isLogin ? "signin" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message);

        if (isLogin && data.token) {
          localStorage.setItem("token", data.token.token);
        }

        setIsOpen(false);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Spacer */}
        <div className="w-24"></div>

        {/* Center: Logo + tagline */}
        <div className="flex items-end">
          <h1 className="text-9xl font-bold">.paste</h1>
          <p className="text-gray-700 text-sm p-4">
            anything - text / shorts / music / tweets / pins
          </p>
        </div>

        {/* Right: Login/Signup */}
        <div className="w-36 flex justify-end ">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-950 text-white px-4 py-2 rounded-xl shadow hover:bg-gray-500 transition"
          >
            Login / Signup
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-gray-950 text-white py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-4">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-900 font-semibold cursor-pointer hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
