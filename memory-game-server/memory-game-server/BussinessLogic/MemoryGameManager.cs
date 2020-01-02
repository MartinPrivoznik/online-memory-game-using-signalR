using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace memory_game_server.BussinessLogic
{
    public class MemoryGameManager : IMemoryGameManager
    {
        private int _numOfRooms;
        private int _countInRoom;

        public MemoryGameManager()
        {
            _numOfRooms = 0;
            _countInRoom = 0;
        }
        public int NumOfRooms { get => _numOfRooms; set => _numOfRooms = value; }
        public int CountInRoom { get => _countInRoom; set => _countInRoom = value; }
    }
}
