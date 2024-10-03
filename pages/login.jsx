import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { ArrowRight, LayoutGrid, AlignJustify } from 'lucide-react';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
export default function loin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful
            ////console.log('Username:', username);
            // //console.log('Password:', password);

            const res = await signIn("credentials", {
                email: username,
                password: password,
                redirect: false,
            });
            //console.log(res);


            if (res?.error) {
                
                alert("Something Went Wrong! Invalid Email or Password")
                setError("error");
                setRedirectToHome(false);
            } else {

                // alert on successful registration
                alert("Login Succesful!")
                // Set state to trigger redirection
                setRedirectToHome(true);
            }

            // Simulate successful login
            // alert("Login Successful!");


        } else {
            setErrors(errors);
        }
    };


    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate username (email)
        if (!username.trim()) {
            errors.username = 'Username (email) is required';
        } else if (!emailRegex.test(username)) {
            errors.username = 'Please enter a valid email address';
        }

        // Validate password
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    useEffect(() => {
        if (redirectToHome) {
            // Redirect to home page after successful login
            window.location.href = '/'; // Replace with your desired URL
        }
    }, [redirectToHome]);
    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="favicon.ico" alt="logo" />
                        English Buddy
                    </a>
                    <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your Admin Dashboard
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="name@gmail.com" required="" value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && <p className="text-red-500">{errors.username}</p>}
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" required="" value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 :text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline :text-primary-500">Forgot password?</a> */}
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 :text-gray-400">
                                    {/* Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline :text-primary-500">Sign up</a> */}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}