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
let isVoiceMuted = false;

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

const chatPrompts = {
  jess: [
    {
      question:
        "Where does Jess live? Is it in a big city, a small town, or maybe in a magical forest?",
      answer: "She lives in a new planet made of candy",
    },
    {
      question:
        "What is the most amazing adventure or quest that Jess goes on in the candy planet? Is there a special mission or something magical that happens to her?",
      answer: "There's a problem with cavities",
    },
    {
      question:
        "Who are Jess's friends on this candy planet? Do they have any special abilities or qualities that could help them solve the problem of cavities?",
      answer: "She has a gingerbread friend named Ginger",
    },
    {
      question:
        "How does Ginger help Jess and their friends tackle the problem of cavities in the candy planet? Does Ginger have any special skills or ideas to share?",
      answer: "He knows the way to a dentist",
    },
    {
      question:
        "What challenges or obstacles do they face on their journey to find a dentist in the candy planet? Are there any fun or exciting moments along the way?",
      answer: "They see different candy on different planets",
    },
  ],
  nick: [
    {
      question:
        "Where does Nick live? Is it in a big city, a small town, or maybe in a magical forest?",
      answer: "He lives in a treehouse in the enchanted forest",
    },
    {
      question:
        "What is the most amazing adventure or quest that Nick goes on in the enchanted forest? Is there a special mission or something magical that happens to him?",
      answer: "He discovers a hidden treasure guarded by talking animals",
    },
    {
      question:
        "Who are Nick's friends in the enchanted forest? Do they have any special abilities or qualities that could help them find the hidden treasure?",
      answer:
        "His friends are a wise owl, a mischievous squirrel, and a brave rabbit",
    },
    {
      question:
        "How do Nick and his friends outsmart the talking animals and claim the hidden treasure as their own? Do they learn any valuable lessons along the way?",
      answer:
        "They use teamwork and kindness to befriend the animals, and they learn that cooperation is the key to success",
    },
    {
      question:
        "What happens to the hidden treasure once Nick and his friends have it? Does it bring good fortune or unexpected challenges?",
      answer:
        "They use the treasure to improve the enchanted forest and share its benefits with all the magical creatures",
    },
  ],
  winston: [
    {
      question:
        "Where does Winston live? Is it in a big city, a small town, or maybe in a magical forest?",
      answer: "He lives in a bustling big city called Metroville",
    },
    {
      question:
        "What is the most amazing adventure or quest that Winston goes on in Metroville? Is there a special mission or something extraordinary that happens to him?",
      answer:
        "He becomes a superhero and joins forces with other heroes to save the city from a supervillain",
    },
    {
      question:
        "Who are Winston's superhero friends in Metroville? Do they have unique superpowers or gadgets that help them in their mission?",
      answer:
        "His friends are Captain Thunder, Laserbeam Girl, and Techno-Wizard, each with their own incredible abilities",
    },
    {
      question:
        "How do Winston and his superhero friends defeat the supervillain and save Metroville from destruction? Do they face any unexpected challenges along the way?",
      answer:
        "They combine their powers and use teamwork to outsmart the supervillain, but they face several close calls and must stay united",
    },
    {
      question:
        "What does Winston do when there are no supervillains to defeat? Does he use his powers for good in other ways, or does he face new challenges in his everyday life?",
      answer:
        "Winston continues to protect Metroville from threats, but he also uses his abilities to help the community and make the city a better place",
    },
  ],
};

const synth = window.speechSynthesis; // Initialize the speech synthesis

let currentPromptIndex = 0;
let isStoryDisplayed = false;
let isNameSet = false; // To track if the user's name has been set

// Function to display chat messages
function displayMessages() {
  const chatContainer = document.getElementById("chat-container");

  if (!isNameSet) {
    // Display the initial bot message to ask for the user's name
    const initialBotMessage = document.createElement("div");
    initialBotMessage.classList.add("message", "bot");
    initialBotMessage.innerText =
      "Bot: Welcome! Let's create a story together. I'll ask you questions, and you can provide answers. First, please tell me your name (Jess, Nick, or Winston):";
    chatContainer.appendChild(initialBotMessage);

    // Read the initial message aloud
    readAloud(
      "Welcome! Let's create a story together. I'll ask you questions, and you can provide answers. First, please tell me your name (Jess, Nick, or Winston):"
    );

    return;
  }

  // Display the first bot question
  const firstPrompt = chatPrompts.jess[currentPromptIndex];
  const botMessageElement = document.createElement("div");
  botMessageElement.classList.add("message", "bot");
  botMessageElement.innerText = firstPrompt.question;
  chatContainer.appendChild(botMessageElement);

  // Read the first question aloud
  readAloud(firstPrompt.question);
}

// Function to read text aloud
function readAloud(text) {
  if (!isMuted) {
    const utterance = new SpeechSynthesisUtterance(text);
    const typingGif = document.getElementById("typing-gif");

    // Show the typing GIF while speaking
    typingGif.style.display = "inline";

    synth.speak(utterance);

    utterance.onend = function () {
      // Hide the typing GIF when speech synthesis is done
      typingGif.style.display = "none";
    };
  }
}

