document.addEventListener("DOMContentLoaded", function(){
    if (window.innerWidth > 992) {

        document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){

            everyitem.addEventListener('mouseover', function(e){

                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    nextEl.classList.add('show');
                }

            });
            everyitem.addEventListener('mouseleave', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    nextEl.classList.remove('show');
                }


            })
        });

    }
});


$(document).ready(function() {
    $('#avatar').click(function() {
        $('#chat-container').toggle();
    });


    $('#chat-input').keypress(function(e) {
        console.log("povik")
        if (e.which == 13) {
            var userMessage = $(this).val();
            $(this).val('');
            $('#chat-messages').append('<div><strong>Ти:</strong> ' + userMessage + '</div>');
            sendMessageToChatGPT(userMessage);
        }
    });


    function sendMessageToChatGPT(message) {
        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer sk-proj-YL2gLZkSJVYoLyqs6oigT3BlbkFJR12MMR2CmU7OyknHFPWM',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                model: "gpt-4",
                messages: [{"role": "user", "content": message}]
            }),
            success: function(response) {
                var gptMessage = response.choices[0].message.content;
                $('#chat-messages').append('<div><strong>ChatGPT:</strong> ' + gptMessage + '</div>');
            },
            error: function() {
                $('#chat-messages').append('<div><strong>ChatGPT:</strong> Грешка при комуникација со серверот.</div>');
            }
        });
    }
});


