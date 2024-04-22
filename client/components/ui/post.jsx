

export default function Post({authour, title, content, votes}){

    const posts = [ {
        "title": "post title",
        "authour": "post guy",
        "content": "this is the content of the post",
        "votes": 0,
    }]

    return (
        <div className="flex flex-col w-4/5 h-96 my-8 mx-auto">
            <hr className="bg-secondary h-1 border-0"/>
            <div className="h-1/5 w-full"><p className="text-text text-m">Post Authour</p></div>
            
            <div className="h-1/5"><p className="text-text text-2xl">Post Title</p></div>
            
            <div className="h-2/5"><p className="text-text text-m overflow-hidden">This is a very epic post wow.</p></div>
            
            <div className="h-1/5 justify-center"><p className="text-text text-m">Vote and comment buttons</p></div>
            <hr className="bg-secondary h-1 border-0"/>
        </div>
    )
}