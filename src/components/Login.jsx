import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';
import makeRequest from '../api/useApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [successError, setSuccessError] = useState();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     login(email, password);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await makeRequest('POST', 'login', { email, password });
            login(data.token);
            setSuccessError(data.status);
        } catch (error) {
            console.error('Login failed:', error);
            setSuccessError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-login">
            <div className="login-component">
                <figure id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44dd9-1feb9fb7" className="login-content-left">
                    <div className="max-width-small align-center">
                        <div className="margin-bottom">
                            <div className="text-align-center-2">
                                <div className="max-width-large align-center">
                                    <div className="margin-bottom">
                                        <div className="text-align-center-2">
                                            <div className="max-width-large align-center">
                                                <div className="margin-bottom margin-small">
                                                    <h1 className="heading-style-h3-2 text-align-left">Register with AYC</h1>
                                                </div>
                                                <div className="margin-bottom margin-small">
                                                    <a href="/"><img src="./images/logo.svg" width="100" height="100" loading="lazy" alt="" /></a>
                                                </div>
                                                <p className="text-size-large text-block text-align-left">Sign In to AYC Platform</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-form-block w-form">
                            <form onSubmit={handleSubmit}
                                id="wf-form-Log-in-Form-7"
                                name="wf-form-Log-in-Form-14"
                                data-name="Log in Form 14" method="get" className="login-form"
                                data-wf-page-id="65f90f061c8a0b111feb9fb7"
                                data-wf-element-id="297f275c-c970-4b99-5b1d-a5f8dee44de4">
                                <div className="form-field-wrapper">
                                    <div className="field-label">Email*</div>
                                    <input className="input-form w-input" style={{ color: "black" }} maxLength="256" name="email" data-name="Email Address" placeholder="Enter your email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div id="w-node-d5e8df2b-dbe5-8ae7-ab1f-fb953280c3e0-1feb9fb7"
                                    className="form-field-wrapper">
                                    <div className="field-label-wrapper">
                                        <div className="field-label">Password*</div>
                                        <a href="#" className="text-style-link-2">Forgot your password?</a>
                                    </div>
                                    <input className="input-form w-input" style={{ color: "black" }} maxLength="256" name="password" data-name="Password" placeholder="Enter your password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df4-1feb9fb7" className="w-layout-grid form-button-wrapper">
                                    <button type="submit" disabled={isLoading} id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df5-1feb9fb7" className="button maxx-full-width w-button" >
                                        {isLoading ? (
                                            <>
                                                <Spinner className="pr-2" color="current" size="sm" />{" "}
                                                Submitting...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>
                                    {/* <a  id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df6-1feb9fb7" href="#" className="button is-secondary w-inline-block">
                                        <img alt="" loading="lazy" src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/62438070903162192f4aee7d_google.svg" className="icon-1x1-xsmall" />
                                        <div>Sign In with Google</div>
                                    </a> */}
                                </div>
                                {successError &&
                                    <div className="success-message">
                                        <div className="success-text">{successError}
                                        </div>
                                    </div>
                                }
                                {/* {error &&
                                    <div className="error-message">
                                        <div className="error-text">{error}
                                        </div>
                                    </div>
                                } */}
                            </form>
                            <div className="margin-top margin-small text-size-tiny align-center">
                                By signing up, you agree to our&nbsp;<a href="#">Terms of Use</a>&nbsp;and&nbsp;<a href="#">Privacy Policy</a>.
                            </div>
                            <hr className="margin-top margin-small margin-bottom" style={{ color: "afb7b7" }} />
                            <div className="margin-top margin-small">
                                <div className="text-align-center-2">
                                    New User? <Link to={'/register'} className="text-style-link-2">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </figure>
                <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44e05-1feb9fb7">
                    <img src="../images/registration-graphic.png" loading="lazy" alt="" srcSet="../images/registration-graphic.png 500w, ../images/registration-graphic.png 800w, ../images/registration-graphic.png 1080w, ../images/registration-graphic.png 1438w" sizes="(max-width: 479px) 91vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, (max-width: 3059px), 1438px" />
                </div>
            </div>
        </section>
    );
};

export default Login;



// import '../index.css'
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "firebase/auth";
// import { auth, db } from '../firebase';
// import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setUser } from '../store/slices/userSlice';

// const retrieveUserData = async (userId) => {
//     try {
//         const userDocRef = doc(db, "usrmain", userId);
//         const userDocSnapshot = await getDoc(userDocRef);

//         if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             // console.log("User Data: from retrieve", userData);
//             return userData;
//         } else {
//             console.log("User not found");
//         }
//     } catch (error) {
//         console.error("Error retrieving user data:", error.message);
//     }
// };

// function Login() {
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const navigate = useNavigate();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const dispatch = useDispatch();

//     async function getIPAddress() {
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         return data.ip;
//     }
//     //Signin with email and password
//     const signInWithEmail = async (event) => {
//         event.preventDefault();
//         setIsSubmitting(true); // disable the button
//         try {
//             const userCredential = await signInWithEmailAndPassword(
//                 auth,
//                 event.target.email.value, event.target.password.value
//             );
//             // console.log(userCredential);
//             if (userCredential.user) {
//                 const data = await retrieveUserData(userCredential.user.uid);
//                 // console.log("data after login", data);
//                 dispatch(setUser({ name: data.fullName, email: data.email }));
//                 setSuccess('Login Successfully!');
//                 window.localStorage.setItem("email", data.email);
//                 window.localStorage.setItem("fullName", data.fullName);
//                 const token = await userCredential.user.getIdToken();
//                 localStorage.setItem('userToken', token);
//                 setTimeout(() => {
//                     navigate("/onboarding");
//                 }, 3000);
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             event.target.reset();
//             setIsSubmitting(false);
//         }
//     };

//     //Signin with google
//     const signInWithGoogle = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             if (result.user) {
//                 const ipAddress = await getIPAddress();
//                 await setDoc(doc(db, "usrmain", result.user.uid), {
//                     fullName: result.user.displayName,
//                     email: result.user.email,
//                     category: null,
//                     emailVerified: result.user.emailVerified,
//                     photoURL: result.user.photoURL,
//                     phoneNumber: result.user.phoneNumber,
//                     providerData: null,
//                     displayName: result.user.displayName,
//                     uid: result.user.uid,
//                     createdAt: result.user.metadata.createdAt,
//                     creationTime: result.user.metadata.creationTime,
//                     updatedAt: serverTimestamp(),
//                     lastLoginAt: result.user.metadata.lastSignInTime,
//                     lastSignInTime: result.user.metadata.lastSignInTime,
//                     isActive: true,
//                     signInIP: ipAddress,
//                 });
//                 // console.log("login", result);
//                 const token = await result.user.getIdToken();
//                 localStorage.setItem('userToken', token);
//                 dispatch(setUser({ name: result.user.displayName, email: result.user.email }));
//                 setSuccess('Thank you! You have been successfully registered with us!');
//                 window.localStorage.setItem("fullName", result.user.displayName);
//                 window.localStorage.setItem("email", result.user.email);
//                 setTimeout(() => {
//                     navigate("/onboarding");
//                 }, 3000);
//             }
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <section className="section-login">
//             <div className="login-component">
//                 <figure id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44dd9-1feb9fb7" className="login-content-left">
//                     <div className="max-width-small align-center">
//                         <div className="margin-bottom">
//                             <div className="text-align-center-2">
//                                 <div className="max-width-large align-center">
//                                     <div className="margin-bottom">
//                                         <div className="text-align-center-2">
//                                             <div className="max-width-large align-center">
//                                                 <div className="margin-bottom margin-small">
//                                                     <h1 className="heading-style-h3-2 text-align-left">Register with AYC</h1>
//                                                 </div>
//                                                 <div className="margin-bottom margin-small">
//                                                     <img src="./images/logo.svg" width="100" height="100" loading="lazy" alt="" />
//                                                 </div>
//                                                 <p className="text-size-large text-block text-align-left">Sign In to AYC Platform</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="login-form-block w-form">
//                             <form onSubmit={signInWithEmail} id="wf-form-Log-in-Form-7"
//                                 name="wf-form-Log-in-Form-14"
//                                 data-name="Log in Form 14" method="get" className="login-form"
//                                 data-wf-page-id="65f90f061c8a0b111feb9fb7"
//                                 data-wf-element-id="297f275c-c970-4b99-5b1d-a5f8dee44de4">
//                                 <div className="form-field-wrapper">
//                                     <div className="field-label">Email*</div>
//                                     <input className="input-form w-input" style={{ color: "black" }} maxLength="256" name="email" data-name="Email Address" placeholder="Enter your email" type="email" id="email" required="" />
//                                 </div>
//                                 <div id="w-node-d5e8df2b-dbe5-8ae7-ab1f-fb953280c3e0-1feb9fb7"
//                                     className="form-field-wrapper">
//                                     <div className="field-label-wrapper">
//                                         <div className="field-label">Password*</div>
//                                         <a href="#" className="text-style-link-2">Forgot your password?</a>
//                                     </div>
//                                     <input className="input-form w-input" style={{ color: "black" }} maxLength="256" name="password" data-name="Password" placeholder="Enter your password" type="password" id="password" required="" />
//                                 </div>
//                                 <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df4-1feb9fb7" className="w-layout-grid form-button-wrapper">
//                                     <input type="submit" data-wait="Please wait..." id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df5-1feb9fb7" className="button maxx-full-width w-button" value="Sign In" disabled={isSubmitting} />
//                                     <a onClick={signInWithGoogle} disabled={isSubmitting} id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df6-1feb9fb7" href="#" className="button is-secondary w-inline-block">
//                                         <img alt="" loading="lazy" src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/62438070903162192f4aee7d_google.svg" className="icon-1x1-xsmall" />
//                                         <div>Sign In with Google</div>
//                                     </a>
//                                 </div>
//                                 {success &&
//                                     <div className="success-message">
//                                         <div className="success-text">{success}
//                                         </div>
//                                     </div>
//                                 }
//                                 {error &&
//                                     <div className="error-message">
//                                         <div className="error-text">{error}
//                                         </div>
//                                     </div>
//                                 }
//                             </form>
//                             <div className="margin-top margin-small text-size-tiny align-center">
//                                 By signing up, you agree to our&nbsp;<a href="#">Terms of Use</a>&nbsp;and&nbsp;<a href="#">Privacy Policy</a>.
//                             </div>
//                             <hr className="margin-top margin-small margin-bottom" style={{ color: "afb7b7" }} />
//                             <div className="margin-top margin-small">
//                                 <div className="text-align-center-2">
//                                     New User? <Link to={'/register'} className="text-style-link-2">Sign Up</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </figure>
//                 <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44e05-1feb9fb7">
//                     <img src="../images/registration-graphic.png" loading="lazy" alt="" srcSet="../images/registration-graphic.png 500w, ../images/registration-graphic.png 800w, ../images/registration-graphic.png 1080w, ../images/registration-graphic.png 1438w" sizes="(max-width: 479px) 91vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, (max-width: 3059px), 1438px" />
//                 </div>
//             </div>
//         </section>
//     )

// }


// export default Login;
