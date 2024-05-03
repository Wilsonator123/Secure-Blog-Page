'use client'

import { Button } from "@/components/ui/button"
import PostList from "@/components/ui/post-list";
import { Select } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Feather from '@/assets/feather.svg';
import { PlusIcon } from "@radix-ui/react-icons";
import FilterSelect from "@/components/ui/filter-select";



export default function Home() {
    

    /*const posts = [ {id: 1, title: "Testing", content: "Testing 1 2 3", votes: 0},
    {id: 2, title: "Bitcoin, more like SHITcoin", content: "See title lmao", votes: -50},
    {id: 3, title: "KEEP HOLD OF YOUR GAMESTOP STONKS", content: "TO THE MOOOOON", votes: 10000} ];*/   
    const router = useRouter();
    
    function handleClick(e)
    {
        e.preventDefault();
        router.push('/home/create');
    }

    return (
        <div className="flex flex-col h-max w-4/5 ">
            <div className="w-4/5">
                <FilterSelect />
            </div>
            <Button variant="outline" onClick={handleClick} className="flex flex-row my-4 w-4/6 h-16 justify-start bg-primary
             hover:bg-secondary border-border border-secondary mx-auto text-3xl text-left text-gray-400 rounded-none"
             ><Feather className="mr-2" width={50} height={40} />Create a post<PlusIcon className="ml-auto" width={40} height={30}/></Button>
            <div className="flex flex-col w-4/5 mx-auto">
                <PostList />
            </div>     
              
        </div>
        
    );
}



