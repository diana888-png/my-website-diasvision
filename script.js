document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    // Hämtar data från formuläret
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Kontrollera att alla fält är ifyllda
    if (name && email && message) {
        // Skicka data till servern
        fetch('send_mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Ersätter formuläret med en bekräftelse
                const form = document.querySelector('form');
                const confirmation = document.createElement('p');
                confirmation.textContent = data.message; // Meddelandet från PHP
                confirmation.style.color = 'green';
                confirmation.style.fontSize = '1.2rem';
                confirmation.style.marginTop = '20px';

                form.replaceWith(confirmation);
            } else {
                alert(data.message); // Visar felmeddelandet från PHP
            }
        })
        .catch(error => {
            console.error('Fel:', error);
            alert('Ett fel inträffade. Försök igen senare.'); // Om ett fel inträffar
        });
    } else {
        alert('Fyll i alla fält.'); // Om fält saknas
    }
});