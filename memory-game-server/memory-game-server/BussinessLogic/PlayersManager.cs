using memory_game_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public class PlayersManager : IPlayersManager
    {
        private Dictionary<Player, int> _playersRooms;
        public PlayersManager()
        {
            _playersRooms = new Dictionary<Player, int>();
        }
        public Dictionary<Player, int> PlayersRooms { get { return _playersRooms; } set { _playersRooms = value; } }
    }
}
