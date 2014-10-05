var pairsApp = {
  content : {},
  load : function(collection) {
    return this.content = collection;
  },
  shuffleCards : function() {
   // todo: mix the content deck 
  },
  distributeCards : function() {
    
    var cardRow = "";
    
    for(var i = 0; i < 5; i++) {
      for(var j = 0; j < 6; i++) {
        cardRow = cardRow + "<div class='col-xs-2'><div class='cards'><img src='img/collectionAmsterdam/backside.jpg' class='img-responsive'></div></div>";
      }
      cardRow = "<div class='row'>" + cardRow + "</div>";
      $("#main-content").append(cardRow);
      cardRow = "";
    }
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