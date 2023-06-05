import { Person } from "./Person"

const Persons = ({persons, deleteHandler}) => {
    return (
        <ul>
        {
            persons.map(person => <Person 
                key = {person.id} 
                id = {person.id}
                name = {person.name} 
                number = {person.number} 
                deleteHandler = {deleteHandler}/>)
        }
        </ul>
    )
}

export { Persons }