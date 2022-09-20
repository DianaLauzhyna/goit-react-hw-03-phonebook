import { Component } from "react";
import { nanoid } from "nanoid";

import { Section, ContactForm, Filter, ContactList } from "./components";
import { handleInputChange } from "./utils";

import { Wrapper, PageHeader } from "./App.styled";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleFilterInputChange = handleInputChange.bind(this);

  addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };
    const { name } = newContact;

    this.checkDuplicatedContacts(name)
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  checkDuplicatedContacts = (validatedName) =>
    this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === validatedName.toLowerCase()
    );

  render() {
    const { filter } = this.state;
    const {
      addContact,
      handleFilterInputChange,
      filterContacts,
      deleteContact,
    } = this;

    return (
      <Wrapper>
        <PageHeader>Phonebook</PageHeader>
        <ContactForm onSubmit={addContact} />
        <Section header={"Contacts"}>
          <Filter value={filter} onChange={handleFilterInputChange}>
            Find contacts by name
          </Filter>
          <ContactList
            contacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </Section>
      </Wrapper>
    );
  }
}
