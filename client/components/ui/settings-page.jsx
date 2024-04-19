import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import UserPFP from '@/components/ui/user-pfp';
import Mail from '@/assets/mail.svg';
import { Button } from "@/components/ui/button";
import PasswordPin from '@/assets/passwordpin.svg';
import DeleteAccount from '@/assets/deleteaccount.svg';
import Placeholder from '@/assets/placeholder.svg';
import Close from '@/assets/close.svg';
import Logout from '@/assets/logout.svg';

export default function SettingsPage({toggle}) {
    
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Card className="bg-primary border-accent mt-8">

        <CardHeader className="flex relative items-center justify-center w-full">
          <CardTitle className="text-4xl text-text mt-10">Settings</CardTitle>

            {/* Close Button */}
          <Button variant="outline" onClick={toggle} className="absolute right-14 top-10 bg-primary border-secondary rounded-full p-0.5">
            <Close fill="#ffff" width={30} height={30} />
          </Button>

        </CardHeader>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardContent className="flex flex-col items-center w-full px-20 py-10">

          {/* Icons and Buttons Grid */}
          <div className="grid grid-cols-3 gap-16">

            {/* UserPFP Icon */}
            <div className="flex flex-col items-center space-y-5">
              <UserPFP className="w-24 h-24" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Change PFP
              </Button>
            </div>

            {/* Mail Icon */}
            <div className="flex flex-col items-center space-y-6">
              <Mail className="w-24 h-24" fill="#ffffff" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Change Email
              </Button>
            </div>

            {/* Password Icon */}
            <div className="flex flex-col items-center space-y-6">
              <PasswordPin className="w-24 h-24" fill="#ffffff" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Change Password
              </Button>
            </div>

            {/* Placeholder Icon */}
            <div className="flex flex-col items-center space-y-6">
              <Placeholder className="w-24 h-24" fill="#ffffff" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Placeholder
              </Button>
            </div>

            {/* Placeholder Icon */}
            <div className="flex flex-col items-center space-y-6">
              <Placeholder className="w-24 h-24" fill="#ffffff" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Placeholder
              </Button>
            </div>

            {/* Account Deletion Icon */}
            <div className="flex flex-col items-center space-y-6">
              <DeleteAccount className="w-24 h-24" fill="#ffffff" />
              <Button variant='secondary' className="bg-secondary text-text text-xl hover:border hover:border-accent">
                Delete Account
              </Button>
            </div>
            
          </div>
        </CardContent>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        {/* Log out Button */}
        <CardFooter className="flex flex-col items-center space-y-4 mb-10">
            <div className="flex justify-center items-center">
                <Button variant='destructive' className="h-12 text-text text-xl w-96 mt-10
                hover:border hover:border-accent "><Logout fill = {'#ffff'}/>Sign In</Button>
            </div>
        </CardFooter>
      </Card>
    </main>
  );
}