

# GocheLibrary
This class can be extended and works with event listeners without having to use `events` which is a library and has other options that you can manage the shards and servers, users within them without having to do a labor cost to set up a structure code to send server from shard 4 to shard 1. There are profiles that are easy to work with, which are currently two that are being worked on and the light is on hand to be finished as quickly as possible.


### Listeners Events
We are going to extend a class and set up a listener base so that you can get events from the Websocket.

`listeners/MessageListener.js`
```js
module.exports = class MessageListener extends OnGuildMessageEvent {
    async on(message = new Message()) {
        ...code
    }   
}
```





You will pull a method called `addListener` that is in the `listenerManager` class with it you will receive events from the websocket.
`index.js`
```js
const goche = new GocheLibrary('token')
                     .createProfile()
                     .setIntents([
                        
                     ])
                     .ignoreCache([
                        'messageGuild'
                     ])

goche.listenerManager
   .addListener(new MessageListener())
```
