using memory_game_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public interface IPlayersManager
    {
        Dictionary<Player, int> PlayersRooms { get; set; }
    }
}
