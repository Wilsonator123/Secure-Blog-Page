Hello team UG02
Let make some beautiful code, but before that lets not piss anyone off!

## Run the Code

You need to run both server and client in separate consoles

### Server

```shell
cd ./server
npm run dev
```

### Client

```shell
cd ./client
npm run dev
```

### If I Can Be Bothered

```shell
npm run dev
```

I can make the script run both client and server

------

## Merging Work

You cannot merge with `main`. You must create a branch work on that branch and submit a `pull request`. `Pull requests` must be approved by 1 other person (this is an enforced rule). Because none of us wants to read your stupid ass code, it will take a while and so you can do 3 things:
1. Start a new ticket by making a new branch off `main` or your current branch
2. Spam message people to check your work
3. Wait patiently

## Branches

Usually you would make one branch with all your work on it… **DONT**. Try to make one branch per task. Obvs if you are building an entire webpage then you can just name your branch `login-Page`. But don't start doing multiple issue on one branch. If you switch tasks you can do one of two things: Commit your work (a local save) or stash the changes (stores locally) you can then change branch -> if you want to check people work then you'll need this.
You should commit often and push rarely (unless you need to transfer between pc and laptop). Commit often means that when reviewing we can easily see the changes made and revert any if needed.

### Don't Change Peoples code/change Peoples Branches unless You Ask

## Pull Request messages/Commit Messages

Try to use readable messages so we can understand what the fuck your code means because we won't be able to read it, obvs. My amazing tip is to use Markdown. AKA use `- [ ]` tags to checkboxes or just `-` and bullet point your changes. This is especially important in the Pull Request section because we need to read your code -> You may want to include what the changes are/What we now expect to happen/Images of the changes (if frontend)/How can we test the changes

## Error Handling

- Read the error properly
- If you have a Git Desktop Error its your fault!!
- If you get an error when committing files (it could say some shit about binary files) its probably because the server/database is running
- Use axios or fetch to avoid CORS errors
- If you still get CORS errors add a content-type to the header
- `npm i` if you get any errors (it may just be you don't have the libraries)
