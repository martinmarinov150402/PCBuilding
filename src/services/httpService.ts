import { LoaderFunctionArgs } from "react-router";
import { Configuration } from "../components/ConfigurationDesc";

const server = "http://localhost:3000/"
export async function getInfoAbout(field: string) : Promise<Object[]>
{
    const response = await fetch(server + field);
    return response.json();
}

export async function getConfigurations() {
    return await getInfoAbout("configurations") as Configuration[];
}

export async function loadConfiguration({request, params}: LoaderFunctionArgs) {
    return await getInfoAbout(`configurations/${params.configurationId}`)
}