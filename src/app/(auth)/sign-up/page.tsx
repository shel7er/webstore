"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credential-validators";
import { trpc } from "@/trpc/client";

const Page = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const {data} = trpc.anyApiRoute.useQuery()
    console.log(data)

    const onSubmit = ({email, password}: TAuthCredentialsValidator) => {
      // send data to the server
      
    }


  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm">
              Already have an account?
              <Link
                className={buttonVariants({
                  variant: "link",
                  size: "xsm",
                  className: "text-blue-400",
                })}
                href="/sign-in"
              >
                Sign-in
              </Link>
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                </div>

                <Button className="bg-blue-500 hover:bg-blue-600">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
