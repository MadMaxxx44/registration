import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setUser("");
    setPwd("");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-teal-100">
      <section className="flex-col w-[350px] h-[420px] bg-teal-300 relative">
        <p
          ref={errRef}
          className={
            errMsg
              ? "bg-pink-300 text-blue-500 font-bold p-2 mb-2"
              : "absolute left-[-9999px]"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="flex justify-center w-full p-3 text-2xl font-bold">
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex-col w-full justify-center"
        >
          <div className="flex w-full pb-2 justify-center">
            <label htmlFor="username">
              <div>Username:</div>
              <input
                className="rounded-md w-[230px]"
                ref={userRef}
                type="text"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                autoComplete="off"
              />
            </label>
          </div>
          <div className="flex w-full pb-8 justify-center">
            <label htmlFor="password">
              <div>Password:</div>
              <input
                className="rounded-md w-[230px]"
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="bg-gray-100 text-black font-semibold w-[230px] rounded px-4 py-1 hover:bg-teal-100"
              disabled={!user || !pwd ? true : false}
            >
              Sign In
            </button>
          </div>
          <p className="pl-[60px] pt-[13px] w-full">
            Need an account?
            <br />
            <span className="underline">
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </form>
        <div
          className={
            success
              ? "absolute top-0 w-full h-full bg-teal-400 flex justify-center items-center"
              : "hidden"
          }
        >
          SUCCESS!&#10004;
        </div>
      </section>
    </div>
  );
};

export default SignIn;
