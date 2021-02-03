import React, {useState} from 'react'
import {WindowList} from './WindowList'

interface NavbarProps {
  addTable(title:string): void,
  user: string
}

export const Navbar: React.FC<NavbarProps> = (props) => {

  const [modalShow, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">ReactTS</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link add-card" href="#" onClick={handleShow}>Добавить список</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
       <p>Пользователь: {props.user}</p>
      </form>
    </nav>
    <WindowList show={modalShow} onHide={handleClose} addTable={props.addTable}/>
  </>
  );
}