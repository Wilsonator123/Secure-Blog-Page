import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from "./select";


export default function FilterSelect({}) {

    return (
        <Select className="">
            <SelectTrigger className="w-24 ml-16 my-4 rounded-full bg-primary border-secondary text-gray-400">
                <SelectValue placeholder="Filters"></SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-primary text-gray-400 border-secondary">
                <SelectItem value="filter 1">Filter 1</SelectItem>
                <SelectItem value="filter 2">Filter 2</SelectItem>
                <SelectItem value="filter 3">Filter 3</SelectItem>
            </SelectContent>
        </Select>
    )
}