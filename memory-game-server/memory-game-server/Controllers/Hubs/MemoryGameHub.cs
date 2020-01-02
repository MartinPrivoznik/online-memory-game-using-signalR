using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.Controllers.Hubs
{
    public class MemoryGameHub : Hub
    {
        public Task JoinRoom(string roomName)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            return Clients.Group(roomName).SendAsync(Context.User.Identity.Name + " joined.");
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }

        public Task TurnCard(string roomName, string index)
        {
            return Clients.Group(roomName).SendAsync(index);
        }

    }
}
