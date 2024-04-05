import '../index.css'
import {Link} from "react-router-dom";
import {useRef} from "react";
import { useState } from 'react';


function Register() {
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
                                        <p className="text-size-medium text-align-left">Sign up and stay updated with our development.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="login-form-block w-form">
                                <form id="wf-form-Log-in-Form-7" name="wf-form-Log-in-Form-14"
                                      data-name="Log in Form 14" method="get" className="login-form"
                                      data-wf-page-id="65f90f061c8a0b111feb9fb7"
                                      data-wf-element-id="297f275c-c970-4b99-5b1d-a5f8dee44de4">
                                    <div className="form-field-wrapper">
                                        <div className="field-label">Full name*</div>
                                        <input className="input-form w-input" maxLength="256" name="Full-name"
                                               data-name="Full Name" placeholder="Enter your full name" type="text"
                                               id="Full-name" required=""/>
                                    </div>
                                    <div className="form-field-wrapper">
                                        <div className="field-label">Email*</div>
                                        <input className="input-form w-input" maxLength="256" name="Email-address"
                                               data-name="Email Address" placeholder="Your email" type="email"
                                               id="Email-address" required=""/>
                                    </div>
                                    <div className="form-field-wrapper">
                                        <div className="field-label-wrapper">
                                            <div className="field-label">Password*</div>
                                            <a href="#" className="text-style-link-2">Forgot your password?</a>
                                        </div>
                                        <input className="input-form w-input" maxLength="256" name="Password"
                                               data-name="Password" placeholder="Enter your password" type="password"
                                               id="Password" required=""/>
                                    </div>
                                    <div id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df4-1feb9fb7"
                                         className="w-layout-grid form-button-wrapper"><input type="submit"
                                                                                              data-wait="Please wait..."
                                                                                              id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df5-1feb9fb7"
                                                                                              className="button maxx-full-width w-button"
                                                                                              value="Submit"/>
                                        <a id="w-node-_297f275c-c970-4b99-5b1d-a5f8dee44df6-1feb9fb7" href="#"
                                           className="button is-secondary w-inline-block"><img alt="" loading="lazy"
                                                                                               src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/62438070903162192f4aee7d_google.svg"
                                                                                               className="icon-1x1-xsmall"/>
                                            <div>Sign In with Google</div>
                                        </a>
                                    </div>
                                </form>
                                <div className="success-message w-form-done">
                                    <div className="success-text">Thank you! Your submission has been received!</div>
                                </div>
                                <div className="error-message w-form-fail">
                                    <div className="error-text">Oops! Something went wrong while submitting the form.
                                    </div>
                                </div>
                                <div className="margin-top margin-small">
                                    <div className="text-align-center-2">Already have an account? <a href="#"
                                                                                                     className="text-style-link-2">Sign
                                        In</a>
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
