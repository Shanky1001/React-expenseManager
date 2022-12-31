import React, { useState } from 'react';
import './main.css';

var history = [];
var index = 0;
const Main = () => {
    var temp = 0;
    var tempID;
    var [arr, setArr] = useState([]);
    var [balance, setBalance] = useState(0);

    const expenseContainer = () => {
        document.querySelector("#formContainer").style = "display:block;"
        document.querySelector("#addMoneyContainer").style = "display:none;"
        document.querySelector("#detailContainer").style = "display:none;"
    }

    const moneyContainer = () => {
        document.querySelector("#addMoneyContainer").style = "display:block;"
        document.querySelector("#formContainer").style = "display:none;"
        document.querySelector("#detailContainer").style = "display:none;"
    }

    const cross = (e) => {
        document.querySelector("#formContainer").style = "display:none;"
        document.querySelector("#addMoneyContainer").style = "display:none;"
        document.querySelector("#detailContainer").style = "display:none;"
        // Reseting Everything for add money
        document.querySelector("#warn").innerHTML = "";
        document.querySelector("#addValue").innerHTML = "Add";
        document.querySelector("#moneyAdd").value = "";
        document.querySelector("#notes").value = "";
        // Reseting everything for add expense
        document.querySelector("#warning").innerHTML = "";
        document.querySelector("#moneyExpense").value = "";
        document.querySelector("#noteExpense").value = "";
        document.querySelector("#addExp").innerHTML = "Add Expense";
        temp = 0;
        arr.forEach((val) => {
            temp += val.rupee;
        });
        setBalance(temp);
    }

    const addMoney = (e) => {
        e.preventDefault();
        const temp = document.querySelector("#addValue").innerHTML;
        const inp = Number(document.querySelector("#moneyAdd").value);
        const notes = document.querySelector("#notes").value;
        if (inp == "") {
            document.querySelector("#warn").innerHTML = "Enter some money.";
            document.querySelector("#warn").style = "color:red;font-size:1.5rem";
        } else {
            if (temp === "Update") {
                console.log(history[tempID]);
                history[tempID].rupee = inp;
                history[tempID].note = notes;
                console.log(history);
                setArr([...history])
            } else {
                document.querySelector("#addValue").innerHTML = "Add";
                const category = "Added";
                const idn = Math.floor(1 + Math.random() * 200);
                document.querySelector("#moneyAdd").value = "";
                document.querySelector("#notes").value = "";
                var obj = { "index": index, "id": idn, "category": category, "rupee": inp, "note": notes };
                history.push(obj);
                index++;
                setArr([...history]);
                document.querySelector("#warn").innerHTML = "Your Money is added to your Wallet. ";
                document.querySelector("#warn").style = "color:green;font-size:1.5rem";
            }
        }
    }

    const addExpense = (e) => {
        e.preventDefault();
        const inp = Number(document.querySelector("#moneyExpense").value);
        const category = document.querySelector("#category :checked").value;
        const note = document.querySelector("#noteExpense").value;
        const temp = document.querySelector("#addExp").innerHTML;

        if (inp == "" || category === "-1") {
            document.querySelector("#warning").innerHTML = "Enter both money and category.";
            document.querySelector("#warning").style = "color:red;font-size:1.5rem;";
        } else {
            if (temp === "Update") {
                history[tempID].rupee = inp * -1;
                history[tempID].note = note;
                history[tempID].category = category;
                console.log(history);
                setArr([...history])
            } else {
                const idn = Math.floor(1 + Math.random() * 200);
                var obj = { "index": index, "id": idn, "category": category, "rupee": inp * -1, "note": note };
                history.push(obj);
                index++;
                document.querySelector("#moneyExpense").value = "";
                document.querySelector("#noteExpense").value = "";
                document.querySelector("#warning").innerHTML = "Expense Added, Kindly go back to see details.";
                document.querySelector("#warning").style = "color:green;font-size:1.5rem;";
                setArr([...history])
            }
        }
    }

    const operations = (e) => {
        const op = e.target.id;
        const index = Number(e.target.closest(".listCard").id);
        console.log(index);
        if (op === "edit") {
            history.forEach((val) => {
                if (val.index === index) {
                    if (val.category === "Added") {
                        tempID = arr.indexOf(val);
                        document.querySelector("#addMoneyContainer").style = "display:block;"
                        document.querySelector("#detailContainer").style = "display:none;"
                        document.querySelector("#moneyAdd").value = val.rupee;
                        document.querySelector("#notes").value = val.note;
                        document.querySelector("#addValue").innerHTML = "Update";
                        tempID = index;
                    } else {
                        document.querySelector("#formContainer").style = "display:block;"
                        document.querySelector("#moneyExpense").value = val.rupee * -1;
                        document.querySelector("#noteExpense").value = val.note;
                        document.querySelector("#addExp").innerHTML = "Update";
                        tempID = index;
                    }
                }
            })
        }
        else if (op === "del") {
            e.target.closest(".listCard").remove();
            history.splice(index, 1);
            details();
        }
    }

    const details = (e) => {
        document.querySelector("#detailContainer").style = "display:block;"
        document.querySelector("#formContainer").style = "display:none;"
        document.querySelector("#addMoneyContainer").style = "display:none;"
        let con = document.querySelector("#display");
        con.innerHTML = "";
        if (history.length === 0) {
            con.innerHTML = "<h1>Nothing to Display </h1>"
        }
        if (e === undefined) {
            con.innerHTML += history.map((val) => {
                return `<div class="listCard" id=${val.index} >
            <div class="listDetail"><span>₹ ${val.rupee}</span> <span><i class="fa-solid fa-pen-to-square" id="edit"></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
            <div class="listNote">Note: ${val.note} </div>
        </div>`})
        } else {
            const id = e.target.parentNode.id;
            if (id === "history") {
                con.innerHTML += history.map((val) => {
                    return `<div class="listCard" id=${val.index}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit"></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>`})
            }
            if (id === "grocery") {
                con.innerHTML += history.map((val) => {
                    return val.category === "Grocery" ? `<div class="listCard" id=${val.index}>
                       <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                       <div class="listNote">Note: ${val.note} </div>
                   </div>` : ""
                })
            }
            if (id === "travelling") {
                con.innerHTML += history.map((val) => {
                    return val.category === "Travelling" ? `<div class="listCard" id=${val.index}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del"></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>` : ""
                })

            }
            if (id === "veggies") {
                con.innerHTML += arr.map((val) => {
                    return val.category === "Veggies" ? `<div class="listCard" id=${val.index}>
                       <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                       <div class="listNote">Note: ${val.note} </div>
                   </div>` : ""
                })
            }
            if (id === "misc") {
                con.innerHTML += arr.map((val) => {
                    return val.category === "Misc" ? `<div class="listCard" id=${val.index}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>` : ""
                })
            }

        }

    }


    return (

        <div id="container">
            <div id="balanceContainer"><h3> Your Balance</h3>
                <h3 id="balance"><h6> ₹ </h6><h5>{balance}</h5></h3>
            </div>
            <div id="historyContainer" >

                <div className='cards' id="history" ><h1 onClick={details} > <img src='https://mpng.subpng.com/20201108/wae/transparent-book-icon-history-icon-5fa8a18cbad7d7.9650804216048869247653.jpg' alt='All-history' />
                    Transaction History</h1></div>
                <div className='cards' id="grocery" ><h1 onClick={details}> <img src='https://cdn-icons-png.flaticon.com/512/3724/3724788.png' alt='All-history' />
                    Groceries</h1></div>
                <div className='cards' id="travelling" ><h1 onClick={details}> <img src='https://cdn-icons-png.flaticon.com/512/201/201623.png' alt='Travelling' />  Travelling</h1></div>
                <div className='cards' id="veggies" ><h1 onClick={details}><img src='https://www.clipartmax.com/png/middle/361-3612050_clipart-royalty-free-library-vegetable-bowl-icons-png-vegetable-bowl-vector-png.png' alt='Veggies' /> Veggies</h1></div>
                <div className='cards' id="misc" ><h1 onClick={details}><img src='https://f.hubspotusercontent30.net/hubfs/3277184/ICONS/ICON-MISC-PersonCheckStatus-GRADIENT.png' alt='Miscellaneous' /> Miscellaneous</h1></div>

            </div>
            <div id="add"><h1 id="addExpense" onClick={expenseContainer}> Add Expense</h1><h1 id="addMoney" onClick={moneyContainer}>Add Money </h1></div>

            <div id="formContainer">
                <i className="fa-solid fa-xmark" onClick={cross} ></i>
                <form className="form">
                    <p style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "5%" }}>Add Detail</p>
                    <div> <input type="number" placeholder="Enter Money" id='moneyExpense' required /></div>
                    <div>
                        <select id='category'>Select the category
                            <option value="-1" selected disabled>Select the category</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Veggies">Veggies</option>
                            <option value="Travelling">Travelling</option>
                            <option value="Misc">Miscellaneous</option>
                        </select>
                    </div>
                    <div><input type="text" placeholder="Notes" id='noteExpense' /></div>

                    <p id="warning"></p>
                    <button name="submit" className="btn" id="addExp" onClick={addExpense} >Add Detail</button>
                </form>
            </div>

            <div id='addMoneyContainer'>
                <i className="fa-solid fa-xmark" onClick={cross} ></i>
                <form className="form">
                    <p style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "5%" }}>Add Money</p>
                    <div> <input type="number" placeholder="Enter Money" id='moneyAdd' required /></div>

                    <div><input type="text" placeholder="Notes" id='notes' /></div>

                    <p id="warn"></p>
                    <button name="submit" className="btn" id="addValue" onClick={addMoney}>Add</button>
                </form>
            </div>

            <div id='detailContainer'>
                <h1>Details</h1>
                <i className="fa-solid fa-xmark" onClick={cross} ></i>
                <div id='display' onClick={operations}>

                </div>
            </div>
        </div >


    )
}

export default Main
