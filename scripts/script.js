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
  ];
  
  const storedStoriesJSON = localStorage.getItem("stories");
  
  // If stories exists in local storage, retrieve the data use it.
  // Otherwise use the hardcoded stories and save it to local storage
  if (storedStoriesJSON) {
    // Parse the JSON string back into a JavaScript object
    stories = JSON.parse(storedStoriesJSON);
    console.log("Stories retrieved", stories);
  } else {
    console.log("No stories found in local storage. Adding stories...");
    // Convert the stories object to JSON
    const storiesJSON = JSON.stringify(stories);
  
    // Save the JSON string to local storage under the key 'stories'
    localStorage.setItem("stories", storiesJSON);
  }
  
  const storiesContainer = document.getElementById("stories-container");
  
  function createStoryCard(story) {
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
    for (const story of stories) {
      const storyCard = createStoryCard(story);
      storiesContainer.appendChild(storyCard);
    }
  }
  
  // Call the function to populate the stories
  populateStories();