// Обработка отправки формы
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Проверяем, заполнены ли поля
    if (name && email) {
        alert(`Спасибо, ${name}! Мы свяжемся с вами по адресу ${email}.`);
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});


// Анимация появления секций
const sections = document.querySelectorAll('section');

function showSectionsOnScroll() {
    const triggerBottom = window.innerHeight / 1.2;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', showSectionsOnScroll);


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Проверяем, заполнены ли поля
    if (name && email && message) {
        // Отправляем данные на сервер
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
                    alert(`Tack, ${name}! Ditt meddelande har skickats.`); // "Спасибо, [имя]! Ваше сообщение отправлено."
                    document.querySelector('form').reset(); // Очистить форму
                } else {
                    alert(data.message); // Показываем сообщение об ошибке
                }
            })
            .catch(error => {
                console.error('Fel:', error);
                alert('Ett fel uppstod. Försök igen senare.'); // "Произошла ошибка. Попробуйте позже."
            });
    } else {
        alert('Vänligen fyll i alla fält.'); // "Пожалуйста, заполните все поля."
    }
});


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Проверяем, заполнены ли поля
    if (name && email && message) {
        // Отправляем данные на сервер
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
                    // Скрываем форму и показываем подтверждение
                    const form = document.querySelector('form');
                    const confirmation = document.createElement('p');

                    confirmation.textContent = `Tack, ${name}! Ditt meddelande har skickats.`; // "Спасибо, [имя]! Ваше сообщение отправлено."
                    confirmation.style.color = 'green';
                    confirmation.style.fontSize = '1.2rem';
                    confirmation.style.marginTop = '20px';

                    form.replaceWith(confirmation); // Заменяем форму на сообщение
                } else {
                    alert(data.message); // Показываем сообщение об ошибке
                }
            })
            .catch(error => {
                console.error('Fel:', error);
                alert('Ett fel uppstod. Försök igen senare.'); // "Произошла ошибка. Попробуйте позже."
            });
    } else {
        alert('Vänligen fyll i alla fält.'); // "Пожалуйста, заполните все поля."
    }
});

if (data.success) {
    const confirmation = document.createElement('p');
    confirmation.textContent = `Tack! Ditt meddelande har skickats.`; // "Ваше сообщение отправлено."
    confirmation.style.color = 'green';
    confirmation.style.fontSize = '1.2rem';
    confirmation.style.marginTop = '20px';

    const form = document.querySelector('form');
    form.replaceWith(confirmation);
}