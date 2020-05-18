import React from 'react';
import PropTypes from 'prop-types';
import style from './contactsItem.module.css';

const ContactsItem = ({ contact: { id, name, number }, deleteContact }) => (
  <li className={style.contactsItem}>
    <p className={style.contactName}>{name}</p>
    <p className={style.contactNamber}>{number}</p>

    <button
      className={style.contactsItemBtn}
      type="button"
      id={id}
      onClick={deleteContact}
    >
      X
    </button>
  </li>
);
ContactsItem.propTypes = {
  contact: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default ContactsItem;
