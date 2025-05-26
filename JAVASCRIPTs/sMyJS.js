// Код за навигација со hover (од твојот оригинален код)
document.addEventListener("DOMContentLoaded", function(){
    if (window.innerWidth > 992) {
        document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){
            everyitem.addEventListener('mouseover', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');
                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    if(nextEl) nextEl.classList.add('show');
                }
            });
            everyitem.addEventListener('mouseleave', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');
                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    if(nextEl) nextEl.classList.remove('show');
                }
            })
        });
    }
});

$(document).ready(function() {

    // Функција за праќање порака до OpenAI API
    function sendMessageToChatGPT(message) {
        if (!message.trim()) return; // не праќај празна порака

        $('#chat-messages').append('<div><strong>Ти:</strong> ' + $('<div>').text(message).html() + '</div>');
        $('#chat-input').val(''); // исчисти полето

        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE',  // <-- Замени го со твојот API клуч
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }]
            }),
            success: function(response) {
                var gptMessage = response.choices[0].message.content;
                $('#chat-messages').append('<div><strong>ChatGPT:</strong> ' + $('<div>').text(gptMessage).html() + '</div>');
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight); // скрол до дното
            },
            error: function(xhr, status, error) {
                $('#chat-messages').append('<div><strong>ChatGPT:</strong> Грешка при комуникација со серверот.</div>');
            }
        });
    }

    // Клик на копчето "Прати"
    $('#send').click(function () {
        var msg = $('#chat-input').val();
        sendMessageToChatGPT(msg);
    });

    // Испрати порака со Enter
    $('#chat-input').keypress(function(e) {
        if (e.which == 13) {
            $('#send').click();
        }
    });
});
