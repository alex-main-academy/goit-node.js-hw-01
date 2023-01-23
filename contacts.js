const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    console.log(result.toString());
  } catch (e) {
    console.log(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsArray = await JSON.parse(
      (await fs.readFile(contactsPath)).toString()
    );

    const contactById = await contactsArray.filter(
      (elem) => elem.id === contactId
    );

    console.log(contactById);
  } catch (e) {
    console.log(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsArray = await JSON.parse(
      (await fs.readFile(contactsPath)).toString()
    );

    const contactIndex = contactsArray.findIndex(
      (elem) => elem.id === contactId
    );

    contactsArray.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  } catch (e) {
    console.log(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsArray = await JSON.parse(
      (await fs.readFile(contactsPath)).toString()
    );

    const data = {
      name,
      email,
      phone,
    };

    contactsArray.push(data);

    console.log(data);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
