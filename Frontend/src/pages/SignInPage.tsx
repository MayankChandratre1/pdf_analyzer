import { SignIn, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import apiClient, { setAuthToken } from "../api/axiosClient";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  useEffect(() => {
    alert(isSignedIn)
    if (isSignedIn === null || !clerkUser) return;

    const clerkId = clerkUser?.id;
    const email = clerkUser?.primaryEmailAddress?.emailAddress;

    if (clerkId && email) {
      getUser(clerkId);
    }
  }, [isSignedIn, clerkUser]);

  const getUser = async (clerkId: string): Promise<void> => {
    try {
      const token = await getToken();
      console.log(token);
      
      setAuthToken(token);
      const resp = await apiClient.get(`/api/users/getUser/${clerkId}`);
      console.log(resp.data);
      
    } catch (error) {
      console.error("Error getting user data from backend:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignIn signUpUrl="/signup"  forceRedirectUrl={"/home"} />
    </div>
  );
}
