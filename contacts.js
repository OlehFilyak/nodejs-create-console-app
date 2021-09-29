const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
// console.log(nanoid());

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getAllContacts = async () => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(allContactsJSON);
  return allContacts;
};

const getContactById = async contactId => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const contactById = JSON.parse(allContactsJSON).filter(
    contact => contact.id === contactId,
  );
  return contactById;
};

const removeContact = async contactId => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(allContactsJSON);
  const contactIdx = allContacts.findIndex(contact => contact.id === contactId);
  const removedContact = allContacts.splice(contactIdx, 1);
  // console.log(allContacts);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return `Removing is successful. Contact ${JSON.stringify(
    removedContact,
  )} is deleted`;
};

const addContact = async (name, email, phone) => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  // console.log(allContactsJSON);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  // console.log(newContact);
  let allContacts = JSON.parse(allContactsJSON);
  // console.log(allContacts);
  allContacts.push(newContact);
  const newContactsJSON = JSON.stringify(allContacts);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return `Adding is successful. Contact ${JSON.stringify(newContact)} is added`;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};

// console.log(
//   addContact("Enrico Banucci", "banucci.e@gmail.com", 56644322).then(data =>
//     console.log(data),
//   ),
// );
