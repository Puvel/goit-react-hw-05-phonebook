import React, { Component } from 'react';
import '../style.css';
import { CSSTransition } from 'react-transition-group';
import PhoneBook from './phoneBook/PhoneBook';
import ContactsList from './contactsList/ContactsList';
import FilterInput from './filterInput/FilterInput';
import storage from './ui/storage';
import titleAnimation from '../transition/titleAnimation.module.css';
import filterTransition from '../transition/filterTransition.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isShow: false,
  };

  componentDidMount() {
    this.setState({ isShow: true });
    const loadContacts = storage.load('contacts');
    if (loadContacts) {
      this.setState({ contacts: loadContacts });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    storage.save('contacts', contacts);
  }

  getContactInfo = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterInput = e => {
    this.setState({ filter: e.target.value });
  };

  contactsFilter = () => {
    if (this.state.contacts.length > 2) {
      return this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
      );
    }
    return this.state.contacts;
  };

  deleteContact = e => {
    const { id } = e.target;
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }));
  };

  render() {
    const { contacts, filter, isShow } = this.state;
    return (
      <>
        <section className="section">
          <CSSTransition
            in={isShow}
            timeout={500}
            classNames={titleAnimation}
            unmountOnExit
          >
            <h2 className="sectionTitle">Phonebook</h2>
          </CSSTransition>
          <PhoneBook getContactInfo={this.getContactInfo} contacts={contacts} />
        </section>

        <section className="section">
          <h2 className="sectionTitle">Contacts</h2>
          <CSSTransition
            in={contacts.length > 2}
            timeout={250}
            classNames={filterTransition}
            unmountOnExit
          >
            <FilterInput filter={filter} filterInput={this.filterInput} />
          </CSSTransition>
          <ContactsList
            contacts={this.contactsFilter()}
            deleteContact={this.deleteContact}
          />
        </section>
      </>
    );
  }
}

export default App;
