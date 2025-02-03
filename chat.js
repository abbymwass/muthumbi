document.getElementById('chat-form').addEventListener('submit',function(event) {
    event.preventDefault();
    //Get user input
    const userInput=document.getElementById('user-input').Value;

    //Display user Message
    const chatBox = document.getElementById('chat-box');
    const userMessage =document.createElement('div');
    userMessage.classList.add('message','user');
    userMessage.textContent=userInput;
    chatBox.appendChild(userMessage);

    //Clear the input field
    document.getElementById('user-input').value='';

    //Scroll chatbox to the bottom
    chatBox.scrollTop =chatBox.scrollHeight;

    //Make API call to get chatbot response
    fetch('YOUR_CHATBOT_API_ENDPOINT',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authourization': 'Bearer YOUR_API_KEY'//
            // Optional:Add your Api key if needed
        },
        body:JSON.stringify({message:userInput})
        //Send the user's input to the API
    })
    .then(response =>response.json())
    .then(data =>{
        //Display the chatsbot's response
        const assistantMessage=document.createElement('div');
        assistantMessage.classList.add('message','asistant');
        assistantMessage.textContent=data.reply;
        //Adjust nased on your API's response format
        chatBox.appendChild(assistantMessage);

        //Scroll chatbox to the bottom
        chatBox.scrollTop=chatBox.scrollHeight;
    })
    .catch(error=>{
        console.error('Error:',error);
        const errorMessage=
        document.createElement('div');
        errorMessage.classList.add('message','assistant');
        errorMessage.textContent='Oops! Something went wrong.Please try again later.';
        chatBox.appendChild(errorMessage);
    });


    });


    // //Stimulate assistsnt response
    // const assistantMessage =
    // document.createElement('div');
    // assistantMessage.classList.add('message','assistant');
    // assistantMessage.textContent ='You said: "${userInput}"';//Replace with actual logic to connect to a chatbox
    // setTimeout(() =>{
    //     chatBox.appendChild(assistantMessage);
    // },1000);
    // })
