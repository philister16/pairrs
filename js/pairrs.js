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
   * Holds the rewards that the player can get for right answers
   * @type {obj}
   */
  rewards : {},

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    StatusBar.hide();
  },

  /**
   * Initializes the app
   * @return {bool} true if app loaded
   */
  init : function() {

    this.bindEvents();

    $("#message-box").hide();
    $("#rewards-menu").hide();

    // get the available card decks to be shown in main menu
    var cardDecks = pairrs.menu.getCardDecks(pairrsCollections.cardDecks);
    var htmlString = pairrs.menu.getMainMenu(cardDecks);
    pairrs.menu.renderMainMenu(htmlString);

    // show the main-menu
    pairrs.menu.showMainMenu();

    // load the standard rewards
    pairrs.load("rewardDeck", pairrsCollections.rewardDecks[0]);
  },
  
  /**
   * Loads the desired set of cards into the content property and return the content property
   * @param {obj} collection object
   * @return {obj} the content property populated with desired collection
   */
  load : function(what, deck) {
    if(what === "cardDeck") {
      return this.content = deck;
    } else if (what === "rewardDeck") {
      return this.rewards = deck;
    } else {
      return false;
    }
  },
  
  /**
   * Empties the content property and returns the property as an empty object
   * @return {obj} empty content object
   */
  unload : function(what) {
    if(what === "cardDeck") {
      return this.content = {};
    } else if (what === "rewardDeck") {
      return this.rewards = {};
    } else {
      return false;
    }
  },

  /**
   * Randomly shuffles the array based on the Fisher-Yates Shuffle algorithm
   * @param {arr} unshuffled array
   * @return {arr} randomly shuffled array
   */
  shuffle : function(array) {
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
    // shuffle the images
    imageStack = this.shuffle(imageStack);
    return imageStack;
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
      secondCard : false, // either we flip the 1st card or the 2nd card
      currentCards : [{ name : "", id : "" },{ name : "", id : "" }],
      wonPairs : 0,
      wonAwards: 0,
      scoredLastRound : false,
      /**
       * Initializes all values in the state object
       * @return {obj} the state object
       */
      stateInit : function() {
        this.secondCard = false;
        this.currentCards = [{ name : "", id : "" },{ name : "", id : "" }];
        this.wonPairs = 0;
        this.wonAwards = 0;
        this.scoredLastRound = false;
        return this.state;
      }
    },

    /**
     * Initializes all states, cleans up the view, distributes the cards and prepares the rewards and hides the menus
     * @param {int} id of cardDeck to be used
     * @return {bool} to indicate if game was started or not
     */
    startGame : function(cardDeckId) {

      pairrs.audio.playSound(["snd-bg", 50, true]);

      $("#main-content").empty();
      pairrs.unload("cardDeck");

      // empty the rewards from the rewards containers
      $(".reward").each(function() {
        $(this).empty();
      });

      // load the collection clicked in the main-menu into content object holder
      var collection = pairrsCollections.cardDecks[cardDeckId];
      pairrs.load("cardDeck", collection);

      // shuffle the cards and distribute to the playing table
      pairrs.distributeCards(pairrs.shuffleCards(pairrs.content.images));

      //shuffle the rewards
      pairrs.shuffle(pairrs.rewards.images);

      // initialize the game state
      this.state.stateInit();

      $("#main-menu").hide();
      $("#message-box").hide();

      return true;
    },
    
    /**
     * Executes a stroke in the game
     * @param {elem} html element clicked (div.card)
     * @return {arr} array with status values to update game.status obj
     */
    gameOn : function(elem) {

      /**
       * Helper function to load the flipped card into currendCards Array
       * @param {bool} state.secondCard to indicate first or second card to be loaded into array
       * @param {elem} the html element clicked
       * @return {arr} currentCards array
       */ 
      function loadCurrentCard(secondCard, elem) {
        if(secondCard) {
          var i = 1;
        } else {
          var i = 0;
        }
        pairrs.game.state.currentCards[i].name = $(elem).attr("name");
        pairrs.game.state.currentCards[i].id = $(elem).attr("id");
        return pairrs.game.state.currentCards;
      } // loadcurrentCard

      function flipSwishCard(elem) {
        // flip the card clicked
        pairrs.flipCard(elem);
        // play swish sound when turning the card
        pairrs.audio.playSound(["snd-cardSwish", 100, false]);
      } // flipSwishCard

      // switch on whether we flip the first or the second card of a specific stroke
      switch(this.state.secondCard) {
          
        case false :
          
          // flip card and play swish sound
          flipSwishCard(elem);
          
          // load the card's id and name into currentCards array
          loadCurrentCard(this.state.secondCard, elem);

          // next time we flip the second card
          this.state.secondCard = true;

        break;
          
        case true :
          
          var clickedCard = $(elem).attr("id");
          
          // if the 2nd clicked card is not the same as the one in the first stroke flip it
          if(clickedCard !== this.state.currentCards[0].id) {

            // flip card and play swish sound
            flipSwishCard(elem);
            
            // load the card's id and name into currentCards array
            loadCurrentCard(this.state.secondCard, elem);
            
            // remove click event trigger from element so these can't be flipped back
            // we do this at this stage because otherwise cards could be clicked during 3 seconds delay on else block
            var elem1 = document.getElementById(this.state.currentCards[0].id);
            var elem2 = document.getElementById(this.state.currentCards[1].id);
            $(elem1).removeAttr("onclick");
            $(elem2).removeAttr("onclick");

            // if the names of the two flipped cards match player wins
            // cards remain turned in this case, the click event trigger was removed above
            if(this.state.currentCards[0].name === this.state.currentCards[1].name) {

              // keep track of score
              this.updateScoreBoard(this.incrScore());

              // we score this round so should we score again next round scoreLasteRound is true
              this.state.scoredLastRound = true;

              // if all pairs are won the game is over
              if(this.state.wonPairs === 15) {
                setTimeout(function() {
                  pairrs.game.gameExit("<p>Game Over</p>", ["pairrs.menu.showMainMenu()", "pairrs.game.startGame(pairrs.content.id)"]);
                  pairrs.audio.stopSound("snd-bg");
                  pairrs.audio.playSound(["snd-gameOver", 100, false]);
                }, 2000)
              }

            // otherwise flip back the 2 non-matching cards after 3 seconds
            } else {
              setTimeout(function(elem1, elem2) {
                pairrs.flipCard(elem1);
                pairrs.flipCard(elem2);
                pairrs.audio.playSound(["snd-stackNoise", 100, false]);

                // add the onclick attr back in so the cards can be flipped again
                $(elem1).attr("onclick", "pairrs.game.gameOn(this)");
                $(elem2).attr("onclick", "pairrs.game.gameOn(this)");
              }, 2000, [elem1, elem2]);
              this.state.scoredLastRound = false; // we didn't score so next round scoreLastRound is false
            }
            this.state.currentCards = [{ name : "", id : "" },{ name : "", id : "" }]; // init the array again
            this.state.secondCard = false; // next time we flip will be the 1st card again
          }
        break;
      } // switch
    }, // gameOn

    /**
     * Builds a string with the score and returns it
     * @return {str} score message
     */
    getScoreString : function() {

      // get the final score
      var score = this.getFinalScore(this.state);

      // build up string to be printed and return it
      var messageString = "";
      messageString += "<p>" + score[1] + " x <img src='collections/" + pairrs.rewards.folder + "/0_candy.png'> + " + score[0] + " x <img src='collections/" + pairrs.rewards.folder + "/0_cover.png'></p>"

      return messageString;
    },

    /**
     * Shows a message and option to quit the game or continue it, also shows the current score
     * @param {str} message to be displayed
     * @param {arr} the 2 functions to be assigned to the 2 buttons
     */
    gameExit : function(gameMessage, btnFunc) {
      var btnEvt = btnFunc;
      var message = gameMessage;
      message += this.getScoreString();
      pairrs.menu.showMessageBox(message, btnEvt);
    },

    /**
     * increases the score everytime a pair of cards matches, also detects if we score twice or more in a row and thus return true for a special award, otherwise returns false
     * @return {bool} true for special awared, false
     */
    incrScore : function() {

      // increase the counter how many pairs won
      this.state.wonPairs += 1;

      // if player scores in a row he gets the special award, thus true is returned
      if(this.state.scoredLastRound) {
        this.state.wonAwards += 1;
        return true;
        // otherwise the standard 1 point
      } else {
        return false;
      }
    }, // incrScore

    /**
     * Detects if a special or normal award is granted, builds up html string for an award and appends it to the next free award container
     * @param {bool} special awared or not return value from incrScore()
     */
    updateScoreBoard : function(specialReward) {
      var reward = "";
      var snd = [];
      if(specialReward) {
        reward = pairrs.rewards.candy;
        snd = ["snd-awardSound", 60, false];
      } else {
        reward = pairrs.rewards.images[(this.state.wonPairs - 1)].file;
        snd = ["snd-scoreSound", 60, false];
      }
      var imgPath = "collections/" + pairrs.rewards.folder + "/" + reward;
      var htmlString = "<img src='"+imgPath+"' >";
      var selector = ".reward-container .reward:nth-child(" + this.state.wonPairs + ")";

      setTimeout(function() {
        $(selector).append(htmlString);
        // play sound only if it is not the last point, then the gameOver sound will be triggered though gameExit() method
        if(pairrs.game.state.wonPairs < 15) {
          pairrs.audio.playSound(snd);
        }
      }, 2000, [selector, htmlString, snd])
    }, // updateScoreBoard

    /**
     * calculates and return the current the score of normal points and special awards
     * @param {obj} state object that contains the accumulated scores
     * @return {arr} final scores normal points and special awards
     */
    getFinalScore : function(state) {
      var finalScore = [];
      finalScore.push((state.wonPairs - state.wonAwards));
      finalScore.push(state.wonAwards);
      return finalScore;
    } // getFinalScore

  }, // game

  /**
   * Handles the menus
   * @type {obj}
   */
  menu : {

    /**
     * loads the available cardDecks from the pairrsCollections object
     * @param {obj} pairrsCollections.cardDecks
     * @return {arr} array of objects representing a cardDeck each with a property id, name and coverPath
     */
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

    /**
     * Calculates the number of rows and columsn needed depending on number of cardDecks available and builds-up html string of main menu
     * @param {arr} cardDecks array, return value from getCardDecks()
     * @return {str} html string of main menu
     */
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

        // insert 3 columns per row
        for(var j = 0; j < 3; j++) {          
          htmlString += "<div class='col-xs-4'>"; // column div

          // if still cardDecks available insert button
          if(cardDecks.length > 0) {
            var cardDeck = cardDecks.shift(); // remove first item from array
            htmlString += "<div class='menu-btn-container'>"; // menu-btn-container div
            htmlString += "<button class='btn btn-lg btn-primary' onclick='pairrs.game.startGame(" + cardDeck.id + ")' name='"+cardDeck.name+"' style='background: url("+cardDeck.coverPath+"); background-size: contain;'>"; // btn btn-lg btn-primary
            htmlString += "<span class='glyphicon glyphicon-play'>"; // glyphicon glyphicon-play
            htmlString += "</span></button></div>"; // close the tags
          }
          
          htmlString += "</div>"; // close col tag
        }
        htmlString += "</div><!--row "+ (i + 1) +"-->";
      }
      return htmlString;
    },

    /**
     * appends the html of the main menu incl. all available cardDecks to the main-menu container
     * @param {str} html string with rows and columns of main menu
     * @return {bool} true if runs successfully
     */
    renderMainMenu : function(htmlString) {
      $("#main-menu").append(htmlString);
      return true;
    },

    /**
     * empties main content area, hides all messages boxes, gets all available cardDecks, calls the build up of html string and calls the rendering method to append the string and finally returns true
     * @return {bool} true if runs successful
     */
    showMainMenu : function() {
      $("#main-content").empty();
      $("#message-box").hide();
      $("#main-menu").show();
      return true;
    },

    /**
     * Pops open the message box and displays message and adds behavior to the 2 buttons
     * @param {str} the message as text or html string
     * @param {arr} array with onclick attribute values to be added to eh buttons
     */
    showMessageBox : function(message, btnEvt) {
      // popup message box with message and click events for buttons
      $("#message-box .message-canvas").empty();
      $("#message-box .message-canvas").append(message);

      // as long as there are button onclick attr add them to the availble buttons
      for(var i = 0; i < btnEvt.length; i++) {
        $("#message-box button:nth-child(" + (i+1) +")").attr('onclick', btnEvt[i]);
      }

      // display the box
      $("#message-box").show();
    }, // showMessageBox

    /**
     * hides the open message box
     */
    hideMessageBox : function() {
      $("#message-box .message-canvas").empty();
      $("#message-box button").removeAttr('onclick');
      $("#message-box").hide();
    }, // hideMessageBox

    /**
     * shows and hides the info box
     */
    toggleRewardsMenu : function() {
      $("#rewards-menu").toggle();
    },

    loadRewardsDeck : function(deck) {
      pairrs.load("rewardDeck", pairrsCollections.rewardDecks[deck]);
      pairrs.shuffle(pairrs.rewards.images);
      return true;
    },

    selectRewardsDeck : function(deck) {
      this.loadRewardsDeck(deck);
      this.toggleRewardsMenu();
      return true;
    }
  },

  /**
   * Audio functions wrapper object
   */
   audio : {

    /**
     * Loads an audio tag by its id and returns this element
     * @param {str} audio element's id as a string
     * @return {elem} respective audio tag
     */
    loadAudio : function(audioTag) {
      var snd = document.getElementById(audioTag);
      return snd;
    },

    /**
     * triggers to play a sound from the beginning
     * @param {arr} [str audioTagId, int(1-100) volume, bool loop]
     * @return {str} name of audio tag
     */
     playSound : function(options) {
        // load the respective audio tag
        var snd = this.loadAudio(options[0]);
        // set the volume
        snd.volume = (options[1] / 100);
        // if looping is true set the sound to be looped
        if(options[2]) {
          snd.loop = true;
        }
        // start playing the sound
        snd.play();
        snd.currentTime = 0;

        return options[0];
     },

     /**
      * stops a sound and sets cursor/playhead back to beginning
      * @param {str} name of audio tag id
      */
     stopSound : function(audioTag) {
      // load the respective audio tag
      var snd = this.loadAudio(audioTag);
      snd.pause();
      return audioTag;
     }

   }, // audio object
  
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

// call to initialize the app
pairrs.init();
