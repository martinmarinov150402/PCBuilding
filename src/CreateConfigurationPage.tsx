import { Part } from "./components/ConfigurationDesc";
import { useState } from "react";
import { useAsync } from "./hooks/use-async";
import Select from 'react-select';

function CreateConfigurationPage() {

    const [parts, setParts] = useState<Part[]>([])

    useAsync(async() => {
        const response = await fetch("http://localhost:3000/api/parts");
        setParts(await response.json());
    }, [setParts])

    const [choice, setChoice] = useState<number[]>([]);
    const [input, setInput] = useState("");

    return (
        <>
        <form>
            <Select
                isMulti
                value={[] as {label: string, value: number}[]}
                options={parts.filter(part => part.partBrand.includes(input) || part.partModel.includes(input)).map(part => ({label:part.partBrand + " " + part.partModel, value: part.id}))}
                inputValue=""
                onChange={(newVal) => setChoice(newVal.map(v => v.value))}
                onInputChange={(input) => setInput(input)}
            />

        </form>
        </>
    );
}
export default CreateConfigurationPage;