// 2) შექმენით phone.js და contacts.json ფაილები, თქვენი მიზანია შექმნათ phone cli თული რომელსაც ქნება დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი. node phone.js add 555151515 nika უნდა დაემატოს ეს ნომერი contacts.json ში. გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს არ დაამატოს იგივე ნომერი. წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან. node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.

const fs = require("fs/promises");
const path = require("path");

const isUniquePhone = (contacts, phoneNumber) => {
  if (contacts.findIndex((contact) => contact.phone === phoneNumber) !== -1) {
    return false;
  }
  return true;
};

const contactActions = {
  add: async ({ contacts, phoneNumber, contactName, filePath }) => {
    let id;
    if (contacts.length === 0) {
      id = 1;
    } else {
      if (!isUniquePhone(contacts, phoneNumber)) {
        return console.log("Phone already exists");
      }
      id = contacts[contacts.length - 1].id + 1;
    }
    const contact = {
      id: id,
      phone: phoneNumber,
      name: contactName,
    };
    contacts.push(contact);
    await fs.writeFile(filePath, JSON.stringify(contacts));
  },
  delete: async ({ contacts, phoneNumber, filePath }) => {
    const index = contacts.findIndex(
      (contact) => contact.phone === phoneNumber
    );
    if (index === -1) {
      return console.log("Phone number does not exsists");
    }
    contacts.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts));
  },
  show: ({ contacts }) => {
    console.log(contacts);
  },
};

const getContactAction = (action) => contactActions[action];

const main = async () => {
  const filePath = path.join(__dirname, "data/contacts.json");
  const [, , action, phoneNumber, contactName] = process.argv;
  const data = await fs.readFile(filePath, "utf-8");
  const contacts = JSON.parse(data || "[]");
  const fn = getContactAction(action);
  if (!fn) return;
  await fn({ contacts, phoneNumber, contactName, filePath });
};

main();
