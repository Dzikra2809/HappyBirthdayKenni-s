
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Happy Birthday Honey Kennissa Rojana').split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function removePopup() {
      document.querySelectorAll('.popup-overlay').forEach((el) => el.remove());
    }

    function updateCodeDisplay(code) {
      const dots = document.querySelectorAll('.password-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('filled', idx < code.length);
      });
    }

    function showPasswordPopup() {
      removePopup();
      const overlay = document.createElement('div');
      overlay.className = 'popup-overlay';
      overlay.innerHTML = `
        <div class="popup-card password-card">
          <div class="password-header">
            <h2>Hi love, ayo tebak passwordnya</h2>
            <p>I bet u knoww!!</p>
          </div>
          <div class="password-dots">
            <span class="password-dot"></span>
            <span class="password-dot"></span>
            <span class="password-dot"></span>
            <span class="password-dot"></span>
            <span class="password-dot"></span>
            <span class="password-dot"></span>
          </div>
          <div class="password-keypad"></div>
          <p class="password-clue">clue : your birthday</p>
        </div>
      `;
      document.body.appendChild(overlay);

      const keypad = overlay.querySelector('.password-keypad');
      const code = [];
      const buttons = ['1','2','3','4','5','6','7','8','9','back','0'];

      buttons.forEach((value) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'password-key';
        if (value === 'back') {
          button.innerText = '⌫';
          button.classList.add('password-key-back');
          button.addEventListener('click', () => {
            code.pop();
            updateCodeDisplay(code);
          });
        } else {
          button.innerText = value;
          button.addEventListener('click', () => {
            if (code.length < 6) {
              code.push(value);
              updateCodeDisplay(code);
              if (code.length === 6) {
                setTimeout(() => {
                  window.location.href = 'index_bookmark.html';
                }, 150);
              }
            }
          });
        }
        keypad.appendChild(button);
      });

      updateCodeDisplay(code);
    }

    function showMemoryPopup() {
      removePopup();
      const overlay = document.createElement('div');
      overlay.className = 'popup-overlay';
      overlay.innerHTML = `
        <div class="popup-card">
          <button class="popup-btn">Memory</button>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.querySelector('button').addEventListener('click', showPasswordPopup);
    }

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300);
      } else {
        showMemoryPopup();
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};