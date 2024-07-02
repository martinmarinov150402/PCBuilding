import { Part } from "./components/ConfigurationDesc";
import { useState } from "react";
import { useAsync } from "./hooks/use-async";
import Select from 'react-select';
import { Input } from "@mui/material";

function CreateConfigurationPage() {

    const [parts, setParts] = useState<Part[]>([])

    useAsync(async() => {
        const response = await fetch("http://localhost:3000/api/parts");
        setParts(await response.json());
    }, [setParts])

    const [choice, setChoice] = useState<{label: string, value: number}[]>([]);
    const [input, setInput] = useState("");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    return (
        <>
        <form className="w-2/3 ml-5 mt-5" onSubmit={async (e) => {
            e.preventDefault();
            await fetch("http://localhost:3000/api/configuration", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    parts: choice.map(part => part.value).join(", "),
                })
            })
        }}>

            <input value = {title} onChange={el => setTitle(el.target.value)} placeholder="Title"/>
            <textarea placeholder="Description" className="mt-5 border-indigo-500" value = {description} onChange={e => setDescription(e.target.value)}></textarea>
            <Select
                isMulti
                value={choice}
                options={parts.filter(part => part.partBrand.includes(input) || part.partModel.includes(input)).map(part => ({label:part.partBrand + " " + part.partModel, value: part.id}))}
                inputValue=""
                onChange={(newVal) => setChoice(newVal.map(el => ({value: el.value, label: el.label})))}
                onInputChange={(input) => setInput(input)}
                className="mt-5"
            />

            <button type = "submit" className="mt-5 purple accent-5 w-full h-12 text-white font-bold">Добави</button>


        </form>
        </>
    );
}
export default CreateConfigurationPage;