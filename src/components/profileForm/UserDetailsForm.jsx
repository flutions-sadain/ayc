import React, { useEffect, useState } from 'react';
import { Button, Input, Select, SelectItem, Spinner, Textarea } from '@nextui-org/react';
import countryStateData from '../../data/countryStateData';


const UserDetailsForm = ({ userDetailsData: initialUserDetails, onSave, onChange, isLoading }) => {
    const [userDetailsData, setUserDetailsData] = useState(initialUserDetails);
    const [originalUserDetails, setOriginalUserDetails] = useState(initialUserDetails);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const data = countryStateData?.data;
            setCountries(data);
            const selectedCountry = data.find(country => country.name === userDetailsData.country);
            if (selectedCountry) {
                setStates(selectedCountry.states);
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
        } finally {
            setLoadingCountries(false);
        }
    };

    const handleChange = (name, value) => {
        const updatedDetails = {
            ...userDetailsData,
            [name]: value,
        };
        setUserDetailsData(updatedDetails);
        onChange(updatedDetails);
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

    const handlePhoneNo = (event) => {
        const { value } = event.target;
        let formattedNumber = value.replace(/[^\d]/g, '');
        if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
        } else if (formattedNumber.length > 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
        }
        handleChange('phone', formattedNumber);
    };

    const handleCancel = () => {
        setUserDetailsData(originalUserDetails);
    };

    const gender = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
            <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                        type="text"
                        label="Full Name"
                        aria-label="Full Name"
                        placeholder="Enter your Full Name"
                        labelPlacement="outside"
                        value={userDetailsData?.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                        label="Gender Identity"
                        placeholder="Select your Gender Identity"
                        labelPlacement="outside"
                        selectedKeys={[userDetailsData?.gender]}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        aria-label="Gender"
                    >
                        {gender?.map((gender) => (
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
                        labelPlacement="outside"
                        value={userDetailsData?.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                        label="Country"
                        placeholder="Select your Country"
                        labelPlacement="outside"
                        selectedKeys={[userDetailsData?.country]}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        aria-label="Country"
                    >
                        {loadingCountries ? (
                            <SelectItem disabled key="loading" value="loading">
                                Loading countries...
                            </SelectItem>
                        ) : (
                            countries?.map((country) => (
                                <SelectItem key={country.name} value={country.name}>
                                    {country.name}
                                </SelectItem>
                            ))
                        )}
                    </Select>
                    <Select
                        label="State"
                        placeholder="Select your State"
                        labelPlacement="outside"
                        selectedKeys={[userDetailsData?.state]}
                        onChange={(e) => handleChange('state', e.target.value)}
                        isDisabled={!userDetailsData?.country}
                        aria-label="State"
                    >
                        {
                            userDetailsData?.country ? (
                                states?.length ? (
                                    states?.map((state) => (
                                        <SelectItem key={state.name} value={state.name}>
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
                        placeholder="999-999-9999"
                        aria-label="Phone Number"
                        labelPlacement="outside"
                        value={userDetailsData?.phone}
                        onChange={handlePhoneNo}
                        type="tel"
                        status={userDetailsData?.phone.length === 12 ? 'success' : 'default'}
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Textarea label="Summary" aria-label="Summary" labelPlacement="outside" placeholder="Summary" value={userDetailsData?.summary} onChange={(e) => handleChange('summary', e.target.value)} />
                </div>
                <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
                    <Button color="secondary" variant="light" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color="primary" variant="solid" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                            </>
                        ) : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserDetailsForm;


// import React, { useEffect, useRef, useState } from 'react';
// import { Button, Input, Select, SelectItem, Spinner, Textarea } from '@nextui-org/react';
// import makeRequest from '../../api/useApi';
// import countryStateData from '../../data/countryStateData';

// const UserDetailsForm = ({ userDetailsData: initialUserDetails }) => {
//     const [userDetailsData, setUserDetails] = useState(initialUserDetails);
//     const [tempUserDetails, setTempUserDetails] = useState(initialUserDetails);
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [loadingCountries, setLoadingCountries] = useState(true);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         fetchCountries();
//     }, []);

//     const fetchCountries = async () => {
//         try {
//             const data = countryStateData?.data;
//             setCountries(data);
//             const selectedCountry = data.find(country => country.name === userDetailsData.country);
//             if (selectedCountry) {
//                 setStates(selectedCountry.states);
//             }
//             console.log('Countries fetched:', data);
//             console.log('Selected country:', selectedCountry);
//         } catch (error) {
//             console.error('Error fetching country data:', error);
//         } finally {
//             setLoadingCountries(false);
//         }
//     };

//     const handleCountryChange = (countryName) => {
//         handleChange('country', countryName);
//         const selectedCountry = countries.find(country => country.name === countryName);
//         if (selectedCountry) {
//             setStates(selectedCountry.states);
//         } else {
//             setStates([]);
//         }
//     };

//     const handleChange = (name, value) => {
//         setUserDetails((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleUserDetailSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             setIsLoading(true);
//             const response = await makeRequest('post', 'saveDetails/1', userDetailsData);
//             console.log('Response:', response);
//             setTempUserDetails(userDetailsData);
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePhoneNo = (event) => {
//         const { value } = event.target;
//         let formattedNumber = value.replace(/[^\d]/g, '');
//         if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
//             formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
//         } else if (formattedNumber.length > 6) {
//             formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
//         }
//         setUserDetails((prevData) => ({
//             ...prevData,
//             phone: formattedNumber,
//         }));
//     };

//     const handleCancel = () => {
//         setUserDetails(tempUserDetails);
//     };

//     const gender = [
//         { label: "Male", value: "Male" },
//         { label: "Female", value: "Female" },
//         { label: "Other", value: "Other" },
//     ];

//     return (
//         <form onSubmit={handleUserDetailSubmit}>
//             <div className="flex flex-col gap-4">
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="Full Name"
//                         aria-label="Full Name"
//                         placeholder="Enter your Full Name"
//                         labelPlacement="outside"
//                         value={userDetailsData?.fullName}
//                         onChange={(e) => handleChange('fullName', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Select
//                         label="Gender Identity"
//                         placeholder="Select your Gender Identity"
//                         labelPlacement="outside"
//                         selectedKeys={[userDetailsData?.gender]}
//                         onChange={(e) => handleChange('gender', e.target.value)}
//                         aria-label="Gender"
//                     >
//                         {gender?.map((gender) => (
//                             <SelectItem key={gender.value} value={gender.value}>
//                                 {gender.label}
//                             </SelectItem>
//                         ))}
//                     </Select>
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="Address"
//                         aria-label="Address"
//                         placeholder="Enter your Address"
//                         labelPlacement="outside"
//                         value={userDetailsData?.address}
//                         onChange={(e) => handleChange('address', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Select
//                         label="Country"
//                         placeholder="Select your Country"
//                         labelPlacement="outside"
//                         selectedKeys={[userDetailsData?.country]}
//                         onChange={(e) => handleCountryChange(e.target.value)}
//                         aria-label="Country"
//                     >
//                         {loadingCountries ? (
//                             <SelectItem disabled key="loading" value="loading">
//                                 Loading countries...
//                             </SelectItem>
//                         ) : (
//                             countries?.map((country) => (
//                                 <SelectItem key={country.name} value={country.name}>
//                                     {country.name}
//                                 </SelectItem>
//                             ))
//                         )}
//                     </Select>
//                     <Select
//                         label="State"
//                         placeholder="Select your State"
//                         labelPlacement="outside"
//                         selectedKeys={[userDetailsData?.state]}
//                         onChange={(e) => handleChange('state', e.target.value)}
//                         isDisabled={!userDetailsData?.country}
//                         aria-label="State"
//                     >
//                         {
//                             userDetailsData?.country ? (
//                                 states?.length ? (
//                                     states?.map((state) => (
//                                         <SelectItem key={state.name} value={state.name}>
//                                             {state.name}
//                                         </SelectItem>
//                                     ))
//                                 ) : (
//                                     <SelectItem disabled key="no-states" value="no-states">
//                                         No states available
//                                     </SelectItem>
//                                 )
//                             ) : (
//                                 <SelectItem disabled key="select-country" value="select-country">
//                                     Select Country
//                                 </SelectItem>
//                             )}
//                     </Select>
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         clearable
//                         bordered
//                         label="Phone Number"
//                         placeholder="999-999-9999"
//                         aria-label="Phone Number"
//                         labelPlacement="outside"
//                         value={userDetailsData?.phone}
//                         onChange={handlePhoneNo}
//                         type="tel"
//                         status={userDetailsData?.phone.length === 12 ? 'success' : 'default'}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Textarea label="Summary" aria-label="Summary" labelPlacement="outside" placeholder="Summary" value={userDetailsData?.summary} onChange={(e) => handleChange('summary', e.target.value)} />
//                 </div>
//                 <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
//                     <Button color="secondary" variant="light" onClick={handleCancel}>
//                         Cancel
//                     </Button>
//                     <Button color="primary" variant="solid" type="submit">
//                         {isLoading ? (
//                             <>
//                                 <Spinner className="pr-2" color="current" size="sm" /> Submitting...
//                             </>
//                         ) : "Save"}
//                     </Button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default UserDetailsForm;
