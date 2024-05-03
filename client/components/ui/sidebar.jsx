'use client'

import { Command, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"
import { HomeIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export default function Sidebar() {

    const router = useRouter();

    function clickHome(){
        router.push('/home')
    }

    return(
        <Command className="flex min-h-screen w-1/5 bg-primary border border-secondary ">
            <CommandList>
                <CommandGroup className="mt-6">
                    <CommandItem className=" text-text text-2xl h-16 " 
                    onSelect={clickHome}><HomeIcon className='mx-2 text-text' width={30} height={30} />Home</CommandItem>
                    <CommandItem className="text-text text-2xl h-16"><StarFilledIcon className='mx-2' width={30} height={30}/>Popular</CommandItem>
                </CommandGroup>
                <hr className="w-11/12 mx-auto border-gray-400 "></hr>
            </CommandList>
        </Command>
    )
}

