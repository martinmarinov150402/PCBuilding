import { Part } from "./ConfigurationDesc";

export function PartCard({part} : {part:Part}){

    return (
        <div className = 'w-4/5 lg:w-1/5 h-1/3 white border-2 border-solid border-indigo-600 ml-5 mt-5'>
            Brand: {part.partBrand}
            <br/>
            Model: {part.partModel}
            <br/>
            Description: {part.partDescription}
            <br/>
            Index: {part.partIndex} / 10
        </div>
    )
}
