import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions'

function useAuthUser(props) {
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    const { setCurrentUser } = props;
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return setCurrentUser;
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useAuthUser);