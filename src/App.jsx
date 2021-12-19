import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import {
  fetchContacts,
  deleteContacts,
  createContacts,
} from './redux/contacts/contacts-operations';
import contactsActions from '../src/redux/contacts/contacts-actions';
import {
  getContactsFiltered,
  getFilter,
} from '../src/redux/contacts/contacts-selectors';

function App() {
  const contacts = useSelector(getContactsFiltered);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchContacts()), [dispatch]);

  const addContact = (name, number) => {
    const dublicate = contacts.some(c => c.name === name);
    if (dublicate) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(createContacts({ name, number }));
  };

  const changeFilter = e =>
    dispatch(contactsActions.changeFilter(e.currentTarget.value));

  const deleteContact = id => {
    dispatch(deleteContacts(id)).then(() => {
      dispatch(fetchContacts());
    });
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
