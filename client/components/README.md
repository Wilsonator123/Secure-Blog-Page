# Intro to ShadCN

With the use of the shadcn ui library, we'll be able to expediate front end development by having a set of commonly used components ready to go, as well as being able to customise them to our liking with tailwind.

Here's how to go about using it in case you find yourself making anything on the front end.


    1. First, check whether a suitable component has already been installed inside the app folder. If so you can skip to step 4.

    2. If you don't see a component that will work, head to the [ShadCN website](https://ui.shadcn.com/) and click on components. On the left you will now see a list for you to browse through and pick whatever tickles your fancy. Clicking on them will show previews of what they may look like to help you decide.

    3. Once you've decided on a component, you can follow the installation section on the page to add the code in the ui folder of the app. I'd reccommend using the CLI, as you can just input the command given (e.g. 'npx shadcn-ui@latest add accordion' to add an accordion component) and it will be there waiting for you.

    4. Next, simply go to the file you'd like to import the new component to and type the import statement at the top. It should come up when you type the component name, but in case it doesn't the path will be '@/components/ui/'. If it's not in this folder then something has gone wrong in the installation.

    5. Finally, to customise it to your liking simply add a className attribute to the element with a text value of the tailwind css shorthand you want to apply to it. For example, if you'd like to make a card element to have a blue background you would put `<Card className='bg-blue-500'/>`. Or if you wanted to center a button you can't, it's literally impossible, don't even try. For tailwind css I would recommend using this [cheatsheet](https://tailwindcomponents.com/cheatsheet/ "Tailwind Cheatsheet"), which you can have up and search for whatever property you want to apply.

And there you have it, a professional and clean looking react component done in a fraction of the time it may take to build all by yourself. Very cool.