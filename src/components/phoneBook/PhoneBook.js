import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import style from './phoneBook.module.css';
import Alert from '../alert/Alert';
import alertTransition from '../../transition/alertTransition.module.css';

class PhoneBook extends Component {
  state = { name: '', number: '', isActive: false };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  contactsVerification = () => {
    return this.props.contacts.some(
      contact => contact.name === this.state.name,
    );
  };

  submitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.contactsVerification()) {
      this.setState({ isActive: true });
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    } else {
      const newContact = { id: uuidv4(), name, number };
      this.props.getContactInfo(newContact);

      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number, isActive } = this.state;
    return (
      <form className={style.contactForm} onSubmit={this.submitForm}>
        <CSSTransition
          in={isActive}
          timeout={250}
          classNames={alertTransition}
          unmountOnExit
        >
          <Alert />
        </CSSTransition>

        <label className={style.contactFormLabel}>
          Name
          <input
            className={style.contactFormInput}
            type="text"
            placeholder="Name..."
            value={name}
            name="name"
            onChange={this.handleChange}
            required
          />
        </label>
        <label className={style.contactFormLabel}>
          Number
          <input
            className={style.contactFormInput}
            placeholder="Tel..."
            type="text"
            value={number}
            name="number"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className={style.contactFormBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

PhoneBook.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getContactInfo: PropTypes.func.isRequired,
};

export default PhoneBook;
