# Slash Commands
This folder was created especially for Slash Command. Of course, you will not need to create another WebSocket connection to receive only Slash Command events. You may be wondering ... "Why create a separate folder?" This folder is a higher development and with different classes just so as not to end up getting disorganized. And to get a sense of what you are implementing.

## Command Manager
You can manage the commands that are created within the Discord API. Remembering you need to read the documentation on how this works.

## How will I return the slash command?
You will receive events through SlashReceiveEvents, through which you can return a text channel and server and the User. When hooking ... I mean, you send a message to this command and you will receive an event exchange which is `OnGuildMessageEvent`.

## Stay on Alert
Be very careful when making several requests for Slash Commands (Update the list of commands). The caches can for a long time to update the Discord Client.

