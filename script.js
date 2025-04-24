const board = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const emojis = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🥝', '🍒'];
    let cards = [...emojis, ...emojis];
    cards = cards.sort(() => 0.5 - Math.random());

    let flippedCards = [];
    let matched = 0;
    let moves = 0;
    let time = 0;
    let timerStarted = false;
    let timerInterval;

    function startTimer() {
      timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = `Время: ${time} сек`;
      }, 1000);
    }

    cards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card', 'hidden');
      card.dataset.emoji = emoji;
      card.dataset.index = index;
      card.innerText = emoji;

      card.addEventListener('click', () => {
        if (!timerStarted) {
          startTimer();
          timerStarted = true;
        }

        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flippedCards.length === 2) return;

        card.classList.add('flipped');
        card.classList.remove('hidden');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          moves++;
          movesDisplay.textContent = `Ходы: ${moves}`;
          const [first, second] = flippedCards;

          if (first.dataset.emoji === second.dataset.emoji) {
            first.classList.add('matched');
            second.classList.add('matched');
            matched += 2;
            flippedCards = [];

            if (matched === cards.length) {
              clearInterval(timerInterval);
              setTimeout(() => alert(`🎉 Победа!\nХоды: ${moves}\nВремя: ${time} сек`), 300);
            }
          } else {
            setTimeout(() => {
              first.classList.remove('flipped');
              second.classList.remove('flipped');
              first.classList.add('hidden');
              second.classList.add('hidden');
              flippedCards = [];
            }, 1000);
          }
        }
      });

      board.appendChild(card);
    });