import { Button, Input } from '@mui/material';
import react from 'react'

function RegistrationPage() {

    return (
        <div className = "flex w-full h-full justify-center items-center ">
            <form className="flex flex-col w-1/3 mt-10 ">
                <Input placeholder='Username'></Input>
                <Input type='password' placeholder='Password'></Input>
                <Input placeholder='First name'></Input>
                <Input placeholder='Last name'></Input>
                <Button className='purple accent-5 text-white' style={{textTransform: 'none' }}>Register</Button>
            </form>
        </div>
    )
}

export default RegistrationPage;