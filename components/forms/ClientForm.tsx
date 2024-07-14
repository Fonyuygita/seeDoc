"use client"

import { UserFormValidation } from '@/lib/validation';
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { createUser } from '@/lib/actions/patient.actions';
import { useRouter } from 'next/navigation';

const ClientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        }
    });

    const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const userData = {
                name,
                email,
                phone
            };
            const newUser = await createUser(userData);
            console.log(newUser)

            if (newUser) {
                router.push(`/patient/${newUser?.$id}/register`)
            }
        } catch (err) {
            // \catch errors if any
            console.log(err);
            // router.push(`/patient/${newUser.$id}/register`)


        }

        setIsLoading(false)



    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-6'>
                <section className="mb-12 space-y-4">
                    <h1 className="mb-12 space-y-4 text-5xl text-white">Hello Clients  💚</h1>
                    <p className="text-dark-700">Get started with appointment</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full names"
                    placeholder="Fonyuy Gita"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt='user'
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="gita@email.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt='email'
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_NUMBER}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="(+237) 123-466"

                />
                <SubmitButton
                    isLoading={isLoading}
                >Start Now</SubmitButton>


            </form>
        </Form>
    )
}

export default ClientForm
