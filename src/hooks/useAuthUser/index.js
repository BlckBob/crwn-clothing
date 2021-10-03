import { useEffect, useState } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export default function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // no need for ref here
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // setUser(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          // console.log(user);
        });
      }
      setUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user; // return authenticated user
}

// export default useAuthUser;
