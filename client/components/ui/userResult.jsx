import React from 'react';
import { Card, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation';

export default function UserResult({ user }) {
  const router = useRouter();

  const handleSearchResultClick = () => {
    router.push(`/account/${user.username}`);
  };

  return (

    <Card className="bg-primary w-6/6 max-h-96 my-1 mx-auto rounded-2xl border-secondary cursor-pointer"
      onClick={handleSearchResultClick}>
      <CardHeader className="p-2 text-text text-md flex flex-row">
        <div className='flex justify-between w-full text-white font-semibold'>
          <div>{user.username}</div>
        </div>
      </CardHeader>
    </Card>

  );
}