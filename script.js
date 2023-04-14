// Получаем элементы, с которыми будем работать
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const secondsInput = document.getElementById('seconds');


// Инициализируем переменные
let startTime, elapsedTime = 0, timerInterval;

// Функция для форматирования времени
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Функция, которая будет вызываться каждую миллисекунду
function updateTimer() {
  const currentTime = Date.now();
  elapsedTime += currentTime - startTime;
  startTime = currentTime;

  timerDisplay.textContent = formatTime(elapsedTime);

      if (elapsedTime >= secondsInput.value * 1000) {
            document.body.style.backgroundColor = 'red';
          }

      if (elapsedTime >= 60000) {
        document.body.style.backgroundColor = 'green';
      }

      if (elapsedTime >= secondsInput.value * 1000 + 60000) {
            document.body.style.backgroundColor = 'red';
          }

          for (let i=2; i<60; i++) {
      if (elapsedTime >= 60000 * i) {
        document.body.style.backgroundColor = 'green';
      }

      if (elapsedTime >= secondsInput.value * 1000 + 60000 * i) {
        document.body.style.backgroundColor = 'red';
      }
      }

          if (elapsedTime >= 300000) {
            document.body.style.backgroundColor = 'yellow';
          }
}

// Функция для запуска секундомера
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 10);
}

// Функция для остановки секундомера
function stopTimer() {
  clearInterval(timerInterval);
}

// Функция для сброса секундомера
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = formatTime(elapsedTime);
  document.body.style.backgroundColor = '';
}

// Назначаем обработчики событий для кнопок
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Назначаем обработчик события для поля ввода времени
secondsInput.addEventListener('input', () => {
  resetTimer();
});
