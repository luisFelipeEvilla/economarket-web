'use client';

import SocialNetWorkButton from "@/components/buttons/SocialNetworkButton";
import PasswordField from "@/components/fields/PasswordField";
import { TextField } from "@/components/fields/TextField";
import { poppins, quicksand } from "@/fonts";
import { handleSigninWithEmail } from "@/utils/auth";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Signin() {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState(''); // [value, setValue
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            await handleSigninWithEmail(email, password);
        } catch (error) {
            console.error(error);
            toast.error('Error, usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full justify-end relative">
            <img src='/images/login-bg.jpeg' className="absolute w-full max-h-full z-[-10] object-cover" />
            <form onSubmit={handleSignin} className="flex w-full lg:w-1/2 flex-col justify-center items-center gap-6 border rounded-md py-16 xl:min-h-[800px] bg-white">
                <h1 className={`${quicksand.className} text-lg md:text-[26px] font-semibold`}>{`Inicia sesión`}</h1>

                <TextField
                    label="Correo"
                    placeholder="Ingresa tu correo aquí"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    isRequired
                />

                <PasswordField
                    label="Contraseña"
                    value={password}
                    setValue={setPassword}
                />

                <button    
                    type="submit" 
                    disabled={loading} 
                    color="success" 
                    className={`text-white ${poppins.className} text-sm md:text-base lg:text-[20px] font-medium px-14 bg-[#01CC5E] rounded-lg py-2 lg:py-3`}
                >
                    Iniciar Sesión
                </button>

                <div className="flex flex-col lg:flex-row items-center gap-2 text-sm md:text-base lg:text-lg">
                    <span className="text-inputText">{`¿Aún no tienes una cuenta?`}</span>
                    <a href="/v1/auth/signup" className="text-green-600">Registrate</a>
                </div>

                <div className="flex flex-col gap-4 justify-center items-center xl:flex-row">
                    <SocialNetWorkButton provider="google" />
                    <span className="text-[#B0BAC3] text-lg">
                        - O -
                    </span>
                    <SocialNetWorkButton provider="facebook" />
                </div>
            </form>
        </div>
    )
}