import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
    const [names, setNames] = useState({
        name1: "",
        name2: ""
    })

    const [relationship, setRelationship] = useState("");

    function logic(str1, str2) {
        let arr1 = str1.trim().toLowerCase().split("")
        let arr2 = str2.trim().toLowerCase().split("")
        let temp1 = [...arr1];
        let temp2 = [...arr2];
        for (let i = 0; i < arr1.length; i++) {
            let index = temp2.indexOf(arr1[i]);
            if (index !== -1) {
                temp1[i] = '';
                temp2[index] = '';
            }
        }
        let count = temp1.join('').length + temp2.join('').length;
        return count % 6
    }

    function handleChange(e) {
        setNames({ ...names, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { name1, name2 } = names
        let val = logic(name1, name2)
        if (name1 === "" || name2 === "") {
            setRelationship("Please enter valid input")
            return;
        }
        switch (val) {
            case 0:
                setRelationship("Siblings")
                break;
            case 1:
                setRelationship("Friends")
                break;
            case 2:
                setRelationship("Love")
                break;
            case 3:
                setRelationship("Affection")
                break;
            case 4:
                setRelationship("Marriage")
                break;
            case 5:
                setRelationship("Enemy")
                break;
            default:
                setRelationship("")
                break;
        }
    }

    function handleClear(e) {
        e.preventDefault();
        e.stopPropagation();
        setNames({
            name1: "",
            name2: ""
        })
        setRelationship("");
    }

    return (
        <div id="main">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter first name" data-testid="input1" name="name1" value={names.name1} onChange={handleChange} />&nbsp;
                <input type="text" placeholder="Enter second name" data-testid="input2" name="name2" value={names.name2} onChange={handleChange} />&nbsp;
                <button type="submit" data-testid="calculate_relationship" name="calculate_relationship">Calculate Relationship Future</button>&nbsp;
                <button data-testid="clear" name="clear" onClick={handleClear}>Clear</button>
            </form>
            <h3 data-testid="answer">{relationship}</h3>
        </div>
    )
}


export default App;
