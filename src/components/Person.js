const Person = ({id, name, number, deleteHandler}) => {
    return (
        <li> { name } { number } <button onClick={() => deleteHandler(id)}>delete</button></li>
    )
}

export { Person }