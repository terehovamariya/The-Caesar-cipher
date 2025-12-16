class CaesarCipher {
  constructor(shift = 3) {
    this.shift = shift;
    this.ruAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    this.enAlphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  _getAlphabet(char) {
    const lowerChar = char.toLowerCase();
    if (this.ruAlphabet.includes(lowerChar)) {
      return {
        alphabet: this.ruAlphabet,
        isUpperCase: char === char.toUpperCase() && char !== char.toLowerCase(),
      };
    } else if (this.enAlphabet.includes(lowerChar)) {
      return {
        alphabet: this.enAlphabet,
        isUpperCase: char === char.toUpperCase() && char !== char.toLowerCase(),
      };
    }
    return null;
  }

  _encryptChar(char) {
    const alphabetInfo = this._getAlphabet(char);

    if (!alphabetInfo) {
      return char;
    }

    const { alphabet, isUpperCase } = alphabetInfo;
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);
    const newIndex = (index + this.shift) % alphabet.length;
    const encryptedChar = alphabet[newIndex];

    return isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
  }

  _decryptChar(char) {
    const alphabetInfo = this._getAlphabet(char);

    if (!alphabetInfo) {
      return char;
    }

    const { alphabet, isUpperCase } = alphabetInfo;
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);
    const newIndex = (index - this.shift + alphabet.length) % alphabet.length;
    const decryptedChar = alphabet[newIndex];

    return isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
  }

  encrypt(text) {
    return text
      .split("")
      .map((char) => this._encryptChar(char))
      .join("");
  }

  decrypt(text) {
    return text
      .split("")
      .map((char) => this._decryptChar(char))
      .join("");
  }

  static bruteForce(encryptedText, language = "ru") {
    const results = [];
    const maxShift = language === "ru" ? 33 : 26;

    for (let shift = 1; shift < maxShift; shift++) {
      const cipher = new CaesarCipher(shift);
      const decrypted = cipher.decrypt(encryptedText);
      results.push({
        shift: shift,
        text: decrypted,
      });
    }

    return results;
  }
}
