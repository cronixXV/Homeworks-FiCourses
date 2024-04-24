class Reader {
  //значение по умолчанию
  books = [];

  constructor(surname, name, patronymic, readerTicketNumber, birthdayDate, mail) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.readerTicketNumber = readerTicketNumber;
    this.birthdayDate = birthdayDate;
    this.mail = mail;
  }

  receiveBook(books) {
    let newBooks = [];
    let answer = `${this.surname} ${this.name || ""} ${this.patronymic || ""} ${this.readerTicketNumber || ""} взял книги: `;
    for (const book of books) {
      if (!this.books.includes(book)) {
        newBooks.push(book);
      }
      answer += `"${book.bookTitle}", `;
      // проверка
      if (!Array.isArray(books)) {
        return "Отсутствуют книги";
      }
    }
    this.books = [...this.books, ...newBooks];
    return answer.trim().slice(0, -1);
  }

  returnBook(books) {
    let answer = `${this.surname} ${this.name || ""} ${this.patronymic || ""} ${this.readerTicketNumber || ""} вернул книги: `;
    for (const book of books) {
      this.books = this.books.filter(function (oldBook) {
        return oldBook != book;
      });
      answer += `"${book.bookTitle}", `;

      // проверка
      if (!Array.isArray(books)) {
        return "Отсутствуют книги";
      }
    }
    return answer.trim().slice(0, -1);
  }
}
