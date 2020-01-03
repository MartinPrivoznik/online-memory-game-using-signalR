# online-memory-game-using-signalR
 - Simple browser multiplayer game with React/Redux on client side and ASP.NET Core server
 - Game is realtime (SignalR technology is used for sending data by WEB Sockets)
 - This game is a simple school project
 
 ### About the game
 - It is the simpliest memory game
 - Two players turn on client side app (There is no loading, co first player can play before second one joins the room)
 - They see board of cards turned upside down
 - It's players one turn, so p1 can turn 2 cards
 - If value on cards is the same, then they will dissapear after passing turn to another player, else just turn is passed
 - Players are free to play until there are cards on board
 
 ### How to start
 - First of all open the terminal and navigate to server app (/online-memory-game-using-signalR/memory-game-server/memory-game-server/) and type `dotnet run` => this will run the server on your IP address on port :5001
 - Now open client and navigate to memory-game-client/src/js/model/index.js, go on line 43-44 and change IP address to server IPv4
 ```javascript
    const connection =  new signalR.HubConnectionBuilder()
       // .withUrl("http://192.168.0.108:5001/memorygamehub") -- Uncomment and change address to your IPv4 if running server by 'dotnet run'
       .withUrl("https://localhost:44301/memorygamehub") // -- If debug mode, change just port you are using
       .configureLogging(signalR.LogLevel.Information)
       .build();
```
 - Open terminal, navigate to the folder with client side app (/online-memory-game-using-signalR/memory-game-client/) and type `npm start` (Node package must be installed)
 - Feel free to connect and enjoy the game ;)
 
 ### FYI
 - React/Redux uses Flux design pattern
 - C# stores player and player room data in IOC container (RAM) and is using IRepository design pattern
