let stories = [];
const storedStoriesJSON = localStorage.getItem("stories");

if (storedStoriesJSON) {
  // Parse the JSON string back into a JavaScript object
  stories = JSON.parse(storedStoriesJSON);
  console.log("Stories retrieved", stories);
} else {
  console.log("No stories found in local storage.");
}

const urlParams = new URLSearchParams(window.location.search);
let selectedStoryIndex = urlParams.get("storyIndex") || 0;
console.log("story index: ", selectedStoryIndex);

if (selectedStoryIndex >= stories.length || selectedStoryIndex < 0) {
  console.log("Error! Story not found! Selecting default...");
  selectedStoryIndex = 0;
}
console.log(stories[selectedStoryIndex].pages[0]);
let currentStory = stories[selectedStoryIndex];
let currentPageNumber = 1;
let currentPage = currentStory.pages[currentPageNumber];

// GETTING DOCUMENT ELEMENTS BY ID
let storyTitle = document.getElementById("title");
let pageTextElement = document.getElementById("page-text");
let pageNumberElement = document.getElementById("page-number");
let nextBtnElement = document.getElementById("next-btn");
let previousBtnElement = document.getElementById("previous-btn");
let rightArrowIconElement = document.getElementById("right-arrow-icon");
let finishStoryElement = document.getElementById("finish-story");

previousBtnElement.style.opacity = 0;
storyTitle.textContent = currentStory.title;
updatePageText();

function onLeftArrowClick() {
  if (currentPageNumber == 2) {
    previousBtnElement.style.opacity = 0;
  }
  if (currentPageNumber > 1) {
    saveImage(); // Save image before page number updates
    currentPageNumber--;
    nextBtnElement.style.opacity = 1;
    finishStoryElement.style.display = "none";
    rightArrowIconElement.style.display = "block";
  }
  updatePage();
}

function onRightArrowClick() {
  if (currentPageNumber == currentStory.pages.length - 1) {
    rightArrowIconElement.style.display = "none";
    finishStoryElement.style.display = "inline-block";
  }
  if (currentPageNumber < currentStory.pages.length) {
    saveImage(); // Save image before page number updates
    currentPageNumber++;
    previousBtnElement.style.opacity = 1;
  } else if (currentPageNumber == currentStory.pages.length) {
    exitStory();
  }
  updatePage();
}

function updatePageText() {
  currentPage = currentStory.pages[currentPageNumber - 1];
  pageTextElement.textContent = currentPage.text;
  pageNumberElement.textContent = "pg " + currentPageNumber;
}

function updatePage() {
  console.log("update page");
  updatePageText();

  if (!doodleCanvas) return;
  clearDoodle();
  if (stories[selectedStoryIndex].pages[currentPageNumber - 1].img) {
    var image = new Image();
    image.onload = function () {
      doodleContext.drawImage(image, 0, 0);
    };
    image.src = stories[selectedStoryIndex].pages[currentPageNumber - 1].img;
  }
  updateLocalStorageStories();
}

function onHomeClicked() {
  exitStory();
}

function exitStory() {
  saveImage();
  updatePage();
  updateLocalStorageStories();
  window.location.href = "index.html";
}

function updateLocalStorageStories() {
  // Convert the stories object to JSON
  const storiesJSON = JSON.stringify(stories);

  // Save the JSON string to local storage under the key 'stories'
  localStorage.setItem("stories", storiesJSON);
}

/*************************************************************************************************************/
/*********************************************** DOODLE CODE *************************************************/
/*************************************************************************************************************/
const doodleCanvas = document.getElementById("doodle");
const doodleContext = doodleCanvas.getContext("2d");
const colorChooser = document.getElementById("color-chooser");
const undoButton = document.querySelector(".undo-button");
const eraserButton = document.querySelector(".eraser-button");
const clearButton = document.querySelector(".clear-button");

let currentColor = colorChooser.value;
doodleContext.strokeStyle = currentColor;

let drawing = false;
let erasing = false;
let lastX = 0;
let lastY = 0;
const undoStack = [];

const penButton = document.querySelector(".pen-button");

context = doodleCanvas.getContext("2d");

penButton.addEventListener("click", () => {
  erasing = false; // Set erasing mode to false
  doodleContext.strokeStyle = currentColor; // Set the color to the current color
  doodleContext.globalCompositeOperation = "source-over"; // Reset global composite operation to normal (pen) mode
});

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  doodleCanvas.width = doodleCanvas.parentElement.clientWidth - 20; // Adjust for any padding or margin
  doodleCanvas.height = doodleContainer.clientHeight - 20; // Adjust for any padding or margin
}

doodleCanvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

doodleCanvas.addEventListener("mousemove", draw);
doodleCanvas.addEventListener("mouseup", () => {
  drawing = false;
  erasing = false;
});

function draw(e) {
  if (!drawing) return;

  doodleContext.lineWidth = erasing ? 20 : 5; // Increase the lineWidth for erasing
  doodleContext.lineCap = "round";

  doodleContext.beginPath();
  doodleContext.moveTo(lastX, lastY);
  doodleContext.lineTo(e.offsetX, e.offsetY);
  doodleContext.stroke();

  // Store the current state for undo
  undoStack.push(doodleCanvas.toDataURL());

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

clearButton.addEventListener("click", clearDoodle);

function clearDoodle() {
  doodleContext.clearRect(0, 0, doodleCanvas.width, doodleCanvas.height);
  undoStack.length = 0;
}

undoButton.addEventListener("click", undoDrawing);

function undoDrawing() {
  if (undoStack.length > 1) {
    undoStack.pop();
    const prevImage = new Image();
    prevImage.src = undoStack[undoStack.length - 1];
    prevImage.onload = () => {
      doodleContext.clearRect(0, 0, doodleCanvas.width, doodleCanvas.height);
      doodleContext.drawImage(
        prevImage,
        0,
        0,
        doodleCanvas.width,
        doodleCanvas.height
      );
    };
  } else {
    clearDoodle();
  }
}

colorChooser.addEventListener("input", () => {
  currentColor = colorChooser.value;
  doodleContext.strokeStyle = currentColor; // Set the strokeStyle to the chosen color
});

eraserButton.addEventListener("click", () => {
  erasing = true;
  doodleContext.strokeStyle = "white";
  doodleContext.globalCompositeOperation = "source-over";
});

function saveImage() {
  const doodleImage = doodleCanvas.toDataURL("image/png");
  stories[selectedStoryIndex].pages[currentPageNumber - 1].img = doodleImage;
}
