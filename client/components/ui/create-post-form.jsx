import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

  

export default function CreatePostForm(){


    return(
        <Card className="w-full bg-primary border-secondary mt-8 ">
            <CardContent className="flex  w-7/8 mx-auto">
                <form className="relative flex flex-col justify-center w-full items-center">
                <div className="relative flex flex-col w-full justify-center items-center pb-6">
                    <Input className="my-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    placeholder="Title" />
                </div>
                </form>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center space-y-4 mb-32">
        </CardFooter>
        </Card>
    )
}