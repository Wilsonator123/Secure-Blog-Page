'use client'

import React, { useState, useRef } from 'react'





export default function PasswordBar({passwordStrength}) {

    const setPasswordBar = () => {

        if(passwordStrength === 0) {
            return <div>
                <div className="w-1/4 h-3 bg-passWeak"/>
            </div>

        } else if (passwordStrength === 1) {
            return <div>
                <div className="w-1/4 h-3 bg-passWeak"/>
            </div>
        } else if (passwordStrength === 2) {
            return <div>
                <div className="w-1/2 h-3 bg-passFair"/>
            </div>
        } else if (passwordStrength === 3) {
            return <div>
                <div className="w-3/4 h-3 bg-passGood"/>
            </div>
        }
        else {
            return <div>
                <div className="w-4/4 h-3 bg-passStrong"/>
            </div>
        }
    }

    const scoreToText = () => {
        switch(passwordStrength) {
            case 0:
                return "Weak";
            case 1:
                return "Weak";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Strong";
            default:
                return "Weak";
        }
    }

    return (
        <div className="flex flex-col justify-center text-sm w-3/5 text-white mb-5">
            Password Strength: {scoreToText()}
            <div className=" bg-[#b7b6b5]">{setPasswordBar()}</div>
        </div>
    )

}