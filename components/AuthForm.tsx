"use client";

import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";
// import { log } from "console";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(values);
        if (newUser) {
          setUser(newUser);
          console.log("user", user);
        }
      }

      if (type === "sign-in") {
        // const response = await signIn({
        //   email: values.email,
        //   password: values.password,
        // });
        // if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" cursor-pointer flex gap-1 items-center">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900 ">
            {user
              ? "Link Account "
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details to continue"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"First Name"}
                      name={"firstName"}
                      placeholder={"Enter your first name"}
                    />

                    <CustomInput
                      control={form.control}
                      label={"Last Name"}
                      name={"lastName"}
                      placeholder={"Enter your last name"}
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    label={"Address"}
                    name={"address1"}
                    placeholder={"Enter your specific address"}
                  />
                  <CustomInput
                    control={form.control}
                    label={"City"}
                    name={"city"}
                    placeholder={"Enter your  city"}
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"State"}
                      name={"state"}
                      placeholder={"Example: NY"}
                    />

                    <CustomInput
                      control={form.control}
                      label={"Postal Code"}
                      name={"postalCode"}
                      placeholder={"Example: 11101"}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"Date of Brith"}
                      name={"dateOfBirth"}
                      placeholder={"YYYY-MM-DD"}
                    />

                    <CustomInput
                      control={form.control}
                      label={"SSN"}
                      name={"ssn"}
                      placeholder={"Exmaple : 1234"}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                label={"Email"}
                name={"email"}
                placeholder={"Enter your email"}
              />
              <CustomInput
                control={form.control}
                label={"Password"}
                name={"password"}
                placeholder={"Enter your password"}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-up" ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
