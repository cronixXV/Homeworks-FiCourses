class Reader {
  //значения по умолчанию
  surname = null;
  name = null;
  patronymic = null;
  readerTicketNumber = null;
  birthdayDate = null;
  mail = null;
  books = [];

  constructor(surname, name, patronymic, readerTicketNumber, birthdayDate, mail) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.readerTicketNumber = readerTicketNumber;
    this.birthdayDate = birthdayDate;
    this.mail = mail;
    this.books = [];
  }

  receiveBook(books) {
    let newBooks = [];
    let answer = `${this.surname} ${this.name || ""} ${this.patronymic || ""} ${this.readerTicketNumber || ""} взял книги: `;
    for (const book of books) {
      if (!this.books.includes(book)) {
        newBooks.push(book);
      }
      answer += `"${book.bookTitle}", `;
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
    }
    return answer.trim().slice(0, -1);
  }
}
