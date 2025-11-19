// 1) Todo App კლასი
// მოთხოვნები: Todo (id, title, isDone, createdAt), TodoList კლასში მეთოდები: დაამატე, წაშალე(id), მონიშნეComo შესრულებული(id), დააბრუნეTodos(ფილტრი: all/active/done), getAllTodos({active: true}) => actives, getAllTodos({active: true}) => not active, getAllTodos() => all todos.

class TodoList {
  #todos = [];
  #id = 0;
  add(title) {
    this.idIncrement();
    const todo = {
      id: this.#id,
      title: title,
      isDone: false,
      createdAt: new Date().toISOString(),
    };
    this.#todos.unshift(todo);
    return this;
  }
  delete(id) {
    const index = this.findTodoIndex(id);
    if (index === -1) {
      throw new Error("Todo task was not found");
    }
    this.#todos.splice(index, 1);
    return this;
  }
  markAsDone(id) {
    const index = this.findTodoIndex(id);
    if (index === -1) {
      throw new Error("Todo task was not found");
    }
    this.#todos[index].isDone = true;
    return this;
  }

  getAllTodos(filter = null) {
    if (filter && filter.active === true) {
      return this.#todos.filter((todo) => todo.isDone === false);
    }
    if (filter && filter.active === false) {
      return this.#todos.filter((todo) => todo.isDone === true);
    }
    return this.#todos;
  }

  findTodoIndex(id) {
    return this.#todos.findIndex((todo) => todo.id === id);
  }
  idIncrement() {
    this.#id++;
  }
}

const todos = new TodoList();
console.log(todos.getAllTodos());
todos
  .add("first task")
  .add("2 task")
  .add("3 task")
  .add("4 task")
  .delete(3)
  .markAsDone(1);
console.log(todos.getAllTodos(), "all");
console.log(todos.getAllTodos({ active: true }), "active");
console.log(todos.getAllTodos({ active: false }), "done");

// 2) Shoppinc Cart კლასი
// მეთოდები: addToCart(), removeFromCart(), calculateTotalPrice(), updateItem()

class ShoppingCart {
  #shoppingCart = [];
  #id = 0;

  addToCart(title, price, quantity = 1) {
    const item = {
      id: ++this.#id,
      title: title,
      price: price,
      quantity: quantity,
    };
    this.#shoppingCart.push(item);
    return this;
  }
  removeFromCart(id) {
    const index = this.findTodoIndex(id);
    if (index === -1) {
      throw new Error("The item was not found in the cart");
    }
    this.#shoppingCart.splice(index, 1);
    return this;
  }
  calculateTotalPrice() {
    return this.#shoppingCart.reduce(
      (totalPrice, item) => totalPrice + item.price,
      0
    );
  }
  updateItem(id, quantity) {
    const index = this.findTodoIndex(id);
    if (index === -1) {
      throw new Error("The item was not found in the cart");
    }
    if (quantity <= 0) {
      this.removeFromCart(id);
    } else {
      this.#shoppingCart[index].quantity = quantity;
    }
    return this;
  }

  findTodoIndex(id) {
    return this.#shoppingCart.findIndex((item) => item.id === id);
  }
  getAllCartItems() {
    return this.#shoppingCart;
  }
}

const shoppingCart = new ShoppingCart();
console.log(shoppingCart.calculateTotalPrice(), "total");
shoppingCart
  .addToCart("Iphone 15", 1500)
  .addToCart("Samsung galaxy", 1500)
  .addToCart("Laptop", 3500)
  .updateItem(1, 2)
  .updateItem(2, 4);
console.log(shoppingCart.calculateTotalPrice(), "total");
console.log(shoppingCart.getAllCartItems(), "shopping cart");

// 3) Library კლასი რომელიც შეინახავს წიგნების მასივს.
// მეთოდები: addBook(), removeBook(), listBooks() ამას შეიძლება გადაეცეს სორტი მაგალითად წამოიღეთ წიგნები გამოშვების წლის მიხედვით.

