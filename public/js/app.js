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

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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

/* For production, visit https://github.com/expressjs/express and set up an account.  wpelizzoni 
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

<git add src/> to track source files or <git add .> to track everything (all source files and othe files
listed in the <git status> output)
 */