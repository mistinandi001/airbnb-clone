'use client';

import axios from "axios";
import {useState,useEffect,useCallback} from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { FieldValues,  SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../Inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";



const RegisterModel=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const registerModal=useRegisterModal();

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose();
            toast.success('Successfully registered!',{
                icon:'☺️'
            })
        })
        .catch((error)=>{
            toast.error('Something went wrong...',{
                icon:'🤷‍♀️'
            });
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
    const bodyContent=(
        <div>
            <Heading
              title='Welcome to Airbnb'
              subtitle='Create an account'
              
             />
             <Input 
              id={"email"}
              label={"Email"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"username"}
              label={"Username"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"password"}
              label={"Password"} 
              type='password'
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
        </div>
    )
    const footerContent=(
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
              outline
              label="Continue with Google"
              icon={FcGoogle}
              onClick={()=>{}} 
            />
            <Button
              outline
              label="Continue with Github"
              icon={AiFillGithub}
              onClick={()=>{}} 
            />
            <div className="
             text-neutral-500
             text-center
             mt-4
             font-light
            ">
                <div className="
                  justify-center
                  flex
                  flex-row
                  items-center
                  gap-2
                ">
                    <div>
                      Already have an account?
                    </div>
                    <div
                      onClick={registerModal.onClose}
                      className="
                      text-neutral-800
                      cursor-pointer
                      hover:underline
                    ">
                       Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
          <Modal
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                isOpen={registerModal.isOpen}
                actionLabel={"Continue"}
                disabled={isLoading}
                title='Register'   
                body={bodyContent}     
                footer={footerContent}    
          />
        </div>
    )
}

export default RegisterModel;