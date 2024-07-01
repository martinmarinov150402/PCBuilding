import { useEffect } from "react";
import { Configuration, ConfigurationDesc } from "./components/ConfigurationDesc";
import { useAsync } from "./hooks/use-async";
import { getInfoAbout } from "./services/httpService";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "@mui/material";

export function ConfigurationsPage() {
    const configurations = useLoaderData() as Configuration[];
    const navigate = useNavigate()

    useEffect(() => {
        console.log(configurations);
    }, [configurations])
    return (
        <>
        <div className="flex flex-row">
            {(configurations ?? []).map((el, idx) => (
                <ConfigurationDesc key = {idx} configuration={el}></ConfigurationDesc> 
            ))}
        </div>

        <button className="purple accent-5 text-white font-bold w-1/6 border-indigo-500 mt-10 ml-5" onClick={() => navigate("/configurations/create")}>Create new configuration</button>
        </>
    )
}