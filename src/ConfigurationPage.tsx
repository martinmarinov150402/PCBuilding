import { useParams } from 'react-router';
import './MainPage.css';
import NavBar from './components/NavBar';
import { PartCard } from './components/PartCard';

export function ConfigurationPage() {

    
    return (
        <div className='bg-zinc-700 w-full h-full absolute flex flex-row'>
                
                <div className = "flex flex-col w-2/5 lg:w-1/5 h-full border-solid border-2 bodrer-white">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" className='w-2/3 mt-10 ml-3 lg:ml-16' alt=''></img>
                    <div className='text-white text-lg mt-5 p-10'>
                        <h1 className='mt-5'>Username: </h1>
                        <h1 className='mt-5'>Role: </h1>
                        <h1 className='mt-5'>Posted on: </h1>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row w-3/5 lg:w-4/5'>

                <PartCard/>
                <PartCard></PartCard>

                </div>



        </div>
    )

}