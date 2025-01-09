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