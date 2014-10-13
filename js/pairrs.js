/**
 * pairrs Version 1.0
 * @desc pairrs is a simple memory game. The player has to find 15 pairs out of a total of
 *    30 randomly mixed and face down cards. Per round the player may turn 2 cards each, if these
 *    match as pair the player wins points, if they don't match points are deducted. The goal is to
 *    uncover all pairs as fast as possible and with as few rounds as possible.
 * @author phil@rhinerock.com (Philipp S. Nueesch)
 * @copyright 2014, Philipp S. Nueesch. All rights reserved.
 */

/**
 * Main App Object wrapping the application.
 * @depend jQuery-1.11.1
 * @depend bootstrap
 */
var pairrs = {
  
/**
 * Holds the content aka cards that are loaded to play with
 * @type {obj}
 */
  content : {},
  
/**
 * Loads the desired set of cards into the content property and return the content property
 * @param {obj} collection object as parsed from JSON
 * @return {obj} the content property populated with desired collection
 */
  load : function(collection) {
    return this.content = collection;
  },

/**
 * Empties the content property and returns the property as an empty object
 * @return {obj} empty content object
 */
  unload : function() {
    return this.content = {};
  },
  
/**
 * Loads all images from content object twice into an array, randomly shuffles this array and returns it
 * @param {arr} content.images array 
 * @return {arr} randomized array containing 30 objects
 */ 
  shuffleCards : function(content) {
    var imageStack = [];
    for(var i = 0; i < content.length; i++) {
      imageStack.push(content[i]);
      imageStack.push(content[i]); // in the content each image occurs once, but we need it twice to create pairs
    }
    return imageStack;
    
    // todo shuffle / randomize imageStack before return
    
  },
  
/**
 * Builds up html string, loops through imageStack array and finally appends html to the main content
    area 30x for each card/image in the imageStack array
 * @param {arr} imageStack array which is a result of {func} shuffleCards 
 * @return {bool} true
 */   
  distributeCards : function() {
    
    var cards = [];
    
    // fill 30 cards into array
    for(var i = 0; i < 30; i++) {
      cards.push("<div class='col-xs-2'><section class='cardholder'><div class='card' onclick='pairrs.flipCard(this)'><div class='card-down'>Front</div><div class='card-up'><img src='./collections/"+this.content.name+"/0_backside.jpg' class='img-responsive'></div></div></section></div>");
    }
    
    // create 5 row div and insert 6 cards each
    for(var i = 0; i < 5; i++) {
      $("#main-content").append("<div class='row reihe-"+i+"'>");
      for(var j = 0; j < 6; j++) {
        $(".reihe-"+i).append(cards.shift());
      }
      $("#main-content").append("</div>");
    }
    return true;
  },
  
/**
 * Triggers CSS transition to 3D flip around individual card
 * @param {elem} clicked html element (div.card) 
 * @return {bool} true
 */    
  flipCard : function(element) {
    $(element).toggleClass("flipped");
    return true;
  },
  
  flipAll : function() {
    $(".card").addClass("flipped");
    return true;
  },
  
  unflipAll : function() {
    $(".card").removeClass("flipped");
    return true;
  }
}


/* LIVES DURING DEV ONLY */

var dummyContent = {
  name : "pairrsColl_CitiesOfEurope",
  title : "Cities of Europe",
  description : "Take a walk through the Cities of Europe. But be aware: you won't find the typical sights. You rather take a stroll through areas where tourists usually don't go. These are the fascinating cities of Europe.",
  backside_file : "0_backside.jpg",
  images : [
    { id : 1, file : "1_ancient.jpg" },
    { id : 2, file : "2_beach.jpg" },
    { id : 3, file : "3_bike.jpg" },
    { id : 4, file : "4_building.jpg" },
    { id : 5, file : "5_cars.jpg" },
    { id : 6, file : "6_colmar.jpg" },
    { id : 7, file : "7_dawn.jpg" },
    { id : 8, file : "8_east.jpg" },
    { id : 9, file : "9_gracht.jpg" },
    { id : 10, file : "10_harbor.jpg" },
    { id : 11, file : "11_milano.jpg" },
    { id : 12, file : "12_riga.jpg" },
    { id : 13, file : "13_square.jpg" },
    { id : 14, file : "14_station.jpg" },
    { id : 15, file : "15_steine.jpg" },
  ]
}