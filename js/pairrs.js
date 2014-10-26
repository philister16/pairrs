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
   * @param {obj} collection object
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
      cards.push("<div class='col-xs-2'><section class='cardholder'><div name='"+images[i].id+"' id='"+i+"' class='card' onclick='pairrs.game.gameOn(this)'><div class='card-down'><img src='./collections/"+this.content.folder+"/"+images[i].file+"' class='img-responsive'></div><div class='card-up'><img src='./collections/"+this.content.folder+"/"+this.content.backside+"' class='img-responsive'></div></div></section></div>");
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

    startGame : function(cardDeckId) {
      var collection = pairrsCollections[cardDeckId];
      pairrs.load(collection);
      pairrs.distributeCards(pairrs.shuffleCards(pairrs.content.images));
      $("#main-menu").hide();
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
              // remove click event trigger from element so these can't be flipped back
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
   * Handles the menus
   * @type {obj}
   */
  menu : {
    getCardDecks : function(collections) {
      // load all decks into array cardDecks
      var cardDecks = [];
      var cardDeck = {};
      for(var i = 0; i < collections.length; i++) {
        cardDeck.id = collections[i].id;
        cardDeck.name = collections[i].name;
        cardDeck.coverPath = "collections/" + collections[i].folder + "/" + collections[i].cover;

        cardDecks.push(cardDeck);
        cardDeck = {};
      }
      return cardDecks;
    },

    getMainMenu : function(cardDecks) {
      // define number of rows depending on number of cover images available
      // if cover images are available
      if(cardDecks.length > 0) {
        // each row can take a maximum of 3 images, round down and + 1 for at least 1 row
        var rows = Math.floor(cardDecks.length / 3) + 1;
        // otherwise no cardDecks available and process is stopped
      } else {
        return false;
      }
      
      // build up html to insert into document      
      var htmlString = "";
      var imagePath = "";

      // insert rows
      for(var i = 0; i < rows; i++) {
        htmlString += "<div class='row'>";

        // insert 3 columsn per row
        for(var j = 0; j < 3; j++) {          
          htmlString += "<div class='col-xs-4'>"; // column div

          // if still cardDecks available insert button
          if(cardDecks.length > 0) {
            var cardDeck = cardDecks.shift(); // remove first item from array
            htmlString += "<div class='menu-btn-container'>"; // menu-btn-container div
            htmlString += "<button class='btn btn-lg btn-primary' name='"+cardDeck.name+"' id='"+cardDeck.id+"' style='background: url("+cardDeck.coverPath+"); background-size: contain;'>"; // btn btn-lg btn-primary
            htmlString += "<span class='glyphicon glyphicon-play'>"; // glyphicon glyphicon-play
            htmlString += "</span></button></div>"; // close the tags
          }
          
          htmlString += "</div>"; // close col tag
        }
        htmlString += "</div><!--row "+ (i + 1) +"-->";
      }
      return htmlString;
    },

    renderMainMenu : function(htmlString) {
      $("#main-menu").append(htmlString);
      return true;
    }
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