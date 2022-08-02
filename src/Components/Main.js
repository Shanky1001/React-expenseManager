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
            var li = document.createElement("li");
            li.innerHTML = `<span>${inp}</span><div>${notes}</div>`;
            document.querySelector("#historyList").appendChild(li);

        }
    }
    const addExpense = (e) => {
        e.preventDefault();
        const inp = Number(document.querySelector("#moneyExpense").value);
        const category = document.querySelector("#category :checked").value;
        const note = document.querySelector("#noteExpense").value;
        if (inp == "" || category === "") {
            document.querySelector("#warning").innerHTML = "Enter both money and category.";
            document.querySelector("#warning").style = "color:red";

        } else {
            var li = document.createElement("li");
            if (category === "grocery") {
                li.innerHTML = `<div> <span><img src="https://cdn-icons-png.flaticon.com/512/3724/3724720.png"/></span> <span>${inp}</span> <i class="fa-solid fa-pen" onClick={edit}></i><i class="fa-solid fa-trash-can"   onClick={delete}></i> </div> <div>Note : ${note}</div>`;
                document.querySelector("#historyList").appendChild(li);
            }
            if (category === "veggies") {
                li.innerHTML = `<div> <span><img src="https://icon-library.com/images/veggie-icon/veggie-icon-4.jpg"/></span> <span>${inp}</span> <i class="fa-solid fa-pen" onClick={edit}></i> <i class="fa-solid fa-trash-can" onClick={delete}></i> </div> <div>Note : ${note}</div>`;
                document.querySelector("#historyList").appendChild(li);
            }
            if (category === "travelling") {
                li.innerHTML = `<div> <span><img src="https://i.pinimg.com/originals/f2/f9/ee/f2f9eef9a4ba0112e098b8a3b400c41c.png"/></span> <span>${inp}</span><i class="fa-solid fa-pen" onClick={edit}></i> <i class="fa-solid fa-trash-can"   onClick={delete}></i> </div> <div>Note : ${note}</div>`;
                document.querySelector("#historyList").appendChild(li);
            }
            if (category === "misc") {
                li.innerHTML = `<div> <span><img src="https://cdn-icons-png.flaticon.com/512/2644/2644379.png"/></span> <span>${inp}</span> <i class="fa-solid fa-pen" onClick={edit}></i> <i class="fa-solid fa-trash-can"   onClick={delete}></i> </div> <div>Note : ${note}</div>`;
                document.querySelector("#historyList").appendChild(li);
            }
        }
    }
    const edit = (e) => {

    }
    const del = (e) => {

    }

    return (
        <>
            <div id="container">
                <div id="balanceContainer"><h3> Your Balance</h3>
                    <p id="balance"><h6> ₹ </h6><h5>{balance}</h5></p>
                </div>
                <div id="historyContainer"><h4>All Expenses</h4><ul id="historyList"></ul></div>
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