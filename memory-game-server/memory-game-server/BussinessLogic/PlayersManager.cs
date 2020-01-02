using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public class PlayersManager : IPlayersManager
    {
        private Dictionary<string, int> _playersRooms;
        public PlayersManager()
        {
            _playersRooms = new Dictionary<string, int>();
        }
        public Dictionary<string, int> PlayersRooms { get { return _playersRooms; } set { _playersRooms = value; } }
    }
}
