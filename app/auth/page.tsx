"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
export default function Home() {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [isSignUp, setIsSignUp] = useState<boolean>(false);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const endpoint = isSignUp ? "/api/signup" : "/api/signin";
      const response = await fetch(endpoint, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
   };

   return (
      <div className="min-h-screen p-8 pb-2">
         <main className="flex justify-center">
            <div className="w-full px-2 md:px-6 py-8">
               <form
                  className="max-w-lg mx-auto"
                  onSubmit={handleSubmit}>
                  <div className="py-6">
                     <div className="flex items-center">
                        {/* Back button */}
                        <Link
                           href="/"
                           className="me-4 text-gray-500 hover:text-gray-900">
                           <span className="flex items-center space-x-2">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="size-6">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                                 />
                              </svg>
                              <span>Back</span>
                           </span>
                        </Link>
                        <h1 className="text-4xl font-bold">
                           Next.js {isSignUp ? "Sign Up" : "Login"}
                        </h1>
                     </div>
                  </div>
                  <FormInput
                     id="email"
                     label="Your email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="name@flowbite.com"
                  />
                  <FormInput
                     id="password"
                     label="Your password"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Your password"
                  />
                  <div className="flex items-start mb-5">
                     <Checkbox
                        id="remember"
                        label="Remember me"
                     />
                  </div>
                  <div className="flex justify-between">
                     <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-700 hover:text-blue-800">
                        {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
                     </button>
                     <SubmitButton />
                  </div>
               </form>
            </div>
         </main>
      </div>
   );
}

interface FormInputProps {
   id: string;
   label: string;
   type: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
}

const FormInput = ({
   id,
   label,
   type,
   value,
   onChange,
   placeholder,
}: FormInputProps) => (
   <div className="mb-5">
      <label
         htmlFor={id}
         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         {label}
      </label>
      <input
         type={type}
         id={id}
         value={value}
         onChange={onChange}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         placeholder={placeholder}
         required
      />
   </div>
);

interface CheckboxProps {
   id: string;
   label: string;
}

const Checkbox = ({ id, label }: CheckboxProps) => (
   <div className="flex items-center h-5">
      <input
         id={id}
         type="checkbox"
         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
         required
      />
      <label
         htmlFor={id}
         className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
         {label}
      </label>
   </div>
);

const SubmitButton = () => (
   <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Submit
   </button>
);
