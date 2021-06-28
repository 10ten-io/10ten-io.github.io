Hello, I'm Alex and I will teach you how to quickly create your first website.

Before we start, make sure you have a [GitHub](https://github.com) account and [Visual Studio Code](https://code.visualstudio.com) installed. On Windows, you also need to install Git. Most of other Operational Systems have it by default.

**In minutes, you will create and publish your first page on the internet.**

## Create
First, let's understand what a website is in it's most basic form: an HTML file with text inside.

Open VSCode and click on <img src="assets/images/lectures/open.png" alt="Open..." width="80"/>. Use the `Open` dialog to create a folder `Dev` on your user folder, and inside it create another folder named `website`. Open it. Use the VSCode file explorer to create a file named `index.html` inside `Dev/website/`. Write `Hello, I'm Alex` on it and save. Of course, you should change by your name.

Now, open it with your browser. YAY! That's your first website.

<center><iframe src="https://giphy.com/embed/75ZaxapnyMp2w" width="240" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>source: <a href="https://giphy.com/gifs/75ZaxapnyMp2w">GIPHY</a></p></center>

Essentially, a website is an HTML file, that can be opened by browsers. Just like images can be opened by image editors, PDF files can be opened by PDF viewers, mp3 files can be opened by music players, and the list goes on. HTML files can be opened by browsers.

Let's take a minute to review our actions:

1. **Create and open a folder**
2. **Create and open a file**

It's important that you get used to this and memorize VSCode shortcuts to do it easily. As a software developer, managing files will take a huge part of your time.

On VSCode, to open something hold `control` on Linux/Windows, or `command` on OSX and press the key `o`. To toggle the file explorer, press `(ctrl or cmd) + shift + e` and release, to save current file use `(ctrl or cmd) + s`, to toggle the terminal press `` ctrl + ` `` keys. Memorize the shortcuts for the menu options you click the most!

## Publish
Problem: only you can see this file/website, because it is in your computer. To show this to your friends we will need to put it in a public machine, for example a GitHub server.

GitHub is a development platform that can store our files and serve them to the browser via `username.github.io` address. And much more that we will explore later.

To start, navigate to [GitHub.com](https://github.com), login and create a new repository to store the website files. Give it this name: `username.github.io`, changing `username` by your username in GitHub.

To send local files to GitHub we need Git, which is a terminal application shipped with OSX computers and most linux distributions. So you probably already have it, but if you don't, checkout the pre-work notes.

Git is used everyday by pretty much every developer in the world, so you better start using it. Good news is that we only need 5 commands today. You will write (or copy-paste) on a terminal running inside the same folder as `index.html`.

To open a terminal on the current folder in VSCode, open the file explorer - `(cmd or ctrl) + shift + e` - right click on current file and click on `Open in Integrated Terminal`.

Only the first time when you create a new repository, you need to open a terminal on the `index.html` folder and run:

```
git init .
```

It initializes a local Git repository. Now, change `username` by your own GitHub username and run:

```
git remote add origin git@github.com:username/username.github.io.git
```
It links a GitHub remote repository to your local repository, so that you can exchange files between. It's a common convention to call it `origin` and we will use this name when we need to push changes.

Now, every time you need to send changes to your website, you can:
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>git add index.html</td>
        <td>add files/changes to send to the remote repository</td>
    </tr>
    <tr>
        <td>git commit -m "nice description of the changes"</td>
        <td>group all changes with a nice description</td>
    </tr>
    <tr>
        <td>git push origin main</td>
        <td>push local commits to the remote <em>origin</em> on <em>main</em> branch</td>
    </tr>
</table>

<br>

If it asks for a username and password, type your GitHub username and password, and check the pre-work notes to learn how to stay authenticated with GitHub so that you don't have to type credentials every time you push changes.

Get used to those 3 commands, we will use them every day, just like every developer in the world!

If you followed those steps and didn't get any error, you should be able to see the index page on `username.github.io` after some seconds.

**Take this moment to admire your accomplishment.**

Next we will learn how to add more elements and styles to your web page...
