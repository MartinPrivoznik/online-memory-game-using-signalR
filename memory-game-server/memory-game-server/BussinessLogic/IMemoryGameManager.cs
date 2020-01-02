using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public interface IMemoryGameManager
    {
        public int NumOfRooms { get; set; }
        public int CountInRoom { get; set; }
    }
}