// Function to handle user input
function handleUserInput() {
  const userInput = document.getElementById("user-input").value;
  const chatContainer = document.getElementById("chat-container");

  if (isStoryDisplayed) {
    // If the story is already displayed, tell the user to try again
    const errorMessageElement = document.createElement("div");
    errorMessageElement.classList.add("message", "bot");
    errorMessageElement.innerText =
      "Bot: Please try again or continue the story.";
    chatContainer.appendChild(errorMessageElement);
    readAloud("Please try again or continue the story.");

    // Clear the input field
    document.getElementById("user-input").value = "";

    toggleVoice();
    return;
  }

  if (userInput) {
    // Display user message
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("message", "user");
    userMessageElement.innerText = `You: ${userInput}`;
    chatContainer.appendChild(userMessageElement);

    if (!isNameSet) {
      // Check if the user input is one of the accepted names
      const name = userInput.toLowerCase();
      if (name === "jess" || name === "nick" || name === "winston") {
        // Set the name and proceed to the next question set
        isNameSet = true;
        currentCharacter = name; // Set the current character
      } else {
        // Ask for the name again if it's not recognized
        const errorMessageElement = document.createElement("div");
        errorMessageElement.classList.add("message", "bot");
        errorMessageElement.innerText =
          "Bot: Please choose a valid name (Jess, Nick, or Winston).";
        chatContainer.appendChild(errorMessageElement);
        readAloud("Please choose a valid name (Jess, Nick, or Winston).");
      }
    }
    if (!isNameSet) {
      // Clear the input field
      document.getElementById("user-input").value = "";

      // Smoothly scroll to the bottom of the chat container
      chatContainer.scrollTop = chatContainer.scrollHeight;
      return;
    }
    if (currentPromptIndex < chatPrompts.jess.length) {
      // Display the next bot prompt based on the chosen name
      const name = isNameSet ? currentCharacter.toLowerCase() : "jess";
      const nextPrompt = chatPrompts[name][currentPromptIndex];
      const botMessageElement = document.createElement("div");
      botMessageElement.classList.add("message", "bot");
      botMessageElement.innerText = nextPrompt.question;
      chatContainer.appendChild(botMessageElement);
      readAloud(nextPrompt.question);
      currentPromptIndex++;
    } else {
      // All prompts answered, display the story
      isStoryDisplayed = true;
      displayStory();
    }

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Smoothly scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

// Function to display the story
// Function to display the story
function displayStory() {
  const chatContainer = document.getElementById("chat-container");

  // Your story content goes here
  let storyContent = "";

  switch (currentCharacter.toLowerCase()) {
    case "jess":
      storyContent = `
  Story 1: This is Jess's story.
  // Insert Jess's story content here.
`;
      break;

    case "nick":
      storyContent = `
  Story 2: This is Nick's story.
  // Insert Nick's story content here.
`;
      break;

    case "winston":
      storyContent = `
  Story 3: This is Winston's story.
  // Insert Winston's story content here.
`;
      break;

    default:
      // Handle the case where an unsupported character name is entered
      storyContent = "Sorry, we couldn't find a story for that character.";
      break;
  }

  // Display the story in the chat container
  const storyMessageElement = document.createElement("div");
  storyMessageElement.classList.add("message", "bot");
  storyMessageElement.innerHTML = `Bot: ${storyContent}`;
  chatContainer.appendChild(storyMessageElement);

  // Read the story aloud
  readAloud(storyContent);

  // Show the "Continue" button
  const continueButton = document.getElementById("continue-button");
  continueButton.style.display = "inline";

  // Smoothly scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
//

// Initialize a variable to track the voice state
//let isVoiceMuted = false;
let isMuted = false; // Track whether speech synthesis is muted

// Function to toggle voice mute/unmute
function toggleVoice() {
  const voiceButton = document.getElementById("voice-button");
  if (isVoiceMuted) {
    // Unmute the voice
    // synth.resume();
    isMuted = false;
    voiceButton.textContent = "Turn Off Voice";
  } else {
    // Mute the voice
    isMuted = true;
    // synth.pause();
    // synth.cancel();
    voiceButton.textContent = "Turn On Voice";
  }

  // Toggle the voice state
  isVoiceMuted = !isVoiceMuted;
}

//
//const synth = window.speechSynthesis; // Initialize the speech synthesis

// Function to toggle mute/unmute
function toggleMute() {
  if (isMuted) {
    // Unmute speech synthesis
    synth.resume();
    isMuted = false;
    document.getElementById("voice-button").textContent = "Turn Off Voice";
  } else {
    // Mute speech synthesis
    synth.cancel(); // Stop any ongoing speech
    isMuted = true;
    document.getElementById("voice-button").textContent = "Turn On Voice";
  }
}

// Add a click event listener to the "Turn Off Voice" button
document.getElementById("voice-button").addEventListener("click", toggleMute);

//

// Function to continue the video
function continueVideo() {
  const video = document.getElementById("video");
  const chatContainer = document.getElementById("chat-container");
  const continueButton = document.getElementById("continue-button");
  const botCharacter = document.getElementById("bot-character");
  const userInput = document.getElementById("user-input");
  const submitButton = document.getElementById("submit-button");
  const typingGif = document.getElementById("typing-gif");
  const storyGenerationContainer = document.getElementById(
    "story-generation-container"
  );

  if (video.style.display === "block") {
    video.pause();
    video.style.display = "none";
    chatContainer.style.display = "block";
    botCharacter.style.display = "block";
    submitButton.style.display = "block";
    userInput.style.display = "block";
    typingGif.style.display = "block";
    // Change button text to "See Video" and pause the video if needed
    continueButton.innerText = "Meet Robby";
    storyGenerationContainer.style.columnGap = "2rem";
  } else {
    // Show the video and change button text to "Close"
    video.style.display = "block";
    chatContainer.style.display = "none";
    botCharacter.style.display = "none";
    submitButton.style.display = "none";
    userInput.style.display = "none";
    typingGif.style.display = "none";
    video.play(); // Play the video
    continueButton.innerText = "Close"; // Change button text to "Close"
    storyGenerationContainer.style.columnGap = "0rem";
  }
}

// Call the function to display chat messages
// added code below for the stories container.
displayMessages();
