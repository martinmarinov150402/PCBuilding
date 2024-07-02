import { useState } from "react";
import { useAsync } from "./hooks/use-async";
import { Part } from "./components/ConfigurationDesc";

function PartsPage() {

    const [parts, setParts] = useState<Part[]>([]);
    useAsync(async () => {
        const response = await fetch("http://localhost:3000/api/parts")
        setParts(await response.json());
    }, [setParts])
}

export default PartsPage;