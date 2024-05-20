import  { useNavigate} from 'react-router-dom'
export type Configuration = {
    name: string,
    parts: number[],
}
export function ConfigurationDesc({configuration} : {configuration: any}) {

    const nav = useNavigate();
    return (
    <div className = "w-1/6 border-solid border-indigo-600 ml-5 mt-5 border-2">
        <div className = "purple accent-5 w-full h-10 text-center p-1 text-white font-bold text-lg">{configuration.name}</div>
        <div className = "w-full h-44 text-center truncate text-wrap lg: text-clip items-center pt-8">{configuration.description}</div>
        <div className= "w-2/3 mb-2 text-white font-bold purple accent-5 border-solid border-indigo-600 ml-2 md: ml-4 lg:ml-12 mt-2 border-2 text-lg text-center" onClick={() => nav(`/configurations/${configuration.id}`)}>Learn More</div>
    </div>
    );
    
}