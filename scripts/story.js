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

updatePage();

function onLeftArrowClick() {
  if (currentPageNumber > 1) {
    currentPageNumber--;
  }
  updatePage();
}

function onRightArrowClick() {
  if (currentPageNumber < currentStory.pages.length) {
    currentPageNumber++;
  }
  updatePage();
}

function updatePage() {
  currentPage = currentStory.pages[currentPageNumber - 1];
  pageTextElement.textContent = currentPage.text;
  pageNumberElement.textContent = "pg " + currentPageNumber;
}
