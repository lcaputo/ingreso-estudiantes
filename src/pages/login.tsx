import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import { VITE_API_URL } from "../config";
import { useRef, useState } from "react";
import EyeIconLarge from "../assets/icons/IconEye2";
import EyeIconComplex from "../assets/icons/IconEye";
import MailIcon from "../assets/icons/IconMail";
import { RoleEnumByType } from "../enums/eUserRole";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const setToken = useAuthStore((state: any) => state.setToken);
  const navigate = useNavigate();
  const inputRefPassword = useRef<HTMLInputElement>(null);
  const inputRefEmail = useRef<HTMLInputElement>(null);

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
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (data.access_token) {
      toast.success("Login Success");
      setToken(data.access_token, data.rol.tipo);
      // if (data.rol.tipo === RoleEnumByType.PUESTO_DE_SERVICIO) {
      //   console.log("navigate to entry");

      //   navigate("/entry");
      // } else {
      //   navigate("/dashboard");
      // }
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

          <h1 className="block text-2xl bolder">
            Centro Colombo alemán sede TIC
          </h1>

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
                <div className=" flex bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="usuario@empresa.com"
                    required
                    className="border-none w-full focus:ring-0"
                    ref={inputRefEmail}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();
                      if (inputRefEmail.current) {
                        const cursorPosition =
                          inputRefEmail.current.selectionStart;
                        setTimeout(() => {
                          inputRefEmail.current?.focus();
                          inputRefEmail.current?.setSelectionRange(
                            cursorPosition,
                            cursorPosition
                          );
                        }, 0);
                      }
                    }}
                  >
                    <MailIcon width="24" height="24" />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <div className="flex bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border-none w-full focus:ring-0"
                    required
                    ref={inputRefPassword}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();
                      if (inputRefPassword.current) {
                        const cursorPosition =
                          inputRefPassword.current.selectionStart;
                        setViewPassword(!viewPassword);
                        setTimeout(() => {
                          inputRefPassword.current?.focus();
                          inputRefPassword.current?.setSelectionRange(
                            cursorPosition,
                            cursorPosition
                          );
                        }, 0);
                      }
                      setViewPassword(!viewPassword);
                    }}
                  >
                    {viewPassword ? (
                      <EyeIconLarge color="#ffff" />
                    ) : (
                      <EyeIconComplex color="#73B02C" />
                    )}
                  </button>
                </div>
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
