/* This is the client side javascript */
console.log ('Client side javascript file is loaded!')

/* Fetch can only be used from client side javascript.  Then is the callback function to run
when the response arrives. We call the response.json() function to parse into a javascript object. 
To test, go to the three horizontal bars in the upper right cornwe of the browser window, select
<web developer> and select <web console>.  Now click the refresh button on the browser a 
couple of times. */
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


/* get a javascript representation of the html "form" element defined in index.hbs.  This enables us to 
manipulate the element in code. */
const weatherForm = document.querySelector('form')
/* get the input element */
const search = document.querySelector('input')
/* Define a message for the message-1 placeholder in index.hbs html */
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
/* Assign a message to display in the message-1 variable */
messageOne.textContent = 'From JavaScript'

/* Set up a listener to run code when someone submits a form (i.e. fills in the location in the form 
    field).  Submit is the name of the event we are listening for. THe second parameter is the callback
    function that runs every time the event occurs. In index.hbs, make sure we run js/app.js after the 
    form is set up by the browser or an error will appear on the web console. */
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent default behavior (which is to refresh the browser) so we can see the results

    const location = search.value  // store the location input

    messageOne.textContent = 'Loading...'  // display "loading..."" on the page
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
         if (data.error) {
            messageOne.textContent = data.error
         } else {
            messageOne.textContent = data.location  // now replace "loading... on the page with weather
            messageTwo.textContent = data.forecast
            }
        })
    })

})

/* For production, visit https://github.com/expressjs/express and set up an account <wpelizzoni> 
Now go to https://www.heroku.com for the application deployment platform that enables us to 
take our application code in NODE-COURSE and deploy it on their production server. Note that
you can use Heroku for Python, Java, PHP, Ruby on Rails, Node.js. Now Google heroku cli 
for commands that can be used from the Visual Studio Code console to deploy the application. 
Look for Heroku Dev Center. Now install for your target computer.  To test, use <CTL> C to shut 
down nodemon and click the trash can icon to close the console.  To restart the console, 
click on the "Terminal" tab and click "New Terminal". 

Now we can enter heroku commands on the console including <heroku -v> to see if it installed.
If it doesn't work, try exiting Visual Studio Code and restarting it. Now enter <heroku login>
and press any key to open a new tab in the browser. Click the login button on the browser window
then close the tab and return to the Visual Studio Code console where we will see our email address.  

Heroku and GitHub needs access to the project code in order to deploy our application.  Go to 
<https://git-scm.com> to download the Git installer and execute it.  Make sure Bash options are 
clicked. Verify that Git installed correctly by entering <git --version>. New files added to Git 
are "Untracked Files". Files we want to save are moved to "Staged Changes" using the <add> command.
The <commit> moves all staged files to "Commits".  Files included in a previous commit 
that we ultimately want to include in a new commit are placed in "Unstaged Changes".  Use the 
<add> command to move "Untracked Files" and "Unstaged Changes" to "Staged Changes" prior
to the next <commit>.  

To run Git, we have to enter a command from the web-server folder (not the public folder). Enter
<git init> so that git will create a hidden .git repository.  Files not yet committed in the 
web-server folder to the left will appear in green. We can see the git repository by clicking on 
the gear icon, clicking <Settings>, and scrolling down to the Excluded files (i.e. excluded from 
the tree view to the left).  

<git status> outputs current status.  Git doesn't need to know what's in the "node-modules" directory 
because we didn't create it.  Create a .gitignore file in the web-server directory where we list
things we don';'t want git to track like node_modules.  

<git add src/> to track source files or <git add .> to track everything (all source files and other files
listed in the <git status> output).

<git commmit -m "Initial commit"> identifies committed files and changes all of them back to their 
default color to the left.  When we change a file, we see its tree structure in orange up to the 
file that was changed. <git status> will show "Changes not staged for commit".  We can enter 
<git add .> again to move the changed file to the staging area. Now we can enter 
<git commit -m "Remove unnecessary console.log call">

Change the directory and enter <git init> to set up a different repository for notes-app.  

SSH is used to communicate with another machine.  On Windows, we need to use the Git Bash terminal
application to access SSH commands. Find the git-bash .exe in C:/Program Files/Git and run it.  
This opens a Bash pop-up window. Enter <ls -a -l ~/.ssh>.  If there is no such folder or file, 
enter <ssh-keygen -t rsa -b 4096 -C "wpelizzoni@yahoo.com"> to create keys.  The keys will be
stored in the .ssh directory. Press enter to accept the default location. Press enter when
prompted for a passphrase. Press the up arrow key twice to repeat the ls command.

See the id_rsa and id_rsa.pub files.  On Windows bash enter <eval $(ssh-agent -s)> to start the agent 
and get the agent id.  Now register the key with the private file using <ssh-add ~/.ssh/id_rsa>.

Return to the browser and enter https://github.com.  Click the <+> icon and select <new repository>.
Fill in a respository name (e.g. node3-weather-website).  Use a public repository because private 
repositories cost money.  Skip other options and click <Create Repository>.  We will use the 
"push an existing repository from the command line" option which only sets up the communication
for future use. Cut the first git command and paste it into the Visual Studio Code console.  The 
first command creates a remote connection called "origin" which we can push to.  

Now select "settings" in the pull down menu on the upper right corner of the browser page.  Click on
<SSH and GPG keys>. Click <New SSH key>. Enter "Work Laptop" in the <Title>.  Return to the 
Git Bash window and enter <cat ~/.ssh/id_rsa.pub>.  Copy the long key string and paste it in the 
browser window in the "Key" area.  Now click <Add SSH Key>.  

To test the connection to the GitHub server, return to the Bash window and enter 
<ssh -T git@github.com>.  The response is 
"The authenticity of host 'github.com (192.30.255.113)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?" enter <yes> to be successfully 
authenticated.  Note that we only need to get ssh keys and configure them once.

Now we return to the respository page in the browser and paste in the second commend
<git push -u origin master> into the Visual Studio Code console.  A github window will pop 
up on the screen requesting a login to github.  After logging in, the Visual Studio Code 
console will display a "Branch 'master' set up to track remote 'master' from 'origin'" message.

Return to the browser where github is open and refresh the page to see the uploaded commits.
Click on any file to view and see who contributed it.  Note that we can track issues, set up 
a wiki to track documentation, etc.  

Now we want to set up our ssh private key with Heroku.  From Visual Studio Code enter 
<heroku keys:add>.  Answer Yes to upload the key to Heroku.  Now create the Heroku application 
on the Heroku server by entering <heroku create winton-weather-application> from the web-server folder.
Heroku returns a URL where we can view the application and another URL for the git repository where 
we push the code we want to deploy. 

We tell Heroku to run src/app.js by specifying it in the package.json script which contains
key-value pairs.  Enter <"start": "node src/app.js"> in the script.  Note that we can test the start
script locally on the Visual Studio Code console by entering the command <npm run start> and 
checking localhost:3000 on the browser.

Next we go to app.js server source code in the src folder and update the port at the bottom of 
the source code.  Define "const port = process.env.PORT || 3000" and change the listen call to 
"app.listen(port, () => {
    console.log('Server is up on port ' + port)
})"

Now go to the public directory in the client side javascript (this file). Chwenge the fetch
call to "fetch('/weather?address=' + location).then((response) => {" which will automotically
run on port 3000 if it is executing locally or on the Heroku port if executing on the server.

Now make a commit to push the code changes up to Heroku.  Enter <CTL> C on the console, enter 
git status to see the changed files, enter <git add .>, enter git commit -m "Setup app for Heroku"
 */