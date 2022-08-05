import React, { useState } from 'react';
import './main.css';


var history = [];
const Main = () => {
    var temp = 0
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
        temp=0;
        arr.forEach((val) => {
            temp += val.rupee;
        });
        setBalance(temp);
    }

    const addMoney = (e) => {
        e.preventDefault();
        document.querySelector("#addValue").innerHTML = "Add";
        const inp = Number(document.querySelector("#moneyAdd").value);
        const notes = document.querySelector("#notes").value;
        const category = "Added";
        if (inp == "") {
            document.querySelector("#warn").innerHTML = "Enter some money.";
            document.querySelector("#warn").style = "color:red";
        } else {
            const idn = Math.floor(1 + Math.random() * 200);
            document.querySelector("#moneyAdd").value = "";
            document.querySelector("#notes").value = ""
            var bal = inp + balance;
            // setBalance(bal);
            var obj = { "id": idn, "category": category, "rupee": inp, "note": notes };
            setArr([...arr, obj])
            history.push(obj);
        }
       
    }
    const addExpense = (e) => {
        e.preventDefault();
        document.querySelector("#addExp").innerHTML = "Add Expense";
        const inp = Number(document.querySelector("#moneyExpense").value);
        const category = document.querySelector("#category :checked").value;
        const note = document.querySelector("#noteExpense").value;
        if (inp == "" || category == -1) {
            document.querySelector("#warning").innerHTML = "Enter both money and category.";
            document.querySelector("#warning").style = "color:red";
        }
        else {
            var obj = { "category": category, "rupee": inp * -1, "note": note };
            setArr([...arr, obj])
            // setBalance(balance - inp);
            history.push(obj);
            document.querySelector("#moneyExpense").value = "";
            document.querySelector("#noteExpense").value = "";
        }
        
    }

    const operations = (e) => {
        const op = e.target.id;
        const index = e.target.closest(".listCard").id;
        if (op === "edit") {
            const cat = arr[index].category;
            if (cat === "Added") {
                document.querySelector("#addMoneyContainer").style = "display:block;"
                document.querySelector("#detailContainer").style = "display:none;"
                document.querySelector("#moneyAdd").value = arr[index].rupee;
                document.querySelector("#notes").value = arr[index].note;
                document.querySelector("#addValue").innerHTML = "Update";
                // setBalance(balance - arr[index].rupee);
            } else {
                document.querySelector("#formContainer").style = "display:block;"
                document.querySelector("#moneyExpense").value = arr[index].rupee;
                document.querySelector("#noteExpense").value = arr[index].note;
                document.querySelector("#addExp").innerHTML = "Update";
                // setBalance(balance + arr[index].rupee);
            }
            var temp = arr;
            temp.splice(index, 1);
            setArr(temp)
        } else if (op === "del") {
            temp = arr;
            temp.splice(index, 1);
            setArr([...temp]);
            details();
        }
    }

    const details = (e) => {
        document.querySelector("#detailContainer").style = "display:block;"
        document.querySelector("#formContainer").style = "display:none;"
        document.querySelector("#addMoneyContainer").style = "display:none;"
        let con = document.querySelector("#display");
        con.innerHTML = "";
        if (arr.length === 0) {
            con.innerHTML = "<h1>Nothing to Display </h1>"
        }
        if (e === undefined) {
            con.innerHTML += arr.map((val, i) => {
                return `<div class="listCard" id=${i}>
            <div class="listDetail"><span>₹ ${val.rupee}</span> <span><i class="fa-solid fa-pen-to-square" id="edit"></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
            <div class="listNote">Note: ${val.note} </div>
        </div>`})
        } else {
            const id = e.target.parentNode.id;
            if (id === "history") {
                con.innerHTML += arr.map((val, i) => {
                    return `<div class="listCard" id=${i}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit"></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>`})
            }
            if (id === "grocery") {
                con.innerHTML += arr.map((val, i) => {
                    return val.category === "Grocery" ? `<div class="listCard" id=${i}>
                       <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                       <div class="listNote">Note: ${val.note} </div>
                   </div>` : ""
                })
            }
            if (id === "travelling") {
                con.innerHTML += arr.map((val, i) => {
                    return val.category === "Travelling" ? `<div class="listCard" id=${i}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del"></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>` : ""
                })

            }
            if (id === "veggies") {
                con.innerHTML += arr.map((val, i) => {
                    return val.category === "Veggies" ? `<div class="listCard" id=${i}>
                       <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                       <div class="listNote">Note: ${val.note} </div>
                   </div>` : ""
                })
            }
            if (id === "misc") {
                con.innerHTML += arr.map((val, i) => {
                    return val.category === "Misc" ? `<div class="listCard" id=${i}>
                <div class="listDetail"><span> ${val.category}</span> <span>₹ ${val.rupee} </span><span><i class="fa-solid fa-pen-to-square" id="edit" ></i><i class="fa-solid fa-trash" id="del" ></i></span></div>
                <div class="listNote">Note: ${val.note} </div>
            </div>` : ""
                })
            }

        }

    }


    return (
        <>
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

        </>
    )
}

export default Main