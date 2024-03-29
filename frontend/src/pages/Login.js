import React, { useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { logout } from "../actions/userActions";

function Login() {
  const emailref = useRef();
  const passwordref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  var redirectUrl = searchParams.get("redirectTo");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin && redirectUrl === "admin") {
      navigate("/admin");
    } else if (userInfo && userInfo.isAdmin) {
      navigate("/admin");
    } else if(userInfo){
      alert("The user in unauthorised");
      dispatch(logout())
      navigate("/")
    }
  }, [userInfo]);

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(emailref.current.value, passwordref.current.value)
    dispatch(login(emailref.current.value, passwordref.current.value));
  }
  return (
    <section>
      <div className="flex min-h-screen overflow-hidden">
        <div className="flex flex-col justify-center flex-1 px-4 py-12  sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-xl mx-auto lg:w-96">
            <div>
              <Link to="/">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/circled-left-2.png"
                  className="mb-6"
                />
              </Link>
              <a
                href="/"
                className="lora-font text-blue-400 text-semibold text-md"
              >
                RohStore
              </a>
              <h2 className="font-merriweather mt-6 text-3xl font-bold text-neutral-600">
                {" "}
                Log In.{" "}
              </h2>
              {error && <p className="error">{error}</p>}
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        ref={emailref}
                        placeholder="Your Email"
                        className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg  text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        ref={passwordref}
                        placeholder="Your Password"
                        className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg  text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        to="/"
                        className="font-medium text-blue-400 hover:text-blue-500"
                      >
                        {" "}
                        Forgot your password?{" "}
                      </Link>
                    </div>
                  </div>
                  <div>
                    <input
                      type="submit"
                      disabled={loading}
                      value={loading ? "Logging You In" : "Login"}
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-400  rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                  </div>
                </form>
                <Link to="/signup" className="text-md my-8 flex justify-center">
                  <a
                    href="javascript:void(0);"
                    className="font-medium text-blue-400 hover:text-blue-500"
                  >
                    {" "}
                    Don't have an account? Sign Up{" "}
                  </a>
                </Link>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  {/* <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-600"> Or continue with </span>
                    </div> */}
                </div>
                {/* <a onClick = {()=> googleSignUp()}>
                    <button type="submit" className="
                w-full
                items-center
                block
                px-10
                py-3.5
                text-base
                font-medium
                text-center text-blue-400
                transition
                duration-500
                ease-in-out
                transform
                border-2 border-white
                shadow-md
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
                ">
                    <div className="flex items-center justify-center">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
                        <span className="ml-4"> Log in with Google</span>
                    </div>
                    </button>
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://source.unsplash.com/P9LTNN1GJqk"
            alt="cover-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
