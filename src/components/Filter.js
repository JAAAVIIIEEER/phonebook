const Filter = ({inputFilter, newFilter}) => {
    return (
        <div>
            filter shown with : <input onChange = {inputFilter} value = {newFilter}/>
        </div>
    )
}

export { Filter }