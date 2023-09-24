const input = document.getElementById('input');
const btn = document.getElementById('btn');

btn.addEventListener('click', function(event) {
    if(input.value.length < 3) {
        event.preventDefault();
        alert('Please tell us your full name, we\'d like to know you')
    }
})

