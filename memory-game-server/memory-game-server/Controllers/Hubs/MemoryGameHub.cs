using memory_game_server.BussinessLogic;
using memory_game_server.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.Controllers.Hubs
{
    public class MemoryGameHub : Hub
    {
        private readonly IMemoryGameManager _memoryGameManager;
        private readonly IPlayersManager _playersManager;

        public MemoryGameHub(IMemoryGameManager memoryGameManager, IPlayersManager playersManager)
        {
            _memoryGameManager = memoryGameManager;
            _playersManager = playersManager;
        }

        public Task<string> JoinRoom()
        {
            return Task.Run(() =>
            {
                int playerNum;
                //Dynamically allocate number of rooms
                if (_memoryGameManager.CountInRoom == 2)
                {
                    playerNum = 1;
                    _memoryGameManager.CountInRoom = 1;
                    _memoryGameManager.NumOfRooms++;
                    Groups.AddToGroupAsync(Context.ConnectionId, _memoryGameManager.NumOfRooms.ToString());
                }
                else
                {
                    playerNum = 2;
                    _memoryGameManager.CountInRoom++;
                    Groups.AddToGroupAsync(Context.ConnectionId, _memoryGameManager.NumOfRooms.ToString());
                }
                _playersManager.PlayersRooms.Add(new Player { ID = Context.ConnectionId, PlayerNumber = playerNum}, _memoryGameManager.NumOfRooms);
                return _memoryGameManager.NumOfRooms.ToString();
            });          
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }

        public Task<int> TurnCard(string roomName, string index)
        {
            return Task.Run(() =>
            {
            try
            {
                Clients.Group(roomName).SendAsync("TurnCard", index);
                return int.Parse(index);
            }
            catch
            {
                return int.Parse(index);
            }
            });
        }

        public Task<bool> TurnBackAll(string roomName)
        {
            return Task.Run(() =>
            {
                try
                {
                    Clients.Group(roomName).SendAsync("TurnBackAll");
                    return true;
                }
                catch
                {
                    return false;
                }
            });
        }

        public Task<int> GetRoom()
        {
            return Task.Run(() => 
            { return _playersManager.PlayersRooms
                .Where(user => user.Key.ID == Context.ConnectionId)
                //Key as User, value as room number
                .FirstOrDefault().Value; });
        }

        public Task<int> GetPlayerNum()
        {
            return Task.Run(() =>
            {
                return _playersManager.PlayersRooms
                  .Where(user => user.Key.ID == Context.ConnectionId)
                  .FirstOrDefault().Key.PlayerNumber;
            });
        }
    }
}
