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
    
    imageStack = shuffle(imageStack);
    return imageStack;
    
    /**
     * Randomly shuffles the array based on the Fisher-Yates Shuffle algorithm
     * @param {arr} unshuffled array
     * @return {arr} randomly shuffled array
     */
    function shuffle(array) {
      var counter = array.length, temp, index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    }
    
  },
  
  /**
   * Builds up html string, loops through imageStack array and finally appends html to the main content
      area 30x for each card/image in the imageStack array
   * @param {arr} imageStack array which is a result of {func} shuffleCards 
   * @return {bool} true
   */   
  distributeCards : function(images) {
    
    var cards = [];
    
    // fill 30 cards into array
    for(var i = 0; i < images.length; i++) {
      cards.push("<div class='col-xs-2'><section class='cardholder'><div name='"+images[i].id+"' id='"+i+"' class='card' onclick='pairrs.game.gameOn(this)'><div class='card-down'><img src='./collections/"+this.content.name+"/"+images[i].file+"' class='img-responsive'></div><div class='card-up'><img src='./collections/"+this.content.name+"/0_backside.jpg' class='img-responsive'></div></div></section></div>");
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
   * Single game play
   * @type {obj}
   */
  game : {
    
    /**
     * Current status of the game
     * @type {obj}
     */
    state : {
      ongoing : true, // as long as not all pairs are found game is ongoing
      secondCard : false, // either we flip the 1st card or the 2nd card
      currentCards : [{ name : "", id : "" },{ name : "", id : "" }],
      wonPairs : 0
    },
    
    /**
     * Executes a stroke in the game
     * @param {elem} html element clicked (div.card)
     * @return {arr} array with status values to update game.status obj
     */
    gameOn : function(elem) {
      switch(this.state.secondCard) {
          
        case false :
          
          pairrs.flipCard(elem); // flip the card clicked
          this.state.secondCard = true; // next time we flip the 2nd card
          
          // load the card's id and name into currentCards array
          this.state.currentCards[0].name = $(elem).attr("name");
          this.state.currentCards[0].id = $(elem).attr("id");
          return true;
        break;
          
        case true :
          
          var clickedCard = $(elem).attr("id");
          
          // if the 2nd clicked card is not the same as the one in the first stroke flip it
          if(clickedCard !== this.state.currentCards[0].id) {
            pairrs.flipCard(elem);
            
            // load the card's id and name into currentCards array
            this.state.currentCards[1].name = $(elem).attr("name");
            this.state.currentCards[1].id = $(elem).attr("id");
            
            // if the names of the two flipped cards match player wins
            if(this.state.currentCards[0].name === this.state.currentCards[1].name) {
              this.state.wonPairs += 1;
              // remove click even trigger from element so these can't be flipped back
              var elem1 = document.getElementById(this.state.currentCards[0].id);
              var elem2 = document.getElementById(this.state.currentCards[1].id);
              $(elem1).removeAttr("onclick");
              $(elem2).removeAttr("onclick");

              // keep track of score
              this.score.totalScore += this.score.increaseScore(this.score.scoredLastRound);

            // otherwise flip back the 2 non-matching cards after 3 seconds
            } else {
              var elem1 = document.getElementById(this.state.currentCards[0].id);
              var elem2 = document.getElementById(this.state.currentCards[1].id);
              setTimeout(function(elem1, elem2) {
                pairrs.flipCard(elem1);
                pairrs.flipCard(elem2);
              }, 3000, [elem1, elem2]);

              // keep track of score
              this.score.totalScore += this.score.deductScore(this.score.roundsNotScored);
            }
            this.state.currentCards = [{ name : "", id : "" },{ name : "", id : "" }]; // init the array again
            this.state.secondCard = false; // next time we flip will be the 1st card again
          }
          // display the current score
          $(".alert-info").text("Score: " + this.score.totalScore);

          // if we won all 15 pairs the game is over
          if(this.state.wonPairs === 15) {
            return false;
          } else {
            return true;
          }
        break;
          
        default :
          return false;
        break;
      }
    }, // gameOn

    /**
     * Keep track of score and increases and decreases it
     * @type {obj}
     */
    score : {
      totalScore : 0,
      increaseScore : function(scoredLastRound) {
        this.roundsNotScored = 0;
        // if player did not score last round increase by 100 points
        if(!scoredLastRound) {
          this.scoredLastRound = true; // scored this round, so next round scoredLastRound will be true
          return 100;
          // otherwise if player scored last round reward 50 bonus points in addition to the 100 points
        } else {
          this.scoredLastRound = true;
          return 150;
        }
      },
      deductScore : function(roundsNotScored) {
        this.scoredLastRound = false; // scored this round, so next round scoredLastRound will be true
        // increase malus factor by 1 for every round without any winning pair
        var malusFactor = roundsNotScored;
        this.roundsNotScored++;
        return malusFactor * -5;
      },
      // to determine if bonus points should be assigned
      scoredLastRound : false,
      roundsNotScored : 0
    }, 
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

/**
 * Triggers CSS transition to 3D flip (= add class .flipped) all cards 
 * @return {bool} true
 */
  flipAll : function() {
    $(".card").addClass("flipped");
    return true;
  },
  
/**
 * Triggers CSS transition to 3D unflip (= remove class .flipped) all cards 
 * @return {bool} true
 */
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