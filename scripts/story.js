const stories = [
  {
    title: "Dino's Adventure: The Magical Tree of Leaves",
    tags: ["trees", "dinosaurs", "leaves"],
    pages: [
      {
        text: "Once upon a time, in a magical land filled with colorful dinosaurs and towering trees, there lived a young and curious dinosaur named Dino...",
        img: "url_to_image1",
      },
      {
        text: "One sunny morning, Dino decided to embark on an exciting adventure to find the legendary 'Magical Tree of Leaves.' According to the ancient tales, this tree had the most beautiful and colorful leaves that held incredible powers...",
        img: "url_to_image2",
      },
      {
        text: "As Dino journeyed through the forest, he met his friends along the way—a wise Triceratops named Tria and a playful Pterodactyl named Pete...",
        img: "url_to_image3",
      },
      {
        text: "Through the dense forest and across bubbling streams, they searched for clues that would lead them to the magical tree. Suddenly, they stumbled upon a hidden path filled with colorful flowers and sparkling rocks...",
        img: "url_to_image4",
      },
      {
        text: "Following the path, they reached a clearing where an enormous tree stood, covered in leaves of every hue imaginable...",
        img: "url_to_image5",
      },
      {
        text: "Excited and in awe, they approached the tree, and as they touched the leaves, something extraordinary happened. The leaves whispered ancient tales and secrets, filling their hearts with wonder and joy...",
        img: "url_to_image6",
      },
      {
        text: "Dino, Tria, and Pete learned that the magical leaves could grant a wish to anyone with a kind and pure heart. Overwhelmed with joy, they each made a wish—to spread love, kindness, and happiness throughout their forest and beyond...",
        img: "url_to_image7",
      },
      {
        text: "As they made their wishes, the tree sprinkled a dust of magic over them, sealing their promises to the forest and its creatures...",
        img: "url_to_image8",
      },
      {
        text: "Their journey back was filled with laughter and excitement as they shared their newfound knowledge with fellow dinosaurs...",
        img: "url_to_image9",
      },
      {
        text: "And so, in the heart of the enchanting forest, Dino and his friends continued to spread love and kindness, making their world a better place for all dinosaurs, trees, and leaves, leaving a lasting legacy for generations to come.",
        img: "url_to_image10",
      },
    ],
  },
];

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
let pageTextElement = document.getElementById("page-text");
let pageNumberElement = document.getElementById("page-number");
let nextBtnElement = document.getElementById("next-btn");
let previousBtnElement = document.getElementById("previous-btn");

previousBtnElement.style.opacity = 0;

updatePage();

function onLeftArrowClick() {
  if (currentPageNumber == 2) {
    previousBtnElement.style.opacity = 0;
  }
  if (currentPageNumber > 1) {
    currentPageNumber--;
    nextBtnElement.style.opacity = 1;
  }
  updatePage();
}

function onRightArrowClick() {
  if (currentPageNumber == currentStory.pages.length - 1) {
    nextBtnElement.style.opacity = 0;
  }
  if (currentPageNumber < currentStory.pages.length) {
    currentPageNumber++;
    previousBtnElement.style.opacity = 1;
  }
  updatePage();
}

function updatePage() {
  currentPage = currentStory.pages[currentPageNumber - 1];
  pageTextElement.textContent = currentPage.text;
  pageNumberElement.textContent = "pg " + currentPageNumber;
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

// make_base();

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
  // const storyText = storybookText.textContent;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = doodleCanvas.width;
  canvas.height = doodleCanvas.height;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(doodleCanvas, 0, 0);
  context.font = "16px Arial";
  context.fillStyle = "black";
  // const textLines = storyText.split('\n');
  // textLines.forEach((line, index) => {
  //     context.fillText(line, 10, 20 + index * 20);
  // });
  const combinedImage = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = combinedImage;
  a.download = "story_and_doodle.png";
  a.click();
}

function make_base() {
  base_image = new Image();
  base_image.src = "img/base.png";
  base_image.onload = function () {
    context.drawImage(base_image, 0, 0);
  };
}
