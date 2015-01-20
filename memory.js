$(function() {

  var game = {
    board: $("#game-board"),
    cards: [],
    picked: [],
    matched: [],
    moves: 0
  }

  createCards(game.cards);
  game.cards = _.shuffle(game.cards);
  placeCards(game.board, game.cards, game.matched);





  game.board.on("click", ".face-down", function() {
    var card = $(this);
        game.moves++;

    game.picked.push( parseInt( card.attr("id").substring(4) ) );
    card.addClass("face-up");
    card.removeClass("face-down");
    

    //if picked the shuffling card
    if (card.text() === "*") {

      setTimeout(function() {
        game.picked = [];
    	  game.cards = _.shuffle(game.cards);
    	  placeCards(game.board, game.cards, game.matched);
    }, 500);

    
    }


    //if picked the auto-match card
    else if (card.text() === "+") {
     
    	
    	//make sure it doesn't pick + or * or already matched cards
    	do {
    	  var letter = _.sample(game.cards);
      } while (letter === "+" || letter === "*" || game.matched.indexOf(letter) > -1);

      var card1 = $("#card" + game.cards.indexOf(letter));
      var card2 = $("#card" + game.cards.lastIndexOf(letter));
      
      
      //flip auto matched cards (first check to flip down first one if + was second)
      if (game.picked.length === 2) {
        var pick1 = $("#card" + game.picked[0]);
      }

      
      setTimeout(function() {
        card1.removeClass("face-down");
        card1.addClass("face-up");
        card2.removeClass("face-down");
        card2.addClass("face-up");

        card1.css("transform", "rotate(360deg)");
        card2.css("transform", "rotate(360deg)");

        if (pick1) {
          pick1.removeClass("face-up");
          pick1.addClass("face-down");
        }
	  
      }, 500);

          

      //update game variables (auto match not added, so it can flip back over if cards are reshuffled)
      game.matched.push(card1.text());
      game.picked = [];
    }



    //compare 2 cards
    else if ( game.picked.length === 2 ) {
      
      //flip back if not a match
      var pick1 = $("#card" + game.picked[0]);
      var pick2 = $("#card" + game.picked[1]);
    	if ( pick1.text() !== pick2.text() ) {
        
        //wait half a second so user can view the cards
        setTimeout(function() {
        	pick1.addClass("face-down");
       	  pick1.removeClass("face-up");
       	  pick2.addClass("face-down");
       	  pick2.removeClass("face-up");
       	}, 500);

      }


      //a match!
      if ( pick1.text() === pick2.text() ) {
      	//store letters matched (just storing the letter once is fine)
        game.matched.push(pick1.text());

        //match animation
        pick1.css("transform", "rotate(360deg)");
        pick2.css("transform", "rotate(360deg)");
      }
      
      //clear picked array for next turn
      game.picked = [];

    }
    
    //win condition and result
    if (game.matched.length === 26) {
      //disable board
      $("#game-board").off("click");
      //show win message
      $("#win").css("display", "block");
      $("#moves").text(game.moves);

      //reload script
      $("#win").on("click", function() {
        $.getScript("memory.js");
        $("#win").off("click").css("display","none");

      });
    }

    
  });


});










var createCards = function(cards) {

	//9x6 grid of memory cards held in array, 26 pairs of letters and 2 special cards (54 total)
	//capital letters start at char code 65 (A)
	
	for (var i = 0; i < 54; i++) {
		if (i === 52) {
			cards.push("*");  //re-shuffle
		}
		else if (i === 53) {
			cards.push("+");  //auto match
		}
		else {
			cards.push(String.fromCharCode(65 + i % 26));
		}

		
	}

};




var placeCards = function(board, cards, matched) {

	board.empty();

	for (var i = 0; i < 54; i++) { 
	  if (matched.indexOf(cards[i]) > -1) {
			board.append("<div id='card" + i + "' class='card face-up'>" + cards[i] + "</div>");
		}
		else {
			board.append("<div id='card" + i + "' class='card face-down'>" + cards[i] + "</div>");
		}
	}

};



