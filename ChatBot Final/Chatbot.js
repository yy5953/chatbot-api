let input = document.querySelector('.userInput');
let getBtn = document.querySelector('.getBtn');
let allChats = document.querySelector('.all-chats');
let noMsgImg = allChats.querySelector('.no-chat-img');
let noMsgtxt = allChats.querySelector('.no-chat-txt');
let apiKey = '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';

let getResponse = async() => {
    noMsgImg.style.display = 'none';
    noMsgtxt.style.display = 'none';

    const message = input.value;
    input.value = '';
    allChats.innerHTML += `  <div class="sent-ques">
      <li class="sent">
       ${message}
      </li>      
   </div>`;

    const response = await axios.post(
        "https://api.openai.com/v1/completions", {
            prompt: message,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }, {
            headers: {
                "Content-Type": " application/json",
                Authorization: `Bearer ${apiKey}`
            },
        }
    )
    const chatBotResponse = response.data.choices[0].text;
    allChats.innerHTML += `<div class="receive">
          <img src="chatbot.png" alt="">
     <li class="response">
             ${chatBotResponse}</li>
    </div>`;
    allChats.scrollTo(0, allChats.scrollHeight);
}

getBtn.addEventListener('click', () => {
    if (input.value != '') {
        getResponse();
    }
})