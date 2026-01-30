document.addEventListener("DOMContentLoaded", function () {

  /* -------------------------
     BOOK PAGE LOGIC
  -------------------------- */

  const pages = document.querySelectorAll('.page');
  const music = document.getElementById('bgMusic');

  let current = 0;
  let musicStarted = false; // important

  // SAFETY CHECK
  if (pages.length === 0) {
    console.error("No pages found. Check .page class in HTML.");
    return;
  }

  pages[current].classList.add('active');

  // Initial music settings (very important)
  music.volume = 0.0; // start silent

  /* -------------------------
     MUSIC FADE-IN FUNCTION
  -------------------------- */
  function startMusic() {
    if (musicStarted) return;

    musicStarted = true;
    music.currentTime = 20
    music.play();

    let volume = 0;
    const targetVolume = 0.25; // soft romantic volume

    const fadeIn = setInterval(() => {
      if (volume < targetVolume) {
        volume += 0.02;
        music.volume = volume;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);
  }

  /* -------------------------
     NEXT PAGE
  -------------------------- */
  window.nextPage = function () {
    startMusic(); // music starts on first interaction

    if (current < pages.length - 1) {
      pages[current].classList.remove('active');
      pages[current].classList.add('flipped');

      current++;
      pages[current].classList.add('active');
    } else {
      showReflection();
    }
  };

  /* -------------------------
     PREVIOUS PAGE
  -------------------------- */
  window.prevPage = function () {
    if (current > 0) {
      pages[current].classList.remove('active');

      current--;
      pages[current].classList.remove('flipped');
      pages[current].classList.add('active');
    }
  };

  /* -------------------------
     REFLECTION QUESTIONS
  -------------------------- */

  const questions = [
    "Are you truly happy now?",
    "Have you ever missed me?",
    "Have you ever felt like contacting me… and stopped yourself?",
    "Do you feel our last fight was a misunderstanding — or the truth?"
  ];

  const responses = {
    yes: [
      "I hope that happiness feels calm and real.\nYou always deserved peace.",
      "really ? so what you are waiting for ?",
      "yes only feel kar but steps mat le .",
      "Maybe timing spoke louder than feelings.\nThat happens."
    ],
    no: [
      "It’s okay to still be finding your way.\nHealing takes time.",
      "Some connections don’t fade.\nThey simply rest quietly.",
      "Silence doesn’t always mean absence.\nSometimes it means fear.",
      "Misunderstandings can feel final\nbefore clarity arrives."
    ]
  };

  let qIndex = 0;

  /* -------------------------
     SHOW OVERLAY
  -------------------------- */
  function showReflection() {
    const overlay = document.getElementById("reflection");
    if (!overlay) return;

    // lower music during reflection
    music.volume = 0.15;

    overlay.classList.add("visible");
    showQuestion();
  }

  function showQuestion() {
    document.getElementById("question").innerText = questions[qIndex];
    document.getElementById("response").innerText = "";
  }

  /* -------------------------
     HANDLE ANSWER
  -------------------------- */
  window.reply = function (choice) {
    const response = document.getElementById("response");
    response.innerText = responses[choice][qIndex];

    qIndex++;

    if (qIndex < questions.length) {
      setTimeout(showQuestion, 1700);
    } else {
      setTimeout(() => {
        document.getElementById("question").innerText =
          "Whatever your answers are…\nthank you for being honest with yourself.";

        document.querySelector(".answers").style.display = "none";

        response.innerText +=
          "\n\nSome connections don’t ask to return.\nThey wait.";
      }, 1700);
    }
  };

});
