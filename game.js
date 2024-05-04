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
  const container = document.getElementById("containerDot");

  const numPoints = 10;
  for (let i = 0; i < numPoints; i++) {
    const point = document.createElement("div");
    point.classList.add("point");
    point.innerText = i + 1;
    point.style.left = Math.random() * 90 + "%";
    point.style.top = Math.random() * 90 + "%";
    container.appendChild(point);

    point.addEventListener("click", function () {
      const lines = document.querySelectorAll(".line");
      lines.forEach((line) => line.remove());

      const clickedPoint = this;
      const clickedPointRect = clickedPoint.getBoundingClientRect();
      const clickedPointCenterX =
        clickedPointRect.left + clickedPointRect.width / 2;
      const clickedPointCenterY =
        clickedPointRect.top + clickedPointRect.height / 2;

      const otherPoints = Array.from(
        container.querySelectorAll(".point")
      ).filter((point) => point !== clickedPoint);
      otherPoints.forEach((otherPoint) => {
        const otherPointRect = otherPoint.getBoundingClientRect();
        const otherPointCenterX =
          otherPointRect.left + otherPointRect.width / 2;
        const otherPointCenterY =
          otherPointRect.top + otherPointRect.height / 2;

        const line = document.createElement("div");
        line.classList.add("line");
        line.style.left =
          Math.min(clickedPointCenterX, otherPointCenterX) + "px";
        line.style.top =
          Math.min(clickedPointCenterY, otherPointCenterY) + "px";
        line.style.width =
          Math.abs(clickedPointCenterX - otherPointCenterX) + "px";
        line.style.height =
          Math.abs(clickedPointCenterY - otherPointCenterY) + "px";
        container.appendChild(line);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const symbols = ["♠", "♣", "♥", "♦"];

  const cards = symbols.concat(symbols).sort(() => Math.random() - 0.5);

  cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back"></div>
      </div>
    `;
    cardContainer.appendChild(card);

    card.addEventListener("click", function () {
      if (!this.classList.contains("card-flipped")) {
        this.classList.add("card-flipped");

        const flippedCards = document.querySelectorAll(".card-flipped");
        if (flippedCards.length === 2) {
          const [firstCard, secondCard] = flippedCards;
          if (
            firstCard.querySelector(".card-front").textContent ===
            secondCard.querySelector(".card-front").textContent
          ) {
            setTimeout(() => {
              firstCard.style.visibility = "hidden";
              secondCard.style.visibility = "hidden";
            }, 500);
          } else {
            setTimeout(() => {
              flippedCards.forEach((card) =>
                card.classList.remove("card-flipped")
              );
            }, 1000);
          }
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const choices = ["rock", "paper", "scissors"];
  const images = {
    rock: "rock.png",
    paper: "paper.png",
    scissors: "scissors.png",
  };

  const computerImage = document.getElementById("computer-image");
  const resultElement = document.getElementById("result");

  document.querySelectorAll(".player-choice button").forEach((button) => {
    button.addEventListener("click", function () {
      const playerChoice = this.id;
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      computerImage.innerHTML = `<img src="images/${images[computerChoice]}" alt="${computerChoice}">`;

      if (playerChoice === computerChoice) {
        resultElement.textContent = "무승부!";
      } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
      ) {
        resultElement.textContent = "당신이 이겼습니다!";
      } else {
        resultElement.textContent = "컴퓨터가 이겼습니다!";
      }
    });
  });
});
