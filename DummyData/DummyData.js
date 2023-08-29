const hotelDummy = [
  {
    _id: "6311a54a4a642f0142349086",
    __v: 0,
    address: "Hang Da, 95 Hang Bong Street, Old Quarter, Hanoi, Vietnam",
    cheapestPrice: 150,
    city: "Ha Noi",
    desc: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in Old Quarter, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Old Quarter. Rated with 4 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.",
    distance: "10",
    featured: true,
    name: "HANOI ROYAL PALACE HOTEL 2",
    photos: [
      "https://pix8.agoda.net/hotelImages/14501735/-1/25517748837ba92fcb96c176f627d498.jpg?ce=0&s=1024x",
      "https://pix8.agoda.net/hotelImages/14501735/-1/0a77da6e3c4f95e95bd84f5dbaeb2a74.jpg?ca=11&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/14501735/-1/e76962680bcc984f7b0876da6ac5caa8.jpg?ca=11&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/14501735/-1/57474c14e32152ea509c39adaaf3f781.jpg?ca=11&ce=1&s=1024x",
    ],
    rooms: ["6310dd998cfecfd90b30ca28"],
    title: "HANOI ROYAL PALACE HOTEL 2",
    type: "hotel",
    rating: 4,
  },

  {
    _id: "6311a9c64a642f01423490bf",
    __v: 0,
    address: "Hang Dau, Hoan Kiem District, Hanoi, Vietnam",
    cheapestPrice: 600,
    city: "Ha Noi",
    desc: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in Hoan Kiem District, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Old Quarter. Rated with 4 stars, this high-quality property provides guests with access to massage, restaurant and hot tub on-site.",
    distance: "200",
    featured: true,
    name: "La Sinfonia del Rey Hotel and Spa",
    photos: [
      "https://pix8.agoda.net/hotelImages/8315970/-1/95c472f9e927d2f62293cb721818e6ad.jpg?ca=15&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/8315970/-1/70c9f415d4bbc7d2d86b492d46e5aa68.jpg?ca=10&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/8315970/-1/202714c15017a85fdcc8ab6674605f94.jpg?ca=10&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/8315970/-1/f6c5faa6f6fa8696a113fdefc0d259f8.jpg?ca=10&ce=1&s=1024x",
      "https://pix8.agoda.net/hotelImages/8315970/-1/f20208fb8f2fadcbeb9c246761aa6aab.jpg?ca=15&ce=1&s=1024x",
    ],
    rooms: [
      "6310dd998cfecfd90b30ca28",
      "6310e01a8cfecfd90b30ca30",
      "6311b2a24a642f01423490d6",
      "6311b3944a642f01423490df",
      "6311b47b4a642f01423490f4",
    ],
    title: "La Sinfonia del Rey Hotel and Spa",
    type: "hotel",
    rating: 3,
  },
  {
    _id: "6311bd07f2fce6ea18172fa3",
    __v: 0,
    address:
      "23-25 Nguyen Sieu, Hang Buom, Hoan Kiem, Old Quarter, Hanoi, Vietnam",
    cheapestPrice: 325,
    city: "Ha Noi",
    desc: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in Old Quarter, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Old Quarter. Rated with 4 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.",
    distance: "445",
    featured: false,
    name: "May De Ville Legend Hotel & Spa",
    photos: [],
    rooms: ["6311be30f2fce6ea18172fa8", "6311be52f2fce6ea18172faf"],
    title: "May De Ville Legend Hotel & Spa",
    type: "hotel",
    rating: 4,
  },
  {
    _id: "6311bf37f2fce6ea18172fb6",
    __v: 0,
    address:
      "289-291 Ly Tu Trong Street, Ben Thanh Ward, District 1, District 1, Ho Chi Minh City, Vietnam",
    cheapestPrice: 350,
    city: "Ho Chi Minh",
    desc: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in District 1, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous War Remnants Museum. Rated with 4 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.",
    distance: "640",
    featured: true,
    name: "Alagon Saigon Hotel & Spa",
    photos: [
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/342349064.jpg?k=d91e6cc100ae3214c81d7e8ebaaba95adb9b6d66b3cb491a2bacbb162ee749df&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/342349110.jpg?k=5d9ebde5a24c290fd34ae061f3c456d0978c72b1e0e9a52f4e108be8983f24f1&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/342349111.jpg?k=40e4775e81abb65403ac305f04a7dd8e5ad889f5c33151f763e4ed1af3a63e7a&o=",
    ],
    rooms: ["6311c083f2fce6ea18172fba", "6311c0a8f2fce6ea18172fc3"],
    title: "Alagon Saigon Hotel & Spa",
    type: "hotel",
    rating: 5,
  },
];

