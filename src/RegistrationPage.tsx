import { Button, Input } from '@mui/material';
import react, { useState } from 'react'



async function registerUser(username: string, password: string, firstName: string, lastName: string) {
    console.log(username, password, firstName, lastName, JSON.stringify({
            username,
            password,
            firstName,
            lastName,
        }));
    
    await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
        })
    })
}
function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <div className = "flex w-full h-full justify-center items-center ">
            <form className="flex flex-col w-1/3 mt-10" onSubmit={e => {e.preventDefault(); registerUser(username, password, firstName, lastName)}}>
                <Input value = {username} onChange = {data => setUsername(data.target.value)} placeholder='Username'></Input>
                <Input value = {password} onChange = {data => setPassword(data.target.value)} type='password' placeholder='Password'></Input>
                <Input value = {firstName} onChange = {data => setFirstName(data.target.value)} placeholder='First name'></Input>
                <Input value = {lastName} onChange = {data => setLastName(data.target.value)} placeholder='Last name'></Input>
                <Button type='submit' className='purple accent-5 text-white' style={{textTransform: 'none' }}>Register</Button>
            </form>
        </div>
    )
}

export default RegistrationPage;