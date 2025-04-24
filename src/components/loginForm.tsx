/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Form, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginScheme, RegisterScheme } from "@/schemas";
import { Label } from "./ui/label";
import { useId } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const CustomInput = ({ field, isRegister }: { field :any, isRegister: boolean }) => {
    const id = useId();

    return (
        <div className="group relative">
            <Label htmlFor={id} className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus</div>-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-primary has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-primary" >
                <span className="inline-flex bg-background px-2">
                    {field.name.replaceAll("_", " ")}
                    {isRegister && !(field.name === 'Company_Name') &&
                        <span className="text-red-600">*</span>
                    }
                </span>
            </Label>
            <Input className="h-10 rounded-md" placeholder="" {...field} type={field.name} id={id} required />
        </div>
    )
}


const LoginForm = ({ title, desc, button, formData, isRegister }: {
    title: string,
    desc?: string,
    button: string,
    isRegister: boolean
    formData: { type: keyof z.infer<typeof RegisterScheme> }[],
}) => {


    const router = useRouter();
    type FormSchema = typeof RegisterScheme | typeof LoginScheme;
    const schema = isRegister ? RegisterScheme : LoginScheme;

    const form = useForm<z.infer<FormSchema>>({
        resolver: zodResolver(schema),
        defaultValues: isRegister
            ? {
                Email_Address: '',
                Password: '',
                Full_Name: '',
                Phone_No: '',
                Company_Name: "",
                isAgency: "No",
            }
            : {
                Email_Address: '',
                Password: '',
            }
    })

    const handleSubmit = (values: z.infer<FormSchema>) => {
        console.log(values)
        const response = localStorage.getItem("user");
        const existingUser = JSON.parse(response as string)
        if(isRegister){
            if(existingUser){
                toast.error("User already Exists")
                router.push("/login")
            }
            localStorage.setItem("user", JSON.stringify(values))
            router.push("/login")
            toast.success("Account Created Successfully")
        }else{
            if(existingUser.Email_Address === values.Email_Address && existingUser.Password === values.Password){
                toast.success("Login Successful")
                router.push("/user")
            }
        }
    }

    return (
        <div className="border border-gray-300 h-full p-5 py-8">
            <div className="h-fit">
                <h1 className="font-bold text-3xl w-60">{title}</h1>
                {!isRegister &&
                    <p className="w-64 text-muted-foreground mt-3 text-base font-normal">{desc}</p>
                }
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="mt-8 flex flex-col gap-5">
                        {formData.map((data, idx) => (
                            <FormField key={idx} name={data.type as keyof z.infer<typeof RegisterScheme>} control={form.control} render={({ field }) => (
                                <FormItem>
                                    <CustomInput isRegister={isRegister} field={field} />
                                </FormItem>
                            )} />
                        ))}
                        {isRegister && (
                            <FormField name="isAgency" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                        Are you an Agency?<span className="text-red-600">*</span>
                                    </FormLabel>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <div className="flex gap-2 text-xs mt-2">
                                            <div className="flex justify-center items-center gap-2 ">
                                                <RadioGroupItem value="Yes" >Yes</RadioGroupItem>
                                                <div>Yes</div>
                                            </div>
                                            <div className="flex justify-center items-center gap-2 ">
                                                <RadioGroupItem value="No" >No</RadioGroupItem>
                                                <div>No</div>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </FormItem>
                            )} />
                        )}
                    </div>
                    <div className={ isRegister ? "mt-36" : ''}>
                        <Button type="submit"  className={"w-full h-10 mt-4 hover:cursor-pointer"}>
                            {button}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm

