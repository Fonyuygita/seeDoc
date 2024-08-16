"use client"

import { UserFormValidation } from '@/lib/validation';
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl } from '../ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { createUser } from '@/lib/actions/patient.actions';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import FileUploader from '../FileUploader';

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
                    <h1 className="mb-12 space-y-4 text-5xl text-white">Welcome Back 👋</h1>
                    <p className="text-dark-700">Please provide us with the following information about yourself</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Your personal Info</h2>
                    </div>


                    {/*  YOUR NAME */}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        label="Full names"
                        placeholder="Fonyuy Gita"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt='user'
                    />

                    {/*  YOUR EMAIL AND PHONE */}
                    <div className="flex flex-col gap-6 xl:flex-row">

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
                    </div>

                    {/* Birth date and gender */}

                    <div className="flex flex-col gap-6 xl:flex-row">


                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="DateBirth"
                            label="Date of Birth"

                        />

                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option, i) => (
                                            <div key={option + i} className="radio-group">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>


                    {/* Address & Occupation */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="14 street, New york, NY - 5101"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder=" Software Engineer"
                        />
                    </div>

                    {/* Emergency Contact Name & Emergency Contact Number */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="Guardian's name"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.PHONE_NUMBER}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency contact number"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                </section>

                <section className="space-y-8">
                    <div className="mb-9 space-y-3">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary care physician"
                        placeholder="Select a physician"
                    >
                        {Doctors.map((doctor, i) => (
                            <SelectItem key={doctor.name + i} value={doctor.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt="doctor"
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    {/*  INSURANCE & POLICY NUMBER */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="insuranceProvider"
                            label="Insurance provider"
                            placeholder="BlueCross BlueShield"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ABC123456789"
                        />
                    </div>

                    {/*  ALLERGY & CURRENT MEDICATIONS */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="Peanuts, Penicillin, Pollen"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="currentMedication"
                            label="Current medications"
                            placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
                        />
                    </div>
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="familyMedicalHistory"
                            label=" Family medical history (if relevant)"
                            placeholder="Mother had brain cancer, Father has hypertension"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
                        />

                    </div>

                </section>

                <section className="space-y-6 ">
                    <div className="mb-9 space-y-1 mt-[3rem]">
                        <h2 className="sub-header">Identification and Verfication</h2>
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select identification type"
                    >
                        {IdentificationTypes.map((type, i) => (
                            <SelectItem key={type + i} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="123456789"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned Copy of Identification Document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />

                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to receive treatment for my health condition."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I consent to the use and disclosure of my health
            information for treatment purposes."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I acknowledge that I have reviewed and agree to the
            privacy policy"
                    />
                </section>

                <SubmitButton
                    isLoading={isLoading}
                >Start Now</SubmitButton>


            </form>
        </Form>
    )
}

export default ClientForm
