//Get the deck
let deckId = '';



fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        deckId = data.deck_id;
      })

      .catch(err => {
          console.log(`error ${err}`)
      });




document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){

  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        if (data.remaining > 0) {
          const player1Card = data.cards[0]
          const player2Card = data.cards[1]
          document.querySelector('#player1').src = player1Card.image;
          document.querySelector('#player2').src = player2Card.image;
          const player1Value = getCardValue(player1Card);
          const player2Value = getCardValue(player2Card);
          // console.log(player1Value, player2Value);

          const winner = game(player1Value, player2Value);
          addToPile(winner, player1Card.code, player2Card.code);
          listPileCards(winner);
        }
        else {
          console.log("NO CARDS LEFT");
        }
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}

function game(playerOne, playerTwo) {
  if (playerOne > playerTwo) {
    console.log('Player 1 Wins!');
    return 'Player1'
  }
  else if (playerTwo > playerOne) {
    console.log('Player 2 Wins!')
    return 'Player2'
  }
  else {
    console.log('WAR!');
    return 'War'
  }
}

function getCardValue(card) {
  if (card.value === 'ACE') {
    return 14;
  }
  else if (card.value === "KING") {
    return 13;
  }
  else if (card.value === "QUEEN") {
    return 12;
  }
  else if (card.value === "JACK") {
    return 11;
  }
  else {
    return Number(card.value);
  }
}

function addToPile(player, card1, card2) {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/add/?cards=${card1},${card2}`;
  // console.log(url);
  // console.log(player, card1, card2);

  fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // console.log(data.length);
      })

      .catch(err => {
        console.log(`error ${err}`)
    });
}


function listPileCards(pile) {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/list/`

  fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

      })

      .catch(err => {
        console.log(`error ${err}`)
    });
}