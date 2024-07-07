import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, AutocompleteItem, Autocomplete, Select, SelectItem, Spinner } from "@nextui-org/react";
import { FrontArrowIcon } from "../../components/icons/FrontArrowIcon.jsx";
import makeRequest from '../../api/useApi.js';
import axios from 'axios';
import { BackArrowIcon } from '../../components/icons/BackArrowIcon.jsx';

const UserDetailsForm = ({ setPageNo }) => {
    // const email = useSelector((state) => state.user.email);
    // const fullName = useSelector((state) => state.user.name);

    // const email = localStorage.getItem('email');
    // const fullName = localStorage.getItem('fullName');

    const isMounted = useRef(true);
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        sex: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        phoneNumber: '',
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        if (!isMounted.current) return;
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
            if (!response.data.error) {
                setCountries(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
        } finally {
            setLoadingCountries(false);
        }
    };

    const handleCountryChange = (countryName) => {

        handleChange('country', countryName);
        const selectedCountry = countries.find(country => country.name === countryName);
        if (selectedCountry) {
            setStates(selectedCountry.states);
        } else {
            setStates([]);
        }
    };

    const handleChange = (name, value) => {
        setUserDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // console.log("changed", value)
    };

    const handleUserDetailSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await makeRequest('post', 'saveDeatils/1', userDetails);
            setPageNo((prevPageNo) => prevPageNo + 1)
            // console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneNo = (event) => {
        const { value } = event.target;
        let formattedNumber = value.replace(/[^\d]/g, '');
        if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
        } else if (formattedNumber.length > 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
        }
        setUserDetails((prevData) => ({
            ...prevData,
            phoneNumber: formattedNumber,
        }));
    };

    const gender = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ]

    return (

        <div>
            <div className="flex gap-2 mt-2">
                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
            </div>
            <small>3 remaining to complete</small>
            {/* <p className="mt-2 text-center text-lg leading-8 text-gray-600">Please provide your contact information</p> */}
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Personal Information</h2>
            <form onSubmit={handleUserDetailSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="First Name"
                            aria-label="First Name"
                            placeholder="Enter your First Name"
                            onChange={(e) => handleChange('firstName', e.target.value)}
                        />
                        <Input
                            type="text"
                            label="Last Name"
                            aria-label="Last Name"
                            placeholder="Enter your Last Name"
                            onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                        {/* <Autocomplete
                            allowsCustomValue
                            label="First Name"
                            aria-label="First Name"
                            defaultItems={fullName ? [fullName.split(' ')[0]] : []}
                            placeholder="Enter your First Name"
                            className="custom-autocomplete-field"
                            onInputChange={(value) => handleChange('firstName', value)}
                        >
                            {fullName && fullName.split(' ')[0] && <AutocompleteItem>{fullName.split(' ')[0]}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            allowsCustomValue
                            label="Last Name"
                            aria-label="Last Name"
                            defaultItems={fullName ? [fullName.split(' ').slice(1).join(' ')] : []}
                            placeholder="Enter your Last Name"
                            className="custom-autocomplete-field"
                            onInputChange={(value) => handleChange('lastName', value)}
                        >
                            {fullName && fullName.split(' ').slice(1).join(' ') && <AutocompleteItem>{fullName.split(' ').slice(1).join(' ')}</AutocompleteItem>}
                        </Autocomplete> */}
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Email"
                            aria-label="Email"
                            placeholder="Enter your Email"
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        {/* <Autocomplete
                            allowsCustomValue
                            label="Email"
                            aria-label="Email"
                            defaultItems={email ? [email] : []}
                            placeholder="Enter your Email"
                            className="custom-autocomplete-field"
                            onInputChange={(value) => handleChange('email', value)}
                        >
                            {email && <AutocompleteItem>{email}</AutocompleteItem>}
                        </Autocomplete> */}
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Select
                            label="Sex"
                            placeholder="Select your Sex"
                            onSelectionChange={(value) => handleChange('sex', value.currentKey)}
                            aria-label="Sex"
                        >
                            {gender.map((gender) => (
                                <SelectItem key={gender.value} value={gender.value}>
                                    {gender.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Address"
                            aria-label="Address"
                            placeholder="Enter your Address"
                            onChange={(e) => handleChange('addressLine1', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Address Line 2"
                            aria-label="Address Line 2"
                            placeholder="Enter your Address Line 2"
                            onChange={(e) => handleChange('addressLine2', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Select
                            label="Country"
                            placeholder="Select your Country"
                            onChange={(e) => handleCountryChange(e.target.value.split('-')[0])}
                            aria-label="Country"
                        >
                            {loadingCountries ? (
                                <SelectItem disabled key="loading" value="loading">
                                    Loading countries...
                                </SelectItem>
                            ) : (
                                countries.map((country, index) => (
                                    <SelectItem key={`${country.name}-${index}`} value={country.name}>
                                        {country.name}
                                    </SelectItem>
                                ))
                            )}
                        </Select>
                        <Select
                            label="State"
                            placeholder="Select your State"
                            onChange={(e) => handleChange('state', e.target.value.split('-')[0])}
                            isDisabled={!userDetails.country}
                            aria-label="State"
                        >
                            {
                                userDetails.country ? (
                                    states.length ? (
                                        states.map((state, index) => (
                                            <SelectItem key={`${state.name}-${index}`} value={state.name}>
                                                {state.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem disabled key="no-states" value="no-states">
                                            No states available
                                        </SelectItem>
                                    )
                                ) : (
                                    <SelectItem disabled key="select-country" value="select-country">
                                        Select Country
                                    </SelectItem>
                                )}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            clearable
                            bordered
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            aria-label="Phone Number"
                            value={userDetails.phoneNumber}
                            onChange={handlePhoneNo}
                            type="tel"
                            status={userDetails.phoneNumber.length === 12 ? 'success' : 'default'}
                        />
                    </div>
                    <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                        <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 2); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            <BackArrowIcon />
                        </button>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            {isLoading ? (
                                <>
                                    <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                </>
                            ) : "Save and Continue"} </button>
                        {/* <button type="button" onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                            <FrontArrowIcon />
                        </button> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserDetailsForm;