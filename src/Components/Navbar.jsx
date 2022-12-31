import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoblack from "../assets/logo-lightbg-transparent.png"
import logowhite from "../assets/logo-darkbg-transparent.png"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [inSources, setInSources] = useState(false)

  useEffect(() => {
    if (location.pathname == "/sources"){
      setInSources(true)
    } else {
      setInSources(false)
    }
  }, [location])

  const nav = () => {
    navigate("/");
    setInSources(false)
  };

  const navStyle = "fixed w-screen h-16 font-bold drop-shadow-lg z-10"

  return (
    <div className={!inSources? "bg-[#2B3A55] text-slate-100 " + navStyle : "bg-[#fff] text-stone-900 " + navStyle}>
      <div className="justify-center items-center w-full flex">
        <div className="flex items-center">
          <img onClick={nav} src={!inSources? logowhite : logoblack} width="65px" height="65px" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
