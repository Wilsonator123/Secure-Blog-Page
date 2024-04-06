import Google from '@/assets/google.svg'
import Apple from '@/assets/apple.svg'
import { Button } from './button'


export default function Oauth(){
    return(
        <div className="flex justify-center items-center space-x-4">
              <Button variant="outline" className="w-full h-full">
                <Google/>
              </Button>
              <Button variant="outline" className="w-full h-full">
                <Apple fill={'#fff'}/>
              </Button>
            </div>
    )
}