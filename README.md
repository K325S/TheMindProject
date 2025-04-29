# TheMindProject

Memory Experiment
This is a simple web-based memory experiment designed to test participants' ability to remember facial emotions and phrase types under different background music conditions (instrumental vs. lyrical).

## Project Structure
```
/assets
  /faces/
    happy1.jpg, angry1.jpg, neutral1.jpg, etc.
  /music/
    music1.mp3, music2.mp3, etc.
  /lyrical/
    lyrical1.mp3, lyrical2.mp3, etc.

index.html
script.js
style.css
```


index.html
script.js
style.css

## How to Run
1. Clone or download the repository if you cannot access the link: https://k325s.github.io/TheMindProject/
2. Make sure the /assets folder includes:
    - Faces images: categorized as happy, angry, and neutral.
    - Music files: divided into instrumental and lyrical folders.
3. Open index.html in a browser.
4. Click "Start Experiment" to begin.

## How the Experiment Works
1. Three faces are shown (happy, angry, neutral) for 6 seconds.
2. A phrase appears for 4 seconds (statement, command, or question).
3. Two questions are asked:
    - Identify the emotion of a specific face.
    - Identify the type of the phrase.
4. The experiment continues for a set number of trials.
5. Upon completion, participants can download a CSV file containing:
    - Correct/selected answers
    - Reaction times
    - Background music type

# Main Files
1. index.html: Structure of the experiment (views, buttons, layout).
2. style.css: Basic styling (centered layout, button styles, image styles).
3. script.js: Experiment logic (randomization, question flow, result tracking, CSV export).
