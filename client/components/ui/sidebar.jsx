import { Command, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"

export default function Sidebar() {

    return(
        <Command className="flex min-h-screen w-1/5 bg-primary border border-secondary">
            <CommandList>
                <CommandGroup>
                    <CommandItem className="text-text text-xl justify-center h-16">Home</CommandItem>
                    <CommandItem className="text-text text-xl justify-center h-16">Popular</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}