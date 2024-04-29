import '../index.css'
import {Link} from "react-router-dom";
import {useRef} from "react";
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import { auth, db } from '../firebase';
import {color} from "framer-motion";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getFirestore,
    setDoc,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    serverTimestamp,
    increment,
    arrayUnion,
    arrayRemove,
    runTransaction,
    deleteField
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";






function Register() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function getIPAddress() {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    }
    //Signin with email and password
    const signInWithEmail = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // disable the button
        window.localStorage.setItem('email', event.target.email.value);
        try {
            const userCredential =   await createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value);
            console.log(userCredential);
            if (userCredential.user) {
                const ipAddress = await getIPAddress();
                setSuccess('Thank you! You have been successfully registered with us!');
                await setDoc(doc(db, "usrmain", userCredential.user.uid), {
                    fullName: event.target.fullName.value,
                    email: event.target.email.value,
                    category: event.target.category.value,
                    emailVerified: false,
                    photoURL: null,
                    phoneNumber: null,
                    providerData: null,
                    displayName: null,
                    uid: userCredential.user.uid,
                    createdAt: userCredential.user.metadata.createdAt,
                    creationTime: userCredential.user.metadata.creationTime,
                    updatedAt: serverTimestamp(),
                    lastLoginAt: userCredential.user.metadata.lastSignInTime,
                    lastSignInTime: userCredential.user.metadata.lastSignInTime,
                    isActive: true,
                    signInIP: ipAddress,
                });
                navigate("/apps?component=resumes");
            }
        } catch (error) {
            setError(error.message);
        }finally {
            event.target.reset();
            setIsSubmitting(false);
        }
    };

    //Signin with google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                const ipAddress = await getIPAddress();
                await setDoc(doc(db, "usrmain", result.user.uid), {
                    fullName: result.user.displayName,
                    email: result.user.email,
                    category: null,
                    emailVerified: result.user.emailVerified,
                    photoURL: result.user.photoURL,
                    phoneNumber: result.user.phoneNumber,
                    providerData: null,
                    displayName: result.user.displayName,
                    uid: result.user.uid,
                    createdAt: result.user.metadata.createdAt,
                    creationTime: result.user.metadata.creationTime,
                    updatedAt: serverTimestamp(),
                    lastLoginAt: result.user.metadata.lastSignInTime,
                    lastSignInTime: result.user.metadata.lastSignInTime,
                    isActive: true,
                    signInIP: ipAddress,
                });
                
                window.localStorage.setItem('email', result.user.email);
                setSuccess('Thank you! You have been successfully registered with us!');
                setTimeout(() => {
                    navigate("/apps?component=resumes");
                }, 3000);
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <>
            <section className="section-login">
                <div className="login-component">
                    <div className="login-navbar">
                        <h4>AYC</h4>
                        <a href="#" className="login-logo-link w-nav-brand"></a>
                    </div>
                    <figure id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44dd9-1feb9fb7" className="login-content-left">
                        <div className="max-width-small align-center">
                            <div className="margin-bottom">
                                <div className="text-align-center-2">
                                    <div className="max-width-large align-center">
                                        <div className="margin-bottom margin-small">
                                            <h1 className="heading-style-h3-2 text-align-left">Register with AYC</h1>
                                        </div>
                                        <p className="text-size-medium text-align-left">Sign up and start your career journey</p>
                                    </div>
                                </div>
                            </div>
                            <div className="login-form-block w-form">
                                <form onSubmit={signInWithEmail} id="wf-form-Log-in-Form-7" name="wf-form-Log-in-Form-14"
                                      data-name="Log in Form 14" method="get" className="login-form"
                                      data-wf-page-id="65f90f061c8a0b111feb9fb7"
                                      data-wf-element-id="297f275c-c970-4b99-5b1d-a5f8dee44de4">
                                    <div className="form-field-wrapper">
                                        <div className="field-label">Full name*</div>
                                        <input className="input-form w-input" style={{color:"black"}} maxLength="256" name="fullName"
                                               data-name="Full Name" placeholder="Enter your full name" type="text"
                                               id="fullName" required=""/>
                                    </div>
                                    <div className="form-field-wrapper">
                                        <div className="field-label">Email*</div>
                                        <input className="input-form w-input" style={{color:"black"}} maxLength="256" name="email"
                                               data-name="Email Address" placeholder="Enter your email" type="email"
                                               id="email" required=""/>
                                    </div>
                                    <div className="form-field-wrapper">
                                        <div className="field-label-wrapper">
                                            <div className="field-label">Category*</div>
                                        </div>
                                        <select id="category" name="category" data-name="category" required=""
                                                className="input-form w-select">
                                            <option value="default">Select Category</option>
                                            <option value="student">Student</option>
                                            <option value="job_applicant">Job applicant</option>
                                            <option value="professional">Professional</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="tutor">Tutor</option>
                                            <option value="investor">Investor/Partner</option>
                                        </select>
                                    </div>
                                    <div id="w-node-d5e8df2b-dbe5-8ae7-ab1f-fb953280c3e0-1feb9fb7"
                                         className="form-field-wrapper">
                                        <div className="field-label-wrapper">
                                            <div className="field-label">Password*</div>
                                            <a href="#" className="text-style-link-2">Forgot your password?</a>
                                        </div>
                                        <input className="input-form w-input" style={{color:"black"}} maxLength="256" name="password"
                                               data-name="Password" placeholder="Enter your password" type="password"
                                               id="password" required=""/>
                                    </div>
                                    <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df4-1feb9fb7"
                                         className="w-layout-grid form-button-wrapper"><input type="submit"
                                                                                              data-wait="Please wait..."
                                                                                              id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df5-1feb9fb7"
                                                                                              className="button maxx-full-width w-button"
                                                                                              value="Sign Up"
                                                                                              disabled={isSubmitting}/>
                                        <a onClick={signInWithGoogle}  disabled={isSubmitting} id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df6-1feb9fb7" href="#"
                                           className="button is-secondary w-inline-block"><img alt="" loading="lazy"
                                                                                               src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/62438070903162192f4aee7d_google.svg"
                                                                                               className="icon-1x1-xsmall"/>
                                            <div>Sign In with Google</div>
                                        </a>
                                    </div>
                                    {
                                        success &&
                                        <div className="success-message">
                                            <div className="success-text">{success}
                                            </div>
                                        </div>
                                    }
                                    {
                                        error &&
                                        <div className="error-message">
                                            <div className="error-text">{error}
                                            </div>
                                        </div>
                                    }
                                </form>
                                <div className="margin-top margin-small text-size-tiny align-center">
                                    By signing up, you agree to our&nbsp;<a href="#">Terms of Use</a>&nbsp;and&nbsp;<a href="#">Privacy Policy</a>.
                                </div>
                                <hr className="margin-top margin-small margin-bottom" style={{color:"afb7b7"}}/>
                                <div className="margin-top margin-small">
                                    <div className="text-align-center-2">Already have an account? <Link to={'/login'}
                                                                                                     className="text-style-link-2">Sign
                                        In</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </figure>
                    <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44e05-1feb9fb7" className="login-image-wrapper"><img
                        src="../images/Hero-BG.png" loading="lazy" width="Auto" height="Auto" alt=""
                        srcSet="../images/Hero-BG.png 500w, ../images/Hero-BG.png 800w, ../images/Hero-BG.png 1080w, ../images/Hero-BG.png 1438w"
                        sizes="(max-width: 479px) 91vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, (max-width: 3059px) 47vw, 1438px"/>
                    </div>
                    <div className="login-footer">
                        <div className="text-size-small-2">© AYC</div>
                    </div>
                </div>
            </section>
            <div className="extras-cta">
                <div className="hire-us">
                    <div className="hire-us-wrapper">
                        <div className="hire-us-text">Hire us to build a website using this template. Get unlimited
                            design &amp; dev.
                        </div>
                        <div className="hire-us-buttons">
                            <a href="http://designup.net" target="_blank" className="hire-us-button w-inline-block">
                                <div className="hire-us-button-text">View pricing</div>
                            </a>
                        </div>
                        <div data-w-id="3e1d66bb-f76c-c42f-076a-789b7baa5b0f" className="hire-us-close-icon"><img
                            src="../images/X.svg" loading="lazy" alt="" className="image-7"/></div>
                    </div>
                </div>
                <a href="https://webflow.com/templates/html/offdata-saas-website-template" target="_blank"
                   className="buy-template w-inline-block"><img src="../images/Webflow-Logo.svg" loading="lazy" alt=""
                                                                className="dup-icon"/>
                    <div className="buy-template-label">Buy this Template</div>
                </a>
                <a href="https://webflow.com/templates/designers/designup" target="_blank"
                   className="all-templates w-inline-block"><img src="../images/DesignUp.svg" loading="lazy" alt=""
                                                                 className="dup-icon"/>
                    <div className="all-templates-label">All Templates</div>
                </a>
            </div>

        </>
    )

}


export default Register;
