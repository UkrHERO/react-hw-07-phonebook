import React, { useState } from 'react';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import {
  useFetchContactsQuery,
  useDeleteContactsMutation,
  useCreateContactsMutation,
} from './redux/contacts/contacts-slice';

function App() {
  const [createContacts] = useCreateContactsMutation();
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContacts] = useDeleteContactsMutation();
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const dublicate = contacts.some(c => c.name === name);
    if (dublicate) {
      return alert(`${name} is already in contacts.`);
    }
    createContacts({ name, number });
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const filteredContacts = () => {
    if (isFetching) return contacts;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return filteredContacts;
  };
  const filteredData = filteredContacts();

  const deleteContact = id => {
    contacts.filter(contact => contact.id !== id);
    deleteContacts(id);
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filteredData} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
