import { useEffect } from "react";
import { Configuration, ConfigurationDesc } from "./components/ConfigurationDesc";
import { useAsync } from "./hooks/use-async";
import { getInfoAbout } from "./services/httpService";
import { useLoaderData } from "react-router";

export function ConfigurationsPage() {
    const configurations = useLoaderData() as Configuration[];

    useEffect(() => {
        console.log(configurations);
    }, [configurations])
    return (
        <>
        {(configurations ?? []).map((el, idx) => (
            <ConfigurationDesc key = {idx} configuration={el}></ConfigurationDesc> 
        ))}
        </>
    )
}