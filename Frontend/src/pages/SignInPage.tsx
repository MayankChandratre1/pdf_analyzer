import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function SignInPage() {
  
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);


  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignIn signUpUrl="/signup"  forceRedirectUrl={"/home"} />
    </div>
  );
}
