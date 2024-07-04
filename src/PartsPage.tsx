import { useState } from "react";
import { useAsync } from "./hooks/use-async";
import { Part } from "./components/ConfigurationDesc";
import { PartCard } from "./components/PartCard";
import { useNavigate } from "react-router";
import { User, UserRole } from "./User";

function PartsPage() {

    const nav = useNavigate();

    const [parts, setParts] = useState<Part[]>([]);
    const [profile, setProfile] = useState<User>();
    useAsync(async () => {
        const response = await fetch("http://localhost:3000/api/parts")
        setParts(await response.json());
    }, [setParts])

    useAsync(async () => {
        const response = await fetch("http://localhost:3000/api/profile", {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
        })
        setProfile(await response.json());
    }, [setProfile])
    console.log(profile);
    return (
        <>
            <div className = "flex flex-row">
                {parts.map(part => (<PartCard part={part}/>))}
            </div>
            {profile?.role !== UserRole.User && (<button className="w-2/3 h-10 purple accent-5 mt-5 text-white font-bold" onClick={e => nav("/parts/create")}>Add part</button>)}
        </>
    );
}

export default PartsPage;