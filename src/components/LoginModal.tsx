import { Controller, useForm } from "react-hook-form"
import { Input } from "@material-tailwind/react";

export function LoginModal() {

    const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
    return (
        <div className = "w-1/3 h-96 fixed bg-zinc-700 items-center border-2 border-solid border-indigo-600 flex flex-col">
            <h1 className="text-white font text-3xl mt-5">Sign in to the site</h1>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <div className = "w-2/3 mt-6">
                        <input
                        placeholder="Username"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="text"
                        className="bg-white"
                        />
                    </div>
                  )}
                name="username"
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <div className="w-2/3">
                        <input
                        mt-5
                        placeholder="Password"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type = "password"
                        />
                    </div>
                  )}
                name="password"
            />

            <button className = "w-1/3 purple accent-5 mt-5 h-12 text-white" onClick={handleSubmit(data => console.log(data))}>Login</button>        
        </div>
    )
}