
document.getElementById("startBtn").onclick = () => {
  document.getElementById("startScreen").style.display = "none";
  playMusic(0);
  showFaceView();
};

const faces = {
  Happy: [
    "assets/faces/happy1.jpg", "assets/faces/happy2.jpg", "assets/faces/happy3.jpg",
    "assets/faces/happy4.jpg", "assets/faces/happy5.jpg", "assets/faces/happy6.jpg"
  ],
  Angry: [
    "assets/faces/angry1.jpg", "assets/faces/angry2.jpg", "assets/faces/angry3.jpg",
    "assets/faces/angry4.jpg", "assets/faces/angry5.jpg", "assets/faces/angry6.jpg"
  ],
  Neutral: [
    "assets/faces/neutral1.jpg", "assets/faces/neutral2.jpg", "assets/faces/neutral3.jpg",
    "assets/faces/neutral4.jpg", "assets/faces/neutral5.jpg", "assets/faces/neutral6.jpg"
  ]
};

const phrases = [
  {
    "text": "Where did you park the car?",
    "type": "Question"
  },
  {
    "text": "The meeting starts at ten.",
    "type": "Statement"
  },
  {
    "text": "Switch off the lights.",
    "type": "Command"
  },
  {
    "text": "Return the library books tomorrow.",
    "type": "Command"
  },
  {
    "text": "Is the report finished yet?",
    "type": "Question"
  },
  {
    "text": "The flowers need water.",
    "type": "Statement"
  },
  {
    "text": "The airport is thirty minutes away.",
    "type": "Statement"
  },
  {
    "text": "Close your laptop.",
    "type": "Command"
  },
  {
    "text": "Why is the traffic so heavy?",
    "type": "Question"
  },
  {
    "text": "Can you hear the music?",
    "type": "Question"
  },
  {
    "text": "Save the file before exiting.",
    "type": "Command"
  },
  {
    "text": "The sky turned orange at sunset.",
    "type": "Statement"
  },
  {
    "text": "The tickets sold out quickly.",
    "type": "Statement"
  },
  {
    "text": "Call me when you arrive.",
    "type": "Command"
  },
  {
    "text": "Who left the door open?",
    "type": "Question"
  },
  {
    "text": "Take a deep breath.",
    "type": "Command"
  },
  {
    "text": "The coffee tastes bitter.",
    "type": "Statement"
  },
  {
    "text": "Where is the nearest metro station?",
    "type": "Question"
  },
  {
    "text": "How old is this building?",
    "type": "Question"
  },
  {
    "text": "The cat is sleeping on the couch.",
    "type": "Statement"
  },
  {
    "text": "Please pass the salt.",
    "type": "Command"
  },
  {
    "text": "Turn down the volume.",
    "type": "Command"
  },
  {
    "text": "The lecture lasted two hours.",
    "type": "Statement"
  },
  {
    "text": "Did you lock the front gate?",
    "type": "Question"
  },
  {
    "text": "The train departs at noon.",
    "type": "Statement"
  },
  {
    "text": "Why are the lights flickering?",
    "type": "Question"
  },
  {
    "text": "Submit your assignment online.",
    "type": "Command"
  },
  {
    "text": "When does the store open?",
    "type": "Question"
  },
  {
    "text": "The lake was frozen last winter.",
    "type": "Statement"
  },
  {
    "text": "Check the oil level in the car.",
    "type": "Command"
  }
];


const musicFolder = [
  "assets/music/jazz-funk-groove-instrumental-222618.mp3",
  "assets/music/gentle-instrumental-1-322812.mp3",
  "assets/music/rock-intro-instrumental-2-318682.mp3",
  "assets/music/gorila-315977.mp3"
];

const lyricalFolder = [
  "assets/lyrical/なとり - Overdose.mp3",
  "assets/lyrical/YOASOBI夜に駆ける Official Music Video.mp3",
  "assets/lyrical/Lady Gaga - Abracadabra (Official Music Video).mp3",
  "assets/lyrical/Adoうっせぇわ.mp3",
  "assets/lyrical/The Rolling Stones - Paint It, Black (Official Lyric Video).mp3",
  "assets/lyrical/Taylor Swift - Shake It Off.mp3"
];

// Randomly select 3 from each
const selectedInstrumentals = shuffleArray(musicFolder).slice(0, 3);
const selectedLyrics = shuffleArray(lyricalFolder).slice(0, 3);
const musicTracks = shuffleArray([...selectedInstrumentals, ...selectedLyrics]);


let trial = 0;
const totalTrials = 30;
let results = [];
let currentSet = [];
let correctPersonIndex = 0;
let selectedPhrase = {};
let faceAnswered = false;
let phraseAnswered = false;
let bgMusic = document.getElementById("bgMusic");

function playMusic(index) {
  bgMusic.src = musicTracks[index % musicTracks.length];
  bgMusic.play();
}

