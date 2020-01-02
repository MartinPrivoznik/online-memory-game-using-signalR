using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public interface IPlayersManager
    {
        Dictionary<string, int> PlayersRooms { get; set; }
    }
}
