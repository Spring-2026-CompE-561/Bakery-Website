"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field,FieldError, FieldGroup,FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Define the validation schema using Zod as used by Professor's code, with some adjustments
const formSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(4, "Password must be at least 4 characters.")
        .max(20, "Password must be at most 20 characters."), // Increased max for security
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const res = await fetch("http://127.0.0.1:8000/api/v1/user/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: data.email,
                password: data.password,
            }).toString(),
        });

        if (!res.ok) {
            const errorData = await res.json();
            toast.error("Login failed: " + (errorData?.detail || "Check your credentials"));
            return;
        }

        const returnedData = await res.json();
        
        // Store the token using preferred key
        localStorage.setItem("access_token", returnedData.access_token);

        toast.success("Welcome back!", {
            description: "Accessing the bakery dashboard...",
            position: "bottom-right",
        });

        queryClient.clear();
        // Redirect to the Admin Dashboard instead of the home page
        router.push("/admin/dashboard");
        return returnedData;
    }

    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card className="border-primary/20 shadow-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
                    <CardDescription>
                        Manage your neighborhood bakery orders and inventory.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-login"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-signin-email">Admin Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-signin-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="admin@bakery.com"
                                            autoComplete="email"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-signin-password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-signin-password"
                                            aria-invalid={fieldState.invalid}
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => form.reset()}
                            >
                                Clear
                            </Button>
                            <Button
                                type="submit"
                                form="form-login"
                                className="flex-1"
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}