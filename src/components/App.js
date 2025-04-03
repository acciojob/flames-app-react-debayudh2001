import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
    const [names, setNames] = useState({
        name1: "",
        name2: ""
    })

    const [relationship, setRelationship] = useState("");

    function logic(str1, str2) {
        str1 = str1.toLowerCase()
        str2 = str2.toLowerCase()
        let map1 = new Map()
        let map2 = new Map()
        for (let v of str1) {
            if (map1.has(v)) {
                map1.set(v, map1.get(v) + 1)
            } else {
                map1.set(v, 1)
            }
        }
        for (let v of str2) {
            if (map2.has(v)) {
                map2.set(v, map2.get(v) + 1)
            } else {
                map2.set(v, 1)
            }
        }
        let obj1 = Object.fromEntries(map1)
        let obj2 = Object.fromEntries(map2)
        let count = 0
        for (let char in obj1) {
            if (obj2[char]) {
                count += Math.abs(obj1[char] - obj2[char])
            } else {
                count += obj1[char]
            }
        }
        for (let char in obj2) {
            if (!obj1[char]) {
                count += obj2[char]
            }
        }
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
