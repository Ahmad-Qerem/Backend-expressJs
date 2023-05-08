class Hotel {
  Address;
  NumberOfRooms;
  #minFloor;
  #maxFloor;
  rooms = [];
  constructor(address, numberOfRooms, minFloor, maxFloor) {
    this.Address = address;
    this.NumberOfRooms = numberOfRooms;
    this.#minFloor = minFloor;
    this.#maxFloor = maxFloor;
  }

  addRoom(Room) {
    this.rooms.push(Room);
  }
  removeRoom(RoomId) {}
  printAdvertisement() {
    const str1 = `| Room Number \t | Floor Number  | Price \t| Booked \t |`;
    const dashes ="---------------------------------------------------------------------"; 
    console.log(dashes);
    console.log(str1);
    console.log(dashes);
    this.rooms.map((room) => {
      room.printRoom();
    });
    console.log(dashes);
  }
  listBookedRooms() {}
}
class Room {
  FloorNum;
  RoomNum;
  Price;
  #isBooked = false;
  constructor(floorNum, roomNum, price) {
    this.FloorNum = floorNum;
    this.RoomNum = roomNum;
    this.Price = price;
  }

  printRoom() {
    const str2 = `| ${this.RoomNum} \t\t | ${this.FloorNum} \t\t | ${this.Price} \t| ${this.isBooked} \t |`;
    console.log(str2);
  }
  set isBooked(value) {
    this.#isBooked = value;
  }
  get isBooked() {
    return this.#isBooked;
  }
}

class RoomWithView extends Room {
  View = "";
  NumberOfBeds = 0;

  constructor({ floorNum, roomNum, price, data }) {
    super(floorNum, roomNum, price);
    this.View = data.view;
    this.NumberOfBeds = data.numberOfBeds;
  }
}

class SleepingRoom extends Room {
  PersonCapacity = 0;
  constructor({ floorNum, roomNum, price, data }) {
    super(floorNum, roomNum, price);
    this.PersonCapacity = data.personCapacity;
  }
}

const data = [
  {
    id: 1,
    floorNum: 1,
    roomNum: 100,
    price: "$50",
    type: "SleepingRoom",
    data: {
      PersonCapacity: 2,
    },
  },
  {
    id: 2,
    floorNum: 1,
    roomNum: 101,
    price: "$100",
    type: "SleepingRoom",
    data: {
      PersonCapacity: 4,
    },
  },
  {
    id: 3,
    floorNum: 2,
    roomNum: 200,
    price: "$120",
    type: "SleepingRoom",
    data: {
      PersonCapacity: 3,
    },
  },
  {
    id: 4,
    floorNum: 2,
    roomNum: 201,
    price: "$30",
    type: "SleepingRoom",
    data: {
      PersonCapacity: 1,
    },
  },
  {
    id: 5,
    floorNum: 3,
    roomNum: 300,
    price: "$99",
    type: "SleepingRoom",
    data: {
      PersonCapacity: 3,
    },
  },
  {
    id: 6,
    floorNum: 3,
    roomNum: 301,
    price: "$200",
    type: "RoomWithView",
    data: {
      View: "jenin",
      NumberOfBeds: 2,
    },
  },
];

let hotel = new Hotel("jenin", 6, 1, 3);

data.map((room) => {
  let newRoom = null;
  if (room.type == "SleepingRoom") {
    newRoom = new SleepingRoom({ ...room });
  } else {
    newRoom = new RoomWithView({ ...room });
  }
  hotel.addRoom(newRoom);
});
hotel.printAdvertisement();
