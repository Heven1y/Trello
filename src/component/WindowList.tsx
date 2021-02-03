import React, {useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'

interface ListProps {
  show:boolean, 
  onHide:any,
  addTable(title:string): void,
  oldTitle?:string
}

export const WindowList: React.FC<ListProps> = (props) => {

    //const [title, setTitle] = useState<string>('')
    //const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
     //   setTitle(event.target.value)
    //}
    const ref = useRef<HTMLInputElement>(null)
    const saveTitle = () => {
        let nameBorder = {
          title: ref.current!.value
        }
        props.addTable(nameBorder.title)
        ref.current!.value = ''
        props.onHide()
    }


    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Колонка
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="title" className="col-form-label">Введите название колонки:</label>
            <input ref={ref} type="text" className="form-control" id="title" maxLength={20} defaultValue={props.oldTitle}/>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveTitle}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
    );
}