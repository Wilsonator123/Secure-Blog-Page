import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function UserPFP({className}) {

        
    return (
        <div className="flex flex-row items-center w-full justify-center">
            <Avatar className= {`${className}`}>
                <AvatarImage src=""/>
                <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
        </div>
    );
}