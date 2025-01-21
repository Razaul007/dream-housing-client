/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
   
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser);
        if (currentUser) {
            const user = currentUser.email;
            
            axios.post(
              `${import.meta.env.VITE_API_URL}/users`,
              {
                name: currentUser?.displayName,
                image: currentUser?.photoURL,
                email: currentUser?.email,
                role:'customer'
              }
            )

            // jwt
            axios.post(`${import.meta.env.VITE_API_URL}/authentication`, user, {
                withCredentials:true
            })
                .then(data => {
                    console.log(data.data)
                    if (data.data) {
                        localStorage.setItem('access-token', data?.data?.token)
                        setLoading(false);
                    }
                })

        } else {
            localStorage.removeItem('access-token');
            setLoading(false);
        }


    })
    return () => {
        return unsubscribe();
    }
}, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider