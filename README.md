# 💻 Goche
This library was developed for API Discord that provides options and ways to work with ease. I am setting up this project just for the sake of resources for my projects. The library is free and publishes so that everyone can use it. Read the license before using it again. This is important.

## Features
- You can extend the event class. 🔥
- Request Marker and Events received / sent by Websocket are marked. 👌
- Management in Slash Command. 
- Method available for you to code free, and in control. 🎉
- Better management at Sharding 
- You can disable events that you don't want to capture
- Soon Goche will provide a personalized profile to have memory control.
- Have control in the cache
- 📦 Support for Goche-Cli (Custom and prepared Logger) [Click here](https://github.com/NavyCake/goche-cli)


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
                        'guilds'
                     ])
                     .ignoreCache([
                        'messageGuild'
                     ])

```




Ready was simple without having to add method to connect Discord API.


## Sharding
You can start shards by adding arguments in the profile ... How to do this? You must have that question in your head, right? Follow this example.
```js
const goche = new GocheLibrary('token')
                     .createProfile('sharding', 5)
                     .setIntents([
                        'guilds'
                     ])
                     .ignoreCache([
                        'messageGuild'
                     ])
```

There mentioned `sharding` is the mode that is starting within the profile and on the other side that is number is the number of shards. Bearing in mind that the Goche creates several websocket connections, a certain limit may take longer to connect. Goche has limitations when it comes to connecting to a websocket.


## Connection Listener
I am creating this part to clarify the use of the ConnectionListener which is less of a Sharding base but a Websocket map saved in Array that you can manage in each position of the Websocket. The first class that commands is the `WebsocketManager` and that creates Shards connection in `ConnectionListener`


## Configuration of Requests
Goche has a function that you can control request usage ie ... You can configure it inside the library without having to enter such a directory to modify a certain thing. Interesting isn't it, right? Let's follow this example is very simple, you can select the methods.
```js
const goche = new GocheLibrary('token')
                     .setConfigRequestBuilder(
                        new RequestControlAction()
                                          .setQueue(5) // Default is 5
                                          .setTime(1 * 1000) // This will release the requests that are stuck in the famous error 429
                                          .setIgnoreRequest() // You want this function to ignore those flooding requests
                                          .setIgnorePath(['guilds']) // Particularly this function is in beta, I'm not sure if this will work without 100%
                     )
```

It was easy, right? This will facilitate and control the use of requests without having to extend or pull the RateLimit class to find out how many are in the queue to be done, as there is a function that can work for that.



#### Library Menu
There are links in this list that you will be directed to a `README.md` that you have in each library directory.