class Library {
  #books = [];
  #id = 0;
  addBook(title, price, releaseDate) {
    const book = {
      id: ++this.#id,
      title: title,
      price: price,
      releaseDate: releaseDate,
    };
    this.#books.push(book);
    return this;
  }
  removeBook(id) {
    const index = this.findBookIndex(id);
    if (index === -1) {
      throw new Error("The book was not found in the Library");
    }
    this.#books.splice(index, 1);
    return this;
  }
  listBooks(sort = null) {
    const books = [...this.#books];

    if (sort) {
      books.sort((a, b) => {
        if (typeof a[sort] === "string") {
          return a[sort].localeCompare(b[sort]);
        }
        return a[sort] - b[sort];
      });
    }

    return books;
  }

  findBookIndex(id) {
    return this.#books.findIndex((book) => book.id === id);
  }
}

const library = new Library();
library
  .addBook("Book 1", 22, "2008-05-12")
  .addBook("Book 2", 33, "2020-01-16")
  .addBook("Book 3", 52, "2015-08-04")
  .addBook("Book 4", 21, "1997-09-22");
console.log(library.listBooks());
console.log(library.listBooks("price"));
console.log(library.listBooks("releaseDate"));
library.removeBook(1).removeBook(3);
console.log(library.listBooks());

// 4) ContactManager კლასი
// უნდა ჰქონდეს შემდეგი მეთოდები:
// addNewContact() // სახელი, ნომერი, იმეილი დაადეთ ვალიდაცია რომ 2 ერთი და იგივე იმეილის კონტაქტი ვერ უნდა შექმნათ, ვერც ორი ერთი და იგივე ნომერი
// viewAllContacts(), updatePhone(), deleteContact()
class ContactManager {
  #contacts = [];
  #id = 0;

  addNewContact(name, phone, email) {
    this.validate(name, phone, email);

    const contact = {
      id: ++this.#id,
      name,
      phone,
      email,
    };
    this.#contacts.push(contact);
    return this;
  }
  viewAllContacts() {
    return this.#contacts;
  }
  updatePhone(phone, newPhone) {
    if (!this.hasContactWithPhoneNumber(phone)) {
      throw new Error("the phone number does not exists");
    }
    this.validatePhone(newPhone);
    const index = this.#contacts.findIndex(
      (contact) => contact.phone === phone
    );
    this.#contacts[index].phone = newPhone;
    return this;
  }
  deleteContact(id) {
    const index = this.#contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new Error("the contact does not exists");
    }
    this.#contacts.splice(index, 1);
    return this;
  }

  validate(name, phone, email) {
    this.validateName(name);
    this.validatePhone(phone);
    this.validateEmail(email);
  }
  validateName(name) {
    if (name.trim() === "") {
      throw new Error("name can't be an empty string");
    }
  }
  validatePhone(phone) {
    if (this.hasContactWithPhoneNumber(phone)) {
      throw new Error("The contact with the similar phone is registered");
    }
  }
  validateEmail(email) {
    if (this.hasContactWithEmail(email)) {
      throw new Error("The contact with the similar email is registered");
    }
  }
  hasContactWithPhoneNumber(phone) {
    return this.#contacts.some((contact) => contact.phone === phone);
  }
  hasContactWithEmail(email) {
    return this.#contacts.some((contact) => contact.email === email);
  }
}

const contacts = new ContactManager();
console.log(contacts.hasContactWithPhoneNumber("2134213"));
contacts
  .addNewContact("John Doe 1", "00000000", "test@test.ge")
  .addNewContact("John Doe 2", "11111111", "test2@test.ge")
  .addNewContact("John Doe 3", "22222222", "test3@test.ge");

console.log(contacts.viewAllContacts(), "all contacts");
contacts.updatePhone("00000000", "88888888").deleteContact(2);
console.log(contacts.viewAllContacts(), "all contacts");
