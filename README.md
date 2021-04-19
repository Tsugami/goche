# Goche
This library was developed for API Discord that provides options and ways to work with ease. I am setting up this project just for the sake of resources for my projects. The library is free and publishes so that everyone can use it. Read the license before using it again. This is important.


## How does the library work?
When the bot starts, it loads the entire cache before starting the Websocket connection to Discord so far this has not been implemented as it has a list that is pre-developed. And to complete there is a light profile that will soon be ready to save less the cache instead of staying forever.


## Discord
Discord API documentation needs to be read before starting to get your hands dirty in the library. Before we start, see the Discord documents.


##   Support
This library is not an official Discord package however it may not have enough support to give it to you. So you need to go through the entire library and the documentation you have in the folders to understand the library a little better. This library there are no mysteries are almost the same functions as other library written in Javascript


#### Let's start playing with the library
As the library is under development you will need to select the first profile which is `createProfile()` It will allow the library to connect to Discord to make the bot go online!

```js
const GocheLibrary = require('GocheLibrary');

const goche = new GocheLibrary('token')
                     .createProfile()
                     .setIntents([
                        
                     ])
                     .ignoreCache([
                        'messageGuild'
                     ])

```




Ready was simple without having to add method to connect Discord API.


#### Library Menu
There are links in this list that you will be directed to a `README.md` that you have in each library directory.



