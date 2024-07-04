import { useState } from "react";
import { Part, PartType } from "./components/ConfigurationDesc"
import { Slider } from "@mui/material";
import { useNavigate } from "react-router";

function CreatePartPage() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState<PartType>(PartType.CPU)
    const [index, setIndex] = useState(5);
    const [description, setDescription] = useState("");

    const nav = useNavigate();
    return (
        <form className="w-2/3 ml-5 p-5" onSubmit={async (e) => {
            e.preventDefault()
            await fetch("http://localhost:3000/api/part/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    partBrand: brand,
                    partModel: model,
                    partType: type,
                    partIndex: index,
                    partDescription: description,
                })
            })
            nav("/parts");
        }}>
            <input type = "text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)}></input>
            <input type = "text" placeholder="Model" value={model} onChange={e => setModel(e.target.value)}></input>
            <select value={type} onChange={e => setType(e.target.value as PartType)} className="block">
                <option value={PartType.CPU}>CPU</option>
                <option value={PartType.Case}>Case</option>
                <option value={PartType.HDD}>HDD</option>
                <option value={PartType.Motherboard}>Motherboard</option>
                <option value={PartType.PSU}>PSU</option>
                <option value={PartType.RAM}>RAM</option>
                <option value={PartType.SSD}>SSD</option>
                <option value={PartType.VideoCard}>VideoCard</option>
            </select> 
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <Slider
                aria-label="Index"
                defaultValue={5}
                value={index}
                onChange={(e, val, activeThumb) => setIndex((val as number))}
                step={0.1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
            />
            <button type="submit" className="purple accent-5 w-full h-10 text-white font-bold">Добави</button>
        </form>
    )
}
export default CreatePartPage;