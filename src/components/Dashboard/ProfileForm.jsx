import React, { useState } from 'react';
import profileImg1 from '../../assets/images/profile-form-1.png';
import profileImg2 from '../../assets/images/profile-form-2.png';
import profileImg3 from '../../assets/images/profile-form-3.png';
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const ProfileForm = () => {
  const navigate = useNavigate();

  const submit = () => {
      navigate("/newAssessment");
  };

    return (
        <div>
            <Header />
            <section class="overflow-hidden bg-[#dbfe01]">
                <div class="py-16 sm:px-6 lg:relative lg:px-0 lg:py-5">
                    <div class="xl:mx-64 items-center px-4 xl:px-12">
                        <div class="relative z-10">

                            <div class="relative">
                                <p class="inline text-black font-light text-4xl tracking-tight">Hey! <span className="font-medium">Khizer</span></p>
                                <p class="mt-3 text-2xl font-light text-black">Welcome to AYC, your first step in creating impact</p>
                            </div>
                            <div className="lg:mx-32 mt-5">
                                <div className="mb-0" >
                                    <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-black">
                                        <li className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                                            <img className='w-full max-sm:w-14' src={profileImg1} alt="profileImg1" />
                                        </li>

                                        <li className="flex items-center gap-2 ">
                                            <img className='w-full max-sm:w-14' src={profileImg2} alt="profileImg2" />
                                        </li>

                                        <li className="flex items-center gap-2 -mr-8 max-sm:-mr-3">
                                            <img className='w-full max-sm:w-14' src={profileImg3} alt="profileImg3" />

                                        </li>
                                    </ol>
                                </div>
                                <div className="mt-2 mb-0">
                                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-white" >
                                        <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-white">
                                            <li className="flex items-center gap-2 ">
                                                <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold"> 1 </span>
                                            </li>

                                            <li className="flex items-center gap-2 ">
                                                <span className="size-6 rounded-full bg-white text-center text-[10px]/6 font-bold text-black" > 2 </span>
                                            </li>

                                            <li className="flex items-center gap-2 ">
                                                <span className="size-6 rounded-full bg-white text-center text-[10px]/6 font-bold text-black"> 3 </span>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="mb-0" >
                                    <ol className="relative z-10 pl-0 flex justify-between text-base font-medium text-black">
                                        <li className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                                            <span className="hidden sm:block"> Complete Profile </span>
                                        </li>

                                        <li className="flex items-center gap-2 ">
                                            <span className="hidden sm:block"> MCQ Test </span>
                                        </li>

                                        <li className="flex items-center gap-2 -mr-8 max-sm:-mr-3">
                                            <span className="hidden sm:block"> Course Enroll </span>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="overflow-hidden">
                <div class="py-16 sm:px-4 lg:relative lg:px-0 lg:py-5">
                    <div class="xl:mx-64 items-center px-4 xl:px-12">
                        <div class="relative z-10">

                            <div class="relative">
                                <p class="mt-3 text-2xl font-light text-black">Tell us more, so that we can find the <span className="font-medium">right curriculum & Mentor for you</span></p>
                            </div>
                            <div className="lg:mx-20 mt-5">
                                <form onSubmit={submit}>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="Employer" className="leading-7 text-lg text-black">
                                                Current Employer <span className="text-red-600">*</span>
                                            </label>
                                            <select id="Employer" name="Current Employer" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 text-base outline-none text-gray-700 py-2.5 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                                <option value="">Choose</option>
                                                <option value="1">Current Employer</option>
                                                <option value="2">Current Employer</option>
                                                <option value="3">Current Employer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="role" className="leading-7 text-lg text-black">
                                                Current Role <span className="text-red-600">*</span>
                                            </label>
                                            <select id="role" name="Current Role" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 text-base outline-none text-gray-700 py-2.5 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                                <option value="">Choose</option>
                                                <option value="1">Current Role</option>
                                                <option value="2">Current Role</option>
                                                <option value="3">Current Role</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="ctc" className="leading-7 text-lg text-black" >
                                                Current CTC (in Lakhs) <span className="text-red-600">*</span>
                                            </label>
                                            <input type="text" placeholder='0.0' id="ctc" name="ctc" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="college" className="leading-7 text-lg text-black" >
                                                College <span className="text-red-600">*</span>
                                            </label>
                                            <input type="text" placeholder='Enter Your College Name' id="college" name="college" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="message" className="leading-7 text-lg text-black" >
                                                Message
                                            </label>
                                            <textarea id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" ></textarea>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full mt-2 mb-4">
                                        {/* <button className="cancel text-[#EC7A48]">Cancel</button> */}
                                        <button type="submit" className="bg-[#dbfe01] text-black border-none rounded px-4 py-2 gap-3">
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileForm