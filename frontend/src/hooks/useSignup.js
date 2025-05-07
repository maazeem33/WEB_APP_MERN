import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading,setLoading]= useState(false);
    const {setAuthUser}=useAuthContext();
    const signup=async({fullName,userName,password,confirmPassword,gender})=>{
        const success=handleInputErrors({fullName,userName,password,confirmPassword,gender})
        if(!success) return;

        setLoading(true);
        try {
            const res= await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
            });
            let data; // Declare data outside the if-else block
            try {
                data = await res.json();
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
                toast.error("Failed to parse server response.");
                return; // Exit the function if JSON parsing fails
            }

            if (res.ok) {
                // Signup was successful
                toast.success("Signup successful!");
                // Optionally, you can redirect the user or update the UI
            } else {
                // Signup failed, display the error message from the backend
                toast.error(data?.message || "Signup failed. Please try again.");
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    };

    return{loading,signup};
};

export default useSignup;

function handleInputErrors({fullName,userName,password,confirmPassword,gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("please fill all the fields");
        return false;
    }
    if(password!==confirmPassword){
        toast.error('passwords do not match');
        return false;
    }
    if(password.length<6){
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}