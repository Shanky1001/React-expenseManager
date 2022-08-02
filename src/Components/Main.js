import React, { useState } from 'react';
import './main.css';

const Main = () => {

    var [arr, setArr] = useState([]);
    var [balance, setBalance] = useState(0);
    const expenseContainer = () => {
        document.querySelector("#formContainer").style = "display:block;"
    }
    const moneyContainer = () => {
        document.querySelector("#addMoneyContainer").style = "display:block;"
    }
    const cross = () => {
        document.querySelector("#formContainer").style = "display:none;"
        document.querySelector("#addMoneyContainer").style = "display:none;"
    }
    const addMoney = (e) => {
        e.preventDefault();
        const inp = Number(document.querySelector("#moneyAdd").value);
        const notes = document.querySelector("#notes").value;
        if (inp == "") {
            document.querySelector("#warn").innerHTML = "Enter some money.";
            document.querySelector("#warn").style = "color:red";
        } else {
            var bal = inp + balance;
            setBalance(bal);
            var obj = { inp, notes };
            setArr([...arr, obj]);
        }
    }
    const addExpense = (e) => {
        e.preventDefault();
        const inp = document.querySelector("#moneyExpense").value;
        const category = document.querySelector("#category :checked").value;
        const note = document.querySelector("#noteExpense").value;

    }

    return (
        <>
            <div id="container">
                <div id="balanceContainer"><h3> Your Balance</h3>
                    <p id="balance"><h6> ₹ </h6><h5>{balance}</h5></p>
                </div>
                <div id="historyContainer"><h4>All Expenses</h4><ul id="historyList">{arr.map(val => { return <li>{val.inp}  {val.notes}</li> })}</ul></div>
                <div id="add"><h1 id="addExpense" onClick={expenseContainer}> Add Expense</h1><h1 id="addMoney" onClick={moneyContainer}>Add Money </h1></div>

                <div id="formContainer">
                    <i className="fa-solid fa-xmark" onClick={cross} ></i>
                    <form className="form">
                        <p style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "5%" }}>Add Detail</p>
                        <div> <input type="number" placeholder="Enter Money" id='moneyExpense' required /></div>
                        <div>
                            <select id='category'>Select the category
                                <option value="-1" disabled>Select the category</option>
                                <option value="grocery">Grocery</option>
                                <option value="veggies">Veggies</option>
                                <option value="travelling">Travelling</option>
                                <option value="misc">Miscellaneous</option>
                            </select>
                        </div>
                        <div><input type="text" placeholder="Notes" id='noteExpense' /></div>

                        <p id="warning"></p>
                        <button name="submit" className="btn" onClick={addExpense} >Add Detail</button>
                    </form>
                </div>

                <div id='addMoneyContainer'>
                    <i className="fa-solid fa-xmark" onClick={cross} ></i>
                    <form className="form">
                        <p style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "5%" }}>Add Money</p>
                        <div> <input type="number" placeholder="Enter Money" id='moneyAdd' required /></div>

                        <div><input type="text" placeholder="Notes" id='notes' /></div>

                        <p id="warn"></p>
                        <button name="submit" className="btn" onClick={addMoney}>Add</button>
                    </form>
                </div>

            </div >

        </>
    )
}

export default Main