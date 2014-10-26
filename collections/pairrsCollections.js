var pairrsCollections = [
  {
    "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
    "name" : "Cities of Europe",
    "folder" : "pairrsColl_CitiesOfEurope",
    "cover" : "0_cover.png",
    "backside" : "0_backside.png",
    "images" : [
      { "id" : 1, "file" : "1_ancient.jpg" },
      { "id" : 2, "file" : "2_beach.jpg" },
      { "id" : 3, "file" : "3_bike.jpg" },
      { "id" : 4, "file" : "4_building.jpg" },
      { "id" : 5, "file" : "5_cars.jpg" },
      { "id" : 6, "file" : "6_colmar.jpg" },
      { "id" : 7, "file" : "7_dawn.jpg" },
      { "id" : 8, "file" : "8_east.jpg" },
      { "id" : 9, "file" : "9_gracht.jpg" },
      { "id" : 10, "file" : "10_harbor.jpg" },
      { "id" : 11, "file" : "11_milano.jpg" },
      { "id" : 12, "file" : "12_riga.jpg" },
      { "id" : 13, "file" : "13_square.jpg" },
      { "id" : 14, "file" : "14_station.jpg" },
      { "id" : 15, "file" : "15_steine.jpg" }
    ]
  },
  {
    "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
    "name" : "My Images",
    "folder" : "pairrsColl_MyImages",
    "cover" : "0_cover.png",
    "backside" : "0_backside.png",
    "images" : [
      { "id" : 1, "file" : "1_ancient.jpg" },
      { "id" : 2, "file" : "2_beach.jpg" },
      { "id" : 3, "file" : "3_bike.jpg" },
      { "id" : 4, "file" : "4_building.jpg" },
      { "id" : 5, "file" : "5_cars.jpg" },
      { "id" : 6, "file" : "6_colmar.jpg" },
      { "id" : 7, "file" : "7_dawn.jpg" },
      { "id" : 8, "file" : "8_east.jpg" },
      { "id" : 9, "file" : "9_gracht.jpg" },
      { "id" : 10, "file" : "10_harbor.jpg" },
      { "id" : 11, "file" : "11_milano.jpg" },
      { "id" : 12, "file" : "12_riga.jpg" },
      { "id" : 13, "file" : "13_square.jpg" },
      { "id" : 14, "file" : "14_station.jpg" },
      { "id" : 15, "file" : "15_steine.jpg" }
    ]
  },
  {
    "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
    "name" : "All My Friends",
    "folder" : "pairrsColl_AllMyFriends",
    "cover" : "0_cover.png",
    "backside" : "0_backside.png",
    "images" : [
      { "id" : 1, "file" : "1_ancient.jpg" },
      { "id" : 2, "file" : "2_beach.jpg" },
      { "id" : 3, "file" : "3_bike.jpg" },
      { "id" : 4, "file" : "4_building.jpg" },
      { "id" : 5, "file" : "5_cars.jpg" },
      { "id" : 6, "file" : "6_colmar.jpg" },
      { "id" : 7, "file" : "7_dawn.jpg" },
      { "id" : 8, "file" : "8_east.jpg" },
      { "id" : 9, "file" : "9_gracht.jpg" },
      { "id" : 10, "file" : "10_harbor.jpg" },
      { "id" : 11, "file" : "11_milano.jpg" },
      { "id" : 12, "file" : "12_riga.jpg" },
      { "id" : 13, "file" : "13_square.jpg" },
      { "id" : 14, "file" : "14_station.jpg" },
      { "id" : 15, "file" : "15_steine.jpg" }
    ]
  },
  {
    "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
    "name" : "Cars",
    "folder" : "pairrsColl_Cars",
    "cover" : "0_cover.png",
    "backside" : "0_backside.png",
    "images" : [
      { "id" : 1, "file" : "1_ancient.jpg" },
      { "id" : 2, "file" : "2_beach.jpg" },
      { "id" : 3, "file" : "3_bike.jpg" },
      { "id" : 4, "file" : "4_building.jpg" },
      { "id" : 5, "file" : "5_cars.jpg" },
      { "id" : 6, "file" : "6_colmar.jpg" },
      { "id" : 7, "file" : "7_dawn.jpg" },
      { "id" : 8, "file" : "8_east.jpg" },
      { "id" : 9, "file" : "9_gracht.jpg" },
      { "id" : 10, "file" : "10_harbor.jpg" },
      { "id" : 11, "file" : "11_milano.jpg" },
      { "id" : 12, "file" : "12_riga.jpg" },
      { "id" : 13, "file" : "13_square.jpg" },
      { "id" : 14, "file" : "14_station.jpg" },
      { "id" : 15, "file" : "15_steine.jpg" }
    ]
  }
]

/*
 * Loops through the collections and assigns an id identical with the collection objects position in the array
 * @param {arr} the pairrsCollections array containing all collection objects
 * @return {arr} the updated pairrscollections array
 */
pairrsCollections_populateId = function(pairrsCollections) {
  for(var i = 0; i < pairrsCollections.length; i++) {
    pairrsCollections[i].id = i;
  }
  return pairrsCollections;
}
// call to update the id's of the individual collections
pairrsCollections = pairrsCollections_populateId(pairrsCollections);