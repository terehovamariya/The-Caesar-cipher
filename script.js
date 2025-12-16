function encryptText() {
  const shift = parseInt(document.getElementById("shift").value);
  const text = document.getElementById("text").value;

  const cipher = new CaesarCipher(shift);
  const encrypted = cipher.encrypt(text);

  document.getElementById("result").innerHTML = `
    <strong>Зашифрованный текст:</strong><br>
    ${encrypted}
  `;
}

function decryptText() {
  const shift = parseInt(document.getElementById("shift").value);
  const text = document.getElementById("text").value;

  const cipher = new CaesarCipher(shift);
  const decrypted = cipher.decrypt(text);

  document.getElementById("result").innerHTML = `
    <strong>Расшифрованный текст:</strong><br>
    ${decrypted}
  `;
}

function bruteForce() {
  const encryptedText = document.getElementById("encryptedText").value;
  const language = document.getElementById("language").value;

  const results = CaesarCipher.bruteForce(encryptedText, language);

  let html = "<strong>Все возможные варианты:</strong><br><br>";
  results.forEach((result) => {
    html += `<strong>Сдвиг ${result.shift}:</strong> ${result.text}<br><br>`;
  });

  document.getElementById("bruteResult").innerHTML = html;
}

function initialize() {
  const cipher = new CaesarCipher(3);
  const testEncrypted = cipher.encrypt("Hello World! Привет, Мир!");
  document.getElementById("encryptedText").value = testEncrypted;

  document.getElementById("encryptBtn").addEventListener("click", encryptText);
  document.getElementById("decryptBtn").addEventListener("click", decryptText);
  document
    .getElementById("bruteForceBtn")
    .addEventListener("click", bruteForce);
}

document.addEventListener("DOMContentLoaded", initialize);
