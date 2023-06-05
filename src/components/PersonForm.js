const PersonForm = ({submit, inputName, inputNumber, newName, newNumber}) => {
    return (
        <form onSubmit={submit}>
                <div>
                    name : <input onChange = {inputName} value = {newName}/>
                </div>
                <br></br>
                <div>
                    number : <input onChange = {inputNumber} value = {newNumber}/>
                </div>
                <br></br>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export { PersonForm }