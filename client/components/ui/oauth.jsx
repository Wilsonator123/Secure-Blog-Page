import Google from '@/assets/google.svg'
import Apple from '@/assets/apple.svg'
import { Button } from './button'


export default function Oauth(){
    return(
        <div className="flex justify-center items-center space-x-4">
              <Button variant="background" className="w-full h-full rounded-full border-none">
                <Google/>
              </Button>
              <Button variant="background" className="w-full h-full rounded-full border-none">
                <Apple fill={'#fff'} />
              </Button>
            </div>
    )
}