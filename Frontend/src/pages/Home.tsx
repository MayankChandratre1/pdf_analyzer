import { SignOutButton, useAuth, useUser } from '@clerk/clerk-react'
import apiClient, { setAuthToken } from '../api/axiosClient'
import { useEffect } from 'react'

const Home = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  useEffect(()=>{
    if(isSignedIn === null) return;
    const clerkId = clerkUser?.id;
    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (clerkId && email) {
      getUser(clerkId);
    }
  },[])

  const getUser = async (clerkId: string): Promise<void> => {
    try {
      const token = await getToken();      
      setAuthToken(token);
      const resp = await apiClient.get(`/api/users/getUser/${clerkId}`);
      console.log(resp.data);
    } catch (error) {
      console.error("Error getting user data from backend:", error);
    }
  };

  return (
    <div className='font-universe'>
        <SignOutButton />
        <div>
          <button>Send</button>
        </div>
    </div>
  )
}

export default Home