$(function () {
  var onTab = $(".tabs li.on").index();
  $(".tabcon").eq(onTab).addClass("on");

  $(".tabs li").click(function () {
    var idx = $(this).index();
    $(".tabs li").removeClass("on");
    $(this).addClass("on");

    $(".tabon").removeClass("on");
    $(".tabon").eq(idx).addClass("on");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const flipSound = new Audio("sounds/flipcard.mp3");
  const clapSound = new Audio("sounds/clap_sound.mp3");
  const cardContainer = document.getElementById("cardContainer");
  const imagePaths = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
  ];

  const cards = imagePaths.concat(imagePaths).sort(() => Math.random() - 0.5);

  let flippedCards = [];
  let matchedPairs = 0;

  cards.forEach((imagePath, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('images/card_back.png');"></div>
      </div>
    `;
    cardContainer.appendChild(card);

    card.addEventListener("click", function () {
      flipSound.play();
      if (!this.classList.contains("card-flipped")) {
        this.classList.add("card-flipped");
        const front = this.querySelector(".card-front");
        const back = this.querySelector(".card-back");
        front.style.backgroundImage = `url('images/${imagePath}')`;
        back.style.display = "none";

        flippedCards.push(this);

        if (flippedCards.length === 2) {
          const [firstCard, secondCard] = flippedCards;
          if (
            firstCard.querySelector(".card-front").style.backgroundImage ===
            secondCard.querySelector(".card-front").style.backgroundImage
          ) {
            setTimeout(() => {
              firstCard.style.visibility = "hidden";
              secondCard.style.visibility = "hidden";
              flippedCards = [];
              matchedPairs++;

              if (matchedPairs === imagePaths.length) {
                clapSound.play();
                alert("축하합니다! 모든 카드를 다 맞추셨습니다!");
                if (confirm("다시 시작하시겠습니까?")) {
                  location.reload();
                }
              }
            }, 1000);
          } else {
            setTimeout(() => {
              flippedCards.forEach((card) => {
                card.classList.remove("card-flipped");
                const front = card.querySelector(".card-front");
                const back = card.querySelector(".card-back");
                front.style.backgroundImage = "";
                back.style.display = "block";
              });
              flippedCards = [];
            }, 2500);
          }
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const playerChoiceButtons = document.querySelectorAll(
    ".player-choice button"
  );
  const computerChoiceDiv = document.getElementById("computer-image");
  const resultDiv = document.getElementById("result");

  playerChoiceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const playerChoice = this.id;

      const computerChoice = getRandomChoice();

      const choiceValues = {
        scissors: "✌️",
        rock: "✊",
        paper: "🖐️",
      };

      const choiceImg = choiceValues[computerChoice];

      // 컴퓨터의 선택 이미지 업데이트
      computerChoiceDiv.innerHTML = `<h3>${choiceImg}</h3>`;

      // 가위바위보 결과 계산
      const result = calculateResult(playerChoice, computerChoice);

      // 결과를 화면에 출력
      resultDiv.textContent = result;
    });
  });

  // 랜덤 선택 함수
  function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // 가위바위보 결과 계산 함수
  function calculateResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "비겼습니다!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "이겼습니다!";
    } else {
      return "졌습니다!";
    }
  }
});

//버튼 게임
document.addEventListener("DOMContentLoaded", function () {
  const numButtons = document.querySelectorAll(".num-container input");
  const clapSound = new Audio("sounds/clap_sound.mp3");
  const clickSound = new Audio("sounds/click_effect.mp3");

  let clickedNumbers = [];
  let expectedNumber = 1;

  shuffleNumbers();

  numButtons.forEach((button) => {
    button.addEventListener("click", function () {
      clickSound.play();
      const clickedNumber = parseInt(this.value);

      if (clickedNumber === expectedNumber) {
        clickedNumbers.push(clickedNumber);
        expectedNumber++;
        this.disabled = true;

        if (expectedNumber > numButtons.length) {
          clapSound.play();
          alert("축하합니다! 성공입니다!");
          resetGame();
        }
      } else {
        alert("잘못 눌렀습니다!");
      }
    });
  });

  function resetGame() {
    clickedNumbers = [];
    expectedNumber = 1;
    numButtons.forEach((button) => {
      button.disabled = false;
    });
    shuffleNumbers();
  }

  function shuffleNumbers() {
    for (let i = numButtons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numButtons[i].value, numButtons[j].value] = [
        numButtons[j].value,
        numButtons[i].value,
      ];
    }
  }
});

$(function () {
  $(".tabs li a").click(function () {
    $("#mainContent").hide();
  });
});
