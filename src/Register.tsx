import { useEffect, useRef, useState } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;

const Register = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
    setUser("");
    setPwd("");
    setMatchPwd("");
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
          aria-live="assertive" //screenreader will immidiatly read this one, when the focus is set on this paragraph
        >
          {errMsg}
        </p>
        <h1 className="flex justify-center w-full p-3 text-2xl font-bold">
          Login
        </h1>
        <div className="flex w-full">
          <form
            onSubmit={handleSubmit}
            className="flex-col w-full justify-center"
          >
            <div className="flex w-full pb-2 justify-center">
              <label htmlFor="user">
                <div>
                  Username:
                  <span className={validName ? "ml-1" : "hidden"}>
                    &#10004;
                  </span>
                  <span className={validName || !user ? "hidden" : "ml-1"}>
                    &#10006;
                  </span>
                </div>
                <input
                  className="rounded-md w-[230px]"
                  type="text"
                  id="user"
                  value={user}
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />

                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "text-xs rounded-lg bg-black text-white w-[230px] p-1 relative bottom-[-10px]"
                      : "absolute left-[-9999px]"
                  }
                >
                  &#9655; 3 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </label>
            </div>
            <div className="flex w-full justify-center pb-1">
              <label htmlFor="pwd">
                <div>
                  Password:
                  <span className={validPwd ? "ml-1" : "hidden"}>&#10004;</span>
                  <span className={validPwd || !pwd ? "hidden" : "ml-1"}>
                    &#10006;
                  </span>
                </div>
                <input
                  className="rounded-md w-[230px]"
                  type={showPassword ? "text" : "password"}
                  id="pwd"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />{" "}
                <br />
                <div className={pwd ? "" : "hidden"}>
                  <input
                    type="checkbox"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </div>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? "text-xs rounded-lg bg-black text-white w-[230px] p-1 top-1 relative"
                      : "absolute left-[-9999px]"
                  }
                >
                  &#9655; 8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </label>
            </div>
            <div className="flex w-full pb-4 justify-center">
              <label htmlFor="conf-pwd">
                <div>
                  Confirm Password:
                  <span className={validMatch && matchPwd ? "ml-1" : "hidden"}>
                    &#10004;
                  </span>
                  <span className={validMatch || !matchPwd ? "hidden" : "ml-1"}>
                    &#10006;
                  </span>
                </div>
                <input
                  className="rounded-md w-[230px]"
                  type="password"
                  id="conf-pwd"
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="conf-note"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="conf-note"
                  className={
                    matchFocus && !validMatch
                      ? "text-xs rounded-lg bg-black text-white w-[230px] p-1 relative bottom-[-10px]"
                      : "absolute left-[-9999px]"
                  }
                >
                  &#9655; Must match the first password input field.
                </p>
              </label>
            </div>
            <div className="flex w-full justify-center">
              <button
                className="bg-gray-100 text-black font-semibold w-[230px] rounded px-4 py-1 hover:bg-teal-100"
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </div>
            <p className="pl-[60px] pt-[13px] w-full">
              Already registered?
              <br />
              <span className="underline">
                {/* link to signing page */}
                <a href="#">Sign In</a>
              </span>
            </p>
          </form>
        </div>
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

export default Register;