const roomDummy = [
  {
    _id: "6310dd998cfecfd90b30ca28",

    __v: 0,
    createdAt: {
      $date: "2022-09-01T16:28:09.506Z",
    },
    desc: "King size bed",
    maxPeople: 3,
    price: 200,
    roomNumbers: [101, 102],
    title: "2 Bed Room",
    updatedAt: {
      $date: "2022-09-02T06:43:27.616Z",
    },
  },
  {
    _id: "6310e01a8cfecfd90b30ca30",

    __v: 0,
    createdAt: {
      $date: "2022-09-01T16:38:50.351Z",
    },
    desc: "1 Bathroom",
    maxPeople: 2,
    price: 150,
    roomNumbers: [202],
    title: "1 Bed Room",
    updatedAt: {
      $date: "2022-09-01T16:38:50.351Z",
    },
  },
  {
    _id: "6311b2a24a642f01423490d6",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T07:37:06.178Z",
    },
    desc: "Welcome drink, Coffee & tea, Express check-in, Free Premium Wifi, Free WiFi, Drinking water",
    maxPeople: 2,
    price: 600,
    roomNumbers: [101, 102],
    title: "Basement Double Room",
    updatedAt: {
      $date: "2022-09-02T07:37:06.178Z",
    },
  },
  {
    _id: "6311b3944a642f01423490df",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T07:41:08.213Z",
    },
    desc: "Free breakfast for 2",
    maxPeople: 2,
    price: 700,
    roomNumbers: [202, 203, 205],
    title: "Superior basement room",
    updatedAt: {
      $date: "2022-09-02T07:41:08.213Z",
    },
  },
  {
    _id: "6311b47b4a642f01423490f4",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T07:44:59.829Z",
    },
    desc: "Welcome drink, Coffee & tea, Express check-in, Free Premium Wifi, Free WiFi, Drinking water",
    maxPeople: 2,
    price: 700,
    roomNumbers: [303, 403, 404],
    title: "Deluxe Room",
    updatedAt: {
      $date: "2022-09-02T07:44:59.829Z",
    },
  },
  {
    _id: "6311be30f2fce6ea18172fa8",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T08:26:24.542Z",
    },
    desc: "Welcome drink, Coffee & tea, Express check-in, Free WiFi, Drinking water, Free fitness center access",
    maxPeople: 2,
    price: 300,
    roomNumbers: [101, 102],
    title: "Deluxe Window",
    updatedAt: {
      $date: "2022-09-02T08:26:24.542Z",
    },
  },
  {
    _id: "6311be52f2fce6ea18172faf",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T08:26:58.319Z",
    },
    desc: "Extra low price! (non-refundable)",
    maxPeople: 2,
    price: 425,
    roomNumbers: [202, 203, 205],
    title: "Premier City View Room",
    updatedAt: {
      $date: "2022-09-02T08:26:58.319Z",
    },
  },
  {
    _id: "6311c083f2fce6ea18172fba",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T08:36:19.990Z",
    },
    desc: "Pay nothing until September 04, 2022",
    maxPeople: 2,
    price: 350,
    roomNumbers: [101, 102],
    title: "Budget Double Room",
    updatedAt: {
      $date: "2022-09-02T08:36:19.990Z",
    },
  },
  {
    _id: "6311c0a8f2fce6ea18172fc3",

    __v: 0,
    createdAt: {
      $date: "2022-09-02T08:36:56.388Z",
    },
    desc: "Free cancellation before September 06, 2022",
    maxPeople: 2,
    price: 350,
    roomNumbers: [202, 203, 205],
    title: "Budget Twin Room",
    updatedAt: {
      $date: "2022-09-02T08:36:56.388Z",
    },
  },
];

module.exports = {
  hotelDummy,
  roomDummy,
};
