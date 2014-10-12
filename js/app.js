var pairsApp = {
  content : {},
  load : function(collection) {
    return this.content = collection;
  },
  shuffleCards : function() {
   // todo: mix the content deck 
  },
  distributeCards : function() {
    
    var cards = [];
    
    // fill 30 cards into array
    for(var i = 0; i < 30; i++) {
      cards.push("<div class='col-xs-2'><section class='cardholder'><div class='card' onclick='pairsApp.flipCard(this)'><div class='card-front'>Front</div><div class='card-back'>Back</div></div></section></div>");
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
  flipCard : function(element) {
    $(element).toggleClass("flipped");
  }
}

var pairsCollectionAmsterdam = {
  name : "Amsterdam",
  location : function() {
    return "img/collection" + this.name + "/"
  },
  images : [
    {
      id : 1,
      file : "bike.jpg"
    },
    {
      id : 2,
      file : "building.jpg"
    },
    {
      id : 3,
      file : "cars.jpg"
    },
    {
      id : 4,
      file : "gracht.jpg"
    }
  ]
}