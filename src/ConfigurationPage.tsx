import { useLoaderData, useParams } from 'react-router';
import './MainPage.css';
import NavBar from './components/NavBar';
import { PartCard } from './components/PartCard';
import { Configuration } from './components/ConfigurationDesc';
import { useAsync } from './hooks/use-async';
import { User } from './User';
import { useState } from 'react';
import { config } from 'process';

export function ConfigurationPage() {

    const configuration = useLoaderData() as Configuration;
    console.log("Petur", configuration);

    const [author, setAuthor] = useState<User>();

    
    useAsync(async () => {
        const response = await fetch(`http://localhost:3000/api/users/${configuration.authorId}`);
        setAuthor(await response.json());
    }, [])

    
    return (
        <div className='bg-zinc-700 w-full h-full absolute flex flex-row'>
                
                <div className = "flex flex-col w-2/5 lg:w-1/5 h-full border-solid border-2 bodrer-white">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" className='w-2/3 mt-10 ml-3 lg:ml-16' alt=''></img>
                    <div className='text-white text-lg mt-5 p-10'>
                        <h1 className='mt-5'>Username: {author?.username}</h1>
                        <h1 className='mt-5'>Role: {author?.role} </h1>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row w-3/5 lg:w-4/5'>

                {configuration.parts.map(part => (<PartCard part={part}></PartCard>))}

                </div>



        </div>
    )

}