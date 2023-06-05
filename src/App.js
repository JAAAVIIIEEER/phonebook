import React, { useState, useEffect } from 'react'

import { getAll, create, update, deletePerson } from './services/persons_service'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { ErrorNotification, GreatNotification } from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ greatMessage, setGreatMessage ] = useState(null)
    const [ errorMessage, setErrorMessage ] = useState(null)

    useEffect(() => {
        getAll().then(response => {
            setPersons(response)
        })
    }, [])

    useEffect(() => {
        getAll().then(response => {
            setPersons(response)
        })
    }, [newName])

    const submitHandler = (event) => {
        event.preventDefault()
        if(newName === "") 
            alert(`There is no name`)
        else if(newNumber === "")
            alert(`There is no number`)
        else {
            const sameNameObject = persons.some(person => person.name === newName)
            if(sameNameObject) 
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    const personToUpdate = persons.find(person => person.name === newName)
                    update(personToUpdate.id, {
                        ...personToUpdate,
                        number : newNumber
                    }).then(returnedPerson => {
                        setGreatMessage(
                            `Added ${returnedPerson.name}`
                        )
                        setTimeout(() => {
                            setGreatMessage(null)
                        }, 5000)
                        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
                        setNewName("")
                        setNewNumber("")
                      }).catch(error => {
                        setErrorMessage (
                            `Information of ${personToUpdate.name} was already removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                      }) 
                } else {
                    setNewName("")
                    setNewNumber("")
                }
            else {
                const newPerson = {
                    name : newName,
                    number : newNumber
                }
                create(newPerson)
                .then(response => {
                    setGreatMessage(
                        `Added ${response.name}`
                    )
                    setTimeout(() => {
                        setGreatMessage(null)
                    }, 5000)
                    setPersons(prevPersons => prevPersons.concat(response))
                    setNewName("")
                    setNewNumber("")
                })
            }
        } 
    }

    

    const inputNameHandler = (event) => {
        setNewName(event.target.value)
    }

    const inputNumberHandler = (event) => {
        setNewNumber(event.target.value)
    }

    const inputFilterHandler = (event) => {
        setNewFilter(event.target.value)
    }
    
    const deleteHandler = (id) => {
        const nameToDelete = persons.find(person => person.id === id).name
        if (window.confirm(`Delete ${nameToDelete} ?`)) {
            deletePerson(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id))
            }).catch(error => {
                setErrorMessage (
                    `Information of ${nameToDelete} was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }) 

        }
    }


    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <GreatNotification greatMessage = {greatMessage} />
            <ErrorNotification errorMessage = {errorMessage} />
            <Filter inputFilter = {inputFilterHandler} newFilter = {newFilter} />
            <h3>Add a new</h3>
            <PersonForm 
                submit = {submitHandler} 
                inputName = {inputNameHandler} 
                inputNumber = {inputNumberHandler} 
                newName = {newName} 
                newNumber = {newNumber}
            />
            <h3>Numbers</h3>
            <Persons persons = {personsToShow} deleteHandler = {deleteHandler} />
        </div>
    )
}


export { App }