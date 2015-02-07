/* Array containing all the card decks to play with */
var pairrsCollections = {

  // array of all available cardDecks
  cardDecks : [
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Ancient Cars",
      "folder" : "pairrsColl_Ancars",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_yellowcar.png" },
        { "id" : 2, "file" : "2_blackcar.png" },
        { "id" : 3, "file" : "3_carsinrow.png" },
        { "id" : 4, "file" : "4_whitecar.png" },
        { "id" : 5, "file" : "5_ferrari.png" },
        { "id" : 6, "file" : "6_sheriffcar.png" },
        { "id" : 7, "file" : "7_bluecar.png" },
        { "id" : 8, "file" : "8_redcar.png" },
        { "id" : 9, "file" : "9_smallcar.png" },
        { "id" : 10, "file" : "10_reallyoldcar.png" },
        { "id" : 11, "file" : "11_silvercar.png" },
        { "id" : 12, "file" : "12_oldtimer.png" },
        { "id" : 13, "file" : "13_greencar.png" },
        { "id" : 14, "file" : "14_elviscar.png" },
        { "id" : 15, "file" : "15_lambo.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Animals",
      "folder" : "pairrsColl_Animals",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_icebear.png" },
        { "id" : 2, "file" : "2_tiger.png" },
        { "id" : 3, "file" : "3_lion.png" },
        { "id" : 4, "file" : "4_giraff.png" },
        { "id" : 5, "file" : "5_elephant.png" },
        { "id" : 6, "file" : "6_turtle.png" },
        { "id" : 7, "file" : "7_flamingo.png" },
        { "id" : 8, "file" : "8_kangaroo.png" },
        { "id" : 9, "file" : "9_wolve.png" },
        { "id" : 10, "file" : "10_camel.png" },
        { "id" : 11, "file" : "11_eagle.png" },
        { "id" : 12, "file" : "12_horse.png" },
        { "id" : 13, "file" : "13_cow.png" },
        { "id" : 14, "file" : "14_zebra.png" },
        { "id" : 15, "file" : "15_leopard.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Buildings",
      "folder" : "pairrsColl_Buildings",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_duma.png" },
        { "id" : 2, "file" : "2_pudong.png" },
        { "id" : 3, "file" : "3_towerbridge.png" },
        { "id" : 4, "file" : "4_eiffeltower.png" },
        { "id" : 5, "file" : "5_tajmahal.png" },
        { "id" : 6, "file" : "6_petronastowers.png" },
        { "id" : 7, "file" : "7_forbiddencity.png" },
        { "id" : 8, "file" : "8_brandenburgertor.png" },
        { "id" : 9, "file" : "9_empirestate.png" },
        { "id" : 10, "file" : "10_dubai.png" },
        { "id" : 11, "file" : "11_chrysler.png" },
        { "id" : 12, "file" : "12_hongkong.png" },
        { "id" : 13, "file" : "13_goldengate.png" },
        { "id" : 14, "file" : "14_colosseum.png" },
        { "id" : 15, "file" : "15_rio.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Landscapes",
      "folder" : "pairrsColl_Landscapes",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_river.png" },
        { "id" : 2, "file" : "2_city.png" },
        { "id" : 3, "file" : "3_sea.png" },
        { "id" : 4, "file" : "4_arctica.png" },
        { "id" : 5, "file" : "5_lake.png" },
        { "id" : 6, "file" : "6_desert.png" },
        { "id" : 7, "file" : "7_mountains.png" },
        { "id" : 8, "file" : "8_forrest.png" },
        { "id" : 9, "file" : "9_jungle.png" },
        { "id" : 10, "file" : "10_beach.png" },
        { "id" : 11, "file" : "11_lake.png" },
        { "id" : 12, "file" : "12_glacier.png" },
        { "id" : 13, "file" : "13_canyon.png" },
        { "id" : 14, "file" : "14_winter.png" },
        { "id" : 15, "file" : "15_island.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Sports",
      "folder" : "pairrsColl_Sports",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_soccer.png" },
        { "id" : 2, "file" : "2_volleyball.png" },
        { "id" : 3, "file" : "3_baseball.png" },
        { "id" : 4, "file" : "4_baseball.png" },
        { "id" : 5, "file" : "5_swimming.png" },
        { "id" : 6, "file" : "6_cycling.png" },
        { "id" : 7, "file" : "7_basketball.png" },
        { "id" : 8, "file" : "8_tennis.png" },
        { "id" : 9, "file" : "9_rugby.png" },
        { "id" : 10, "file" : "10_icehockey.png" },
        { "id" : 11, "file" : "11_fencing.png" },
        { "id" : 12, "file" : "12_surfing.png" },
        { "id" : 13, "file" : "13_rowing.png" },
        { "id" : 14, "file" : "14_snowboarding.png" },
        { "id" : 15, "file" : "15_skiing.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Transports",
      "folder" : "pairrsColl_Transports",
      "cover" : "0_cover.png",
      "backside" : "0_backside.png",
      "images" : [
        { "id" : 1, "file" : "1_airplane.png" },
        { "id" : 2, "file" : "2_balloon.png" },
        { "id" : 3, "file" : "3_subway.png" },
        { "id" : 4, "file" : "4_bike.png" },
        { "id" : 5, "file" : "5_jet.png" },
        { "id" : 6, "file" : "6_londonbus.png" },
        { "id" : 7, "file" : "7_helicopter.png" },
        { "id" : 8, "file" : "8_rockets.png" },
        { "id" : 9, "file" : "9_train.png" },
        { "id" : 10, "file" : "10_ship.png" },
        { "id" : 11, "file" : "11_propellerplane.png" },
        { "id" : 12, "file" : "12_waterplane.png" },
        { "id" : 13, "file" : "13_cruiseship.png" },
        { "id" : 14, "file" : "14_sailingship.png" },
        { "id" : 15, "file" : "15_tram.png" }
      ]
    }
  ],

  // array of all available rewardDecks
  rewardDecks : [
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Fruits",
      "folder" : "pairrsRew_Fruits",
      "cover" : "0_cover.png",
      "candy" : "0_candy.png",
      "images" : [
        { "id" : 1, "file" : "1_apple.png" },
        { "id" : 2, "file" : "2_banana.png" },
        { "id" : 3, "file" : "3_cherry.png" },
        { "id" : 4, "file" : "4_coconut.png" },
        { "id" : 5, "file" : "5_grapefruit.png" },
        { "id" : 6, "file" : "6_kiwi.png" },
        { "id" : 7, "file" : "7_lemon.png" },
        { "id" : 8, "file" : "8_lime.png" },
        { "id" : 9, "file" : "9_maracuja.png" },
        { "id" : 10, "file" : "10_starfruit.png" },
        { "id" : 11, "file" : "11_strawberry.png" },
        { "id" : 12, "file" : "12_watermelon.png" },
        { "id" : 13, "file" : "13_yellowwatermelon.png" },
        { "id" : 14, "file" : "14_orange.png" },
        { "id" : 15, "file" : "15_grape.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Numbers",
      "folder" : "pairrsRew_Numbers",
      "cover" : "0_cover.png",
      "candy" : "0_candy.png",
      "images" : [
        { "id" : 1, "file" : "1_one.png" },
        { "id" : 2, "file" : "2_two.png" },
        { "id" : 3, "file" : "3_three.png" },
        { "id" : 4, "file" : "4_four.png" },
        { "id" : 5, "file" : "5_five.png" },
        { "id" : 6, "file" : "6_six.png" },
        { "id" : 7, "file" : "7_seven.png" },
        { "id" : 8, "file" : "8_eight.png" },
        { "id" : 9, "file" : "9_nine.png" },
        { "id" : 10, "file" : "10_ten.png" },
        { "id" : 11, "file" : "11_eleven.png" },
        { "id" : 12, "file" : "12_twelve.png" },
        { "id" : 13, "file" : "13_thirteen.png" },
        { "id" : 14, "file" : "14_fourteen.png" },
        { "id" : 15, "file" : "15_fifteen.png" }
      ]
    },
    {
      "id" : 0, // will be updated dynamically on load through function pairrsCollection_populateId
      "name" : "Veggies",
      "folder" : "pairrsRew_Veggies",
      "cover" : "0_cover.png",
      "candy" : "0_candy.png",
      "images" : [
        { "id" : 1, "file" : "1_pumpkin.png" },
        { "id" : 2, "file" : "2_tomato.png" },
        { "id" : 3, "file" : "3_cucumber.png" },
        { "id" : 4, "file" : "4_artischogge.png" },
        { "id" : 5, "file" : "5_pepper.png" },
        { "id" : 6, "file" : "6_carot.png" },
        { "id" : 7, "file" : "7_onion.png" },
        { "id" : 8, "file" : "8_eggplant.png" },
        { "id" : 9, "file" : "9_advocado.png" },
        { "id" : 10, "file" : "10_potato.png" },
        { "id" : 11, "file" : "11_brocoli.png" },
        { "id" : 12, "file" : "12_radish.png" },
        { "id" : 13, "file" : "13_salad.png" },
        { "id" : 14, "file" : "14_corn.png" },
        { "id" : 15, "file" : "15_aspargus.png" }
      ]
    }
  ]
}

/*
 * Loops through the collections and assigns an id identical with the collection objects position in the array
 * @param {arr} the pairrsCollections array containing all collection objects
 * @return {arr} the updated pairrscollections array
 */
pairrsCollections_populateId = function(pairrsCollections) {

  // generate id's for cardDecks
  for(var i = 0; i < pairrsCollections.cardDecks.length; i++) {
    pairrsCollections.cardDecks[i].id = i;
  }

  // generate id's for rewardDecks
  for(var j = 0; j < pairrsCollections.rewardDecks.length; j++) {
    pairrsCollections.rewardDecks[j].id = j;
  }
  return pairrsCollections;
}

// call to update the id's of the individual collections
pairrsCollections = pairrsCollections_populateId(pairrsCollections);