function showFaceView() {
  if (trial >= totalTrials) return endExperiment();
  if (trial % 5 === 0) playMusic(trial / 5);
  document.getElementById("faceView").style.display = "block";
  document.getElementById("phraseView").style.display = "none";
  document.getElementById("questionView").style.display = "none";

  document.getElementById("trialCounter").textContent = `Trial ${trial + 1} of ${totalTrials}`;

  const emotions = ["Happy", "Angry", "Neutral"];
  const shuffled = shuffleArray(emotions);
  currentSet = shuffled.map(emotion => ({
    emotion,
    image: getRandomFrom(faces[emotion])
  }));

  const facesDiv = document.getElementById("faces");
  facesDiv.innerHTML = "";
  currentSet.forEach((data, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${data.image}" alt="face"><p>Person ${index + 1}</p>`;
    facesDiv.appendChild(div);
  });

  correctPersonIndex = Math.floor(Math.random() * 3);
  setTimeout(showPhraseView, 6000);
}

function showPhraseView() {
  document.getElementById("faceView").style.display = "none";
  document.getElementById("phraseView").style.display = "block";
  selectedPhrase = getRandomFrom(phrases);
  document.getElementById("phraseText").textContent = selectedPhrase.text;
  setTimeout(showQuestionView, 6000);
}

function showQuestionView() {
  document.getElementById("phraseView").style.display = "none";
  document.getElementById("questionView").style.display = "block";
  document.getElementById("faceQuestion").textContent =
    "What was the emotion of Person " + (correctPersonIndex + 1) + "?";
  faceAnswered = false;
  phraseAnswered = false;
  window.questionStartTime = performance.now();
}

function selectEmotion(emotion) {
  results[trial] = { ...results[trial], face: emotion };
  faceAnswered = true;
  checkBothAnswers();
}

function selectPhraseType(type) {
  const reactionTime = performance.now() - window.questionStartTime;
  results[trial] = {
    ...results[trial],
    trial: trial + 1,
    correctEmotion: currentSet[correctPersonIndex].emotion,
    selectedEmotion: results[trial]?.face || "None",
    faceCorrect: currentSet[correctPersonIndex].emotion === (results[trial]?.face || ""),
    phrase: selectedPhrase.text,
    correctPhrase: selectedPhrase.type,
    selectedPhrase: type,
    phraseCorrect: selectedPhrase.type === type,
    reactionTimeMs: Math.round(reactionTime)
  };
  phraseAnswered = true;
  checkBothAnswers();
}

function checkBothAnswers() {
  if (faceAnswered && phraseAnswered) {
    trial++;
    document.getElementById("questionView").style.display = "none";
    showFaceView();
  }
}

function endExperiment() {
  document.getElementById("faceView").style.display = "none";
  document.getElementById("phraseView").style.display = "none";
  document.getElementById("questionView").style.display = "none";
  document.getElementById("resultView").style.display = "block";

  const faceScore = results.filter(r => r.faceCorrect).length;
  const phraseScore = results.filter(r => r.phraseCorrect).length;
  const totalCorrect = faceScore + phraseScore;
  const totalPossible = results.length * 2;
  const faceAccuracy = ((faceScore / results.length) * 100).toFixed(2) + '%';
  const phraseAccuracy = ((phraseScore / results.length) * 100).toFixed(2) + '%';
  const overallAccuracy = ((totalCorrect / totalPossible) * 100).toFixed(2) + '%';

  document.getElementById("resultSummary").textContent =
    `You got ${faceScore}/${totalTrials} face questions and ${phraseScore}/${totalTrials} phrase questions correct.\n
     Face Accuracy: ${faceAccuracy}, Phrase Accuracy: ${phraseAccuracy}, Overall Accuracy: ${overallAccuracy}`;
}

function downloadResults() {
  const faceCorrect = results.filter(r => r.faceCorrect).length;
  const phraseCorrect = results.filter(r => r.phraseCorrect).length;
  const totalCorrect = faceCorrect + phraseCorrect;
  const totalPossible = results.length * 2;
  const faceAccuracy = ((faceCorrect / results.length) * 100).toFixed(2) + '%';
  const phraseAccuracy = ((phraseCorrect / results.length) * 100).toFixed(2) + '%';
  const overallAccuracy = ((totalCorrect / totalPossible) * 100).toFixed(2) + '%';

  const csvHeader = "Trial,CorrectEmotion,SelectedEmotion,FaceCorrect,Phrase,CorrectPhrase,SelectedPhrase,PhraseCorrect,ReactionTime(ms)\n";
  const csvBody = results.map(r =>
    [r.trial, r.correctEmotion, r.selectedEmotion, r.faceCorrect, r.phrase, r.correctPhrase, r.selectedPhrase, r.phraseCorrect, r.reactionTimeMs].join(",")
  ).join("\n");

  const summary = `\n\nFACE ACCURACY:,,${faceAccuracy}\nPHRASE ACCURACY:,,${phraseAccuracy}\nOVERALL ACCURACY:,,${overallAccuracy}`;
  const csv = csvHeader + csvBody + summary;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "experiment_results.csv";
  a.click();
}

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(array) {
  return array.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
}
