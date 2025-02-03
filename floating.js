 
// Predefined Responses
// onst botResponses = {
//     hello: "Hi there! How can I assist you today?",
//     help: "Sure! What do you need help with?",
//     price: "Our prices are competitive. Could you specify the service you're inquiring about?",
//     goodbye: "Goodbye! Have a great day!",
//     default: "I'm sorry, I didn't understand that. Could you rephrase?"
//   };
  
//   // Toggle Chat Window
//   function toggleChat() {
//     const chatWindow = document.getElementById("chat-window");
//     chatWindow.style.display =
//       chatWindow.style.display === "none" || chatWindow.style.display === ""
//         ? "flex"
//         : "none";
//   }
  
//   // Send Message
//   function sendMessage(event) {
//     // Check if 'Enter' was pressed or the Send button was clicked
//     if (event.type === "keypress" && event.key !== "Enter") return;
  
//     const input = document.getElementById("chat-input");
//     const messages = document.getElementById("chat-messages");
  
//     if (input.value.trim() !== "") {
//       const userMessage = input.value.trim().toLowerCase();
  
//       // Add user message to chat
//       const userMessageDiv = document.createElement("div");
//       userMessageDiv.style.margin = "5px 0";
//       userMessageDiv.style.padding = "8px";
//       userMessageDiv.style.borderRadius = "8px";
//       userMessageDiv.style.backgroundColor = "#e1f0ff";
//       userMessageDiv.style.alignSelf = "flex-end";
//       userMessageDiv.textContent = input.value;
//       messages.appendChild(userMessageDiv);
  
//       // Clear the input field
//       input.value = "";
  
//       // Generate bot response
//       setTimeout(() => {
//         const botMessageDiv = document.createElement("div");
//         botMessageDiv.style.margin = "5px 0";
//         botMessageDiv.style.padding = "8px";
//         botMessageDiv.style.borderRadius = "8px";
//         botMessageDiv.style.backgroundColor = "#f0f0f0";
//         botMessageDiv.style.alignSelf = "flex-start";
  
//         // Check for matching predefined response or use default
//         botMessageDiv.textContent =
//           botResponses[userMessage] || botResponses.default;
  
//         messages.appendChild(botMessageDiv);
//         messages.scrollTop = messages.scrollHeight; // Auto-scroll to bottom
//       }, 1000);
//     }
//   }
// Predefined bot responses
const botResponses = { 
  hello: "Hi there! How can I assist you today?",
  help: "Sure! What do you need help with?",
  price: "Our prices are competitive. Could you specify the service you're inquiring about?",
  goodbye: "Goodbye! Have a great day!",
  default: "I'm sorry, I didn't understand that. Could you rephrase?"
};

// Function to open WhatsApp chat instead of chatbot window
function toggleChat() {
  // Replace '2547XXXXXXXX' with your actual WhatsApp number (use international format without '+')
  window.location.href = "https://wa.me/254725596227";
}

// Send Message Function (if chatbot mode is enabled later)
function sendMessage(event) {
  if (event.type === "keypress" && event.key !== "Enter") return;

  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (input.value.trim() !== "") {
      const userMessage = input.value.trim().toLowerCase();

      // Add user message to chat
      const userMessageDiv = document.createElement("div");
      userMessageDiv.style.margin = "5px 0";
      userMessageDiv.style.padding = "8px";
      userMessageDiv.style.borderRadius = "8px";
      userMessageDiv.style.backgroundColor = "#e1f0ff";
      userMessageDiv.style.alignSelf = "flex-end";
      userMessageDiv.textContent = input.value;
      messages.appendChild(userMessageDiv);

      // Clear input field
      input.value = "";

      // Generate bot response
      setTimeout(() => {
          const botMessageDiv = document.createElement("div");
          botMessageDiv.style.margin = "5px 0";
          botMessageDiv.style.padding = "8px";
          botMessageDiv.style.borderRadius = "8px";
          botMessageDiv.style.backgroundColor = "#f0f0f0";
          botMessageDiv.style.alignSelf = "flex-start";
          botMessageDiv.textContent = botResponses[userMessage] || botResponses.default;
          messages.appendChild(botMessageDiv);
          messages.scrollTop = messages.scrollHeight;
      }, 1000);
  }
}
