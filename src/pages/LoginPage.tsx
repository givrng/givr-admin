import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginProps } from "../types";
import useAuthFetch from "../hooks/useAuthFetch";
import { PageLoader } from "../icon/icons";
import { useVerifyAuth } from "../auth/AuthContext";

export function LoginPage() {
  
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<LoginProps>({
    email: "", 
    otp: ""
  });
  const [otpRequested, setOtpRequested] = useState(false)

  const auth = useVerifyAuth()
  const [isLoading, setIsloading] = useState(false)

  const {API} = useAuthFetch()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      setIsloading(true)
      await API().post("/auth/verify-otp", formFields, {withCredentials:true})
      auth?.signin()
      navigate("/verify", { replace: true });
    }finally{
      setIsloading(false)
    }
  };

  const requestOtp = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    try{
      setIsloading(true)
      await API().post("/auth/request-otp", formFields) 
      setOtpRequested(true)
    }finally{
      setIsloading(false)
    }
  }
  
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
      {isLoading && <PageLoader />}
      {!otpRequested? <form onSubmit={requestOtp} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-blue-700 ">Passwordless Sign-In</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900 text-center">Admin access</h1>
        
        <label htmlFor="token" className="mt-4 block text-xs font-medium text-slate-700">
          Organization Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formFields.email}
          onChange={(event=>{
            setFormFields(prev=>({
              ...prev, 
              email: event.target.value
            }))
          })}
          className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm"
          placeholder="joe@givr.ng"
        />

        <button type="submit" className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Request OTP
        </button>
      </form>:
       <form onSubmit={onSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mt-2 text-xl font-semibold text-slate-900 text-center">Admin access</h1>

        <p className="text-xs uppercase tracking-widest text-blue-700 ">If email is authorised, a verification code has been sent.</p>
        <label htmlFor="token" className="mt-4 block text-xs font-medium text-slate-700">
          Enter OTP sent to admin account
        </label>
        <input
          id="otp"
          type="text"
          required
          value={formFields.otp}
          onChange={(event) => setFormFields(prev=>({
            ...prev, 
            otp: event.target.value
          }))}
          className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm text-center"
          placeholder="- - - - - -"
        />

        <button type="submit" className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Login
        </button>
      </form>
      }

    </main>
  );
}
