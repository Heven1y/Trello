import React, {useEffect, useRef} from 'react'
import { Button } from 'react-bootstrap'

type EditProps = {
    show:boolean
    close(show:boolean):void
    comment:string
    editComment(comment:string):void
}

export const Edit: React.FC<EditProps> = (props) => {
    useEffect(() => {
        if(props.show){
            props.close(props.show)
        }
    })
    const refEdit = useRef<HTMLInputElement>(null)
    const newComment = () => {
        props.editComment(refEdit.current!.value)
        props.close(false)
    }
    return (
        <>
        <form>
          <div className="form-group">
            <input ref={refEdit} type="text" className="form-control" id="recipient-name" defaultValue={props.comment}/>
            <Button className='redit' onClick={newComment}>Сохранить</Button>
            <Button className='redit' onClick={() => props.close(false)}>Отмена</Button>
          </div>
        </form>
        </>
    );
}