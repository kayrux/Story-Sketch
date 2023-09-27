let stories = [
  {
    title: "Dino's Adventure: The Magical Tree of Leaves",
    tags: ["trees", "dinosaurs", "leaves"],
    frontPage: "",
    pages: [
      {
        text: "Once upon a time, in a magical land filled with colorful dinosaurs and towering trees, there lived a young and curious dinosaur named Dino...",
        img: "",
      },
      {
        text: "One sunny morning, Dino decided to embark on an exciting adventure to find the legendary 'Magical Tree of Leaves.' According to the ancient tales, this tree had the most beautiful and colorful leaves that held incredible powers...",
        img: "",
      },
      {
        text: "As Dino journeyed through the forest, he met his friends along the way—a wise Triceratops named Tria and a playful Pterodactyl named Pete...",
        img: "",
      },
      {
        text: "Through the dense forest and across bubbling streams, they searched for clues that would lead them to the magical tree. Suddenly, they stumbled upon a hidden path filled with colorful flowers and sparkling rocks...",
        img: "",
      },
      {
        text: "Following the path, they reached a clearing where an enormous tree stood, covered in leaves of every hue imaginable...",
        img: "",
      },
      {
        text: "Excited and in awe, they approached the tree, and as they touched the leaves, something extraordinary happened. The leaves whispered ancient tales and secrets, filling their hearts with wonder and joy...",
        img: "",
      },
      {
        text: "Dino, Tria, and Pete learned that the magical leaves could grant a wish to anyone with a kind and pure heart. Overwhelmed with joy, they each made a wish—to spread love, kindness, and happiness throughout their forest and beyond...",
        img: "",
      },
      {
        text: "As they made their wishes, the tree sprinkled a dust of magic over them, sealing their promises to the forest and its creatures...",
        img: "",
      },
      {
        text: "Their journey back was filled with laughter and excitement as they shared their newfound knowledge with fellow dinosaurs...",
        img: "",
      },
      {
        text: "And so, in the heart of the enchanting forest, Dino and his friends continued to spread love and kindness, making their world a better place for all dinosaurs, trees, and leaves, leaving a lasting legacy for generations to come.",
        img: "",
      },
    ],
  },
  {
    title: "The Adventure of Sammy the Snail",
    pages: [
      {
        text: "Once upon a time, in a magical garden, lived a curious snail named Sammy. Sammy was unlike any other snail in the garden. Sammy had a dream - a dream to see the world beyond the garden.",
        img: "",
      },
      {
        text: "Sammy spent his days exploring the garden, talking to the wise old trees and friendly ladybugs. One day, while chatting with a butterfly named Bella, Sammy shared his dream of adventure.",
        img: "",
      },
      {
        text: "Bella said, 'Why don't you go on an adventure right here in the garden? There's so much to discover and learn!' Sammy thought this was a splendid idea and set off on his very first adventure.",
        img: "",
      },
      {
        text: "Sammy discovered a hidden trail behind the flower bushes. He followed it and found a secret garden with magical glowing flowers. 'Wow!' Sammy exclaimed, mesmerized by the beauty.",
        img: "",
      },
      {
        text: "In this magical garden, Sammy met a wise old snail named Grandpa Sheldon. Grandpa Sheldon shared stories of his own adventures and gave Sammy a special amulet that would guide him on his journey.",
        img: "",
      },
      {
        text: "With the amulet around his neck, Sammy felt a burst of courage. He embarked on a grand adventure, meeting friendly creatures and overcoming challenges. He realized that even small creatures like him could have big adventures.",
        img: "",
      },
      {
        text: "Sammy returned to his garden, filled with excitement and new stories to tell. He knew that his dream of adventure had come true, right in his own backyard.",
        img: "",
      },
      {
        text: "And so, Sammy the Snail continued to have many more exciting adventures in the garden, sharing his tales with all his friends, and inspiring them to dream big too.",
        img: "",
      },
    ],
  },
];

const storedStoriesJSON = localStorage.getItem("stories");

// If stories exists in local storage, retrieve the data use it.
// Otherwise use the hardcoded stories and save it to local storage
if (storedStoriesJSON) {
  // Parse the JSON string back into a JavaScript object
  retrievedStories = JSON.parse(storedStoriesJSON);
  if (stories.length <= retrievedStories.length) {
    console.log("Setting to retrieved stories");
    stories = retrievedStories;
  } else {
    console.log("Setting to database stories");
    localStorage.setItem("stories", JSON.stringify(stories));
  }
  console.log("Stories retrieved", stories);
} else {
  console.log("No stories found in local storage. Adding stories...");
  // Convert the stories object to JSON
  const storiesJSON = JSON.stringify(stories);

  // Save the JSON string to local storage under the key 'stories'
  localStorage.setItem("stories", storiesJSON);
}

const storiesContainer = document.getElementById("stories-container");

function createStoryCard(story, index) {
  console.log(index);
  const storyCard = document.createElement("div");
  storyCard.classList.add("story-card");

  const title = document.createElement("div");
  title.classList.add("book-title");
  title.textContent = story.title;

  const bookOuter = document.createElement("div");
  bookOuter.classList.add("book-outer");
  const book = document.createElement("div");
  book.classList.add("book");
  bookOuter.appendChild(book);

  book.addEventListener("click", () => {
    window.location.href = "story.html?storyIndex=" + index;
  });

  if (story.pages[0].img) {
    image = new Image();
    image.onload = function () {
      book.style.backgroundImage = `url("${this.src}")`;
    };
    image.src = story.pages[0].img;
    console.log("setting background");
  }

  storyCard.appendChild(title);
  storyCard.appendChild(bookOuter);

  return storyCard;
}

function populateStories() {
  let i = 0;
  for (const story of stories) {
    const storyCard = createStoryCard(story, i);
    storiesContainer.appendChild(storyCard);
    i++;
  }
}

// Call the function to populate the stories
populateStories();
