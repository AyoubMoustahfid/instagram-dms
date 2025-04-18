import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"



const useZonForm = (schema: ZodSchema, mutation: UseMutateFunction, defaultValue?: any) => {
    const {register, formState: {errors}, handleSubmit, watch, reset} = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValue
        }
    })

    const onFormSubmit = handleSubmit(async (values) => mutation({...values}))
    return {
        register,
        errors,
        onFormSubmit,
        watch,
        reset
    }
}

export default useZonForm