import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Logo } from "../components/Logo";
import { useAuthStore } from "../stores/authStore";
import { VITE_API_URL } from "../config";
import { jwtDecode } from 'jwt-decode'
import { useEffect } from "react";

export default function Login() {
  const setToken = useAuthStore((state: any) => state.setToken);
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setToken(access_token);
      const token: any = jwtDecode(access_token);
      const roles = token.user.role;
      if (roles) {
        if (roles.find((role: any) => role.tipo === "Puesto de servicio")) {
          navigate("/entry");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, []);

  async function handlerSubmit(event: any) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const res = await fetch(VITE_API_URL + "/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
       "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (data.access_token) {
      toast.success("Login Success");
      const token: any = await jwtDecode(data.access_token)
      const roles: any[] = token.user.role;
      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token);
      console.log(roles);

      if(roles.find((role: any) => role.tipo === 'Administrador')){
        navigate("/dashboard");
      } else if(roles.find((role: any) => role.tipo === 'Puesto de servicio')){
        navigate("/entry");
      }
    } else {
      toast.error("Login Failed");
    }
  }

  return (
    <section id="login" className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
        <span className="flex flex-col gap-2 mb-5">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-fingerprint text-primary"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
            <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
            <path d="M12 11v2a14 14 0 0 0 2.5 8" />
            <path d="M8 15a18 18 0 0 0 1.8 6" />
            <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
          </svg> */}
          <div className="flex items-center justify-center">
            <img src="/assets/logoSena.png" alt="logo" width="128px" />
          </div>

          <h1 className="block text-2xl bolder">Centro Colombo alemán sede TIC</h1>

          {/* <h1 className=" tracking-widest font-bold self-center text-4xl whitespace-nowrap text-secondary">
            PIA
          </h1> */}
        </span>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Inicia sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="usuario@empresa.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-tertiary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm p-4 border rounded-md text-center"
              >
                Entrar
              </button>
              {/* <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
