//Item Controller , UI Controller , Storage Controller

//Storage Controller

const StorageCtrl = (function () {
    return {
        storeItem: function (item) {

            let items;

            //Check if any items in ls

            if (localStorage.getItem('items') === null) {
                items = [];

                //Push new item

                items.push(item);

                //Set ls

                localStorage.setItem('items', JSON.stringify(items));

                console.log(1);
            }else{
                //Get the existing items from ls

                items = JSON.parse(localStorage.getItem('items'));
            }
            
        }
    }

}());

//Item Controller

const ItemCtrl = (function () {

    //Item Constructor

    //Private Methods

    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;
    }

    const data = {
        items: [
            { id: 0, name: 'Bike', money: 1000 },
            { id: 1, name: 'Book', money: 2000 },
            { id: 2, name: 'Laptop', money: 500 },
        ],
        currentItem: null,
        totalMoney: 0
    }


    //Public Methods

    return {
        getItem: function () {
            return data.items;
        },
        addItem: function (name, money) {

            let ID;

            //Create ID

            if (data.items.length > 0) {

                ID = data.items[data.items.length - 1].id + 1;

                console.log(ID);

            } else {
                ID = 0;
            }

            money = parseInt(money);

            //Create new item
            let newItem = new Item(ID, name, money);

            //Add to items Array

            data.items.push(newItem);

            return newItem;

        },

        getTotalMoney: function () {
            let total = 0;

            if (data.items.length > 0) {
                data.items.forEach(function (item) {

                    total += item.money;

                    data.totalMoney = total;
                })
            } else {
                return data.totalMoney = 0;
            }

            return total;
        },

        getItemById: function (id) {

            let found = null;

            //Loop through items

            data.items.forEach(function (item) {

                if (item.id === id) {

                    found = item;
                }
            })

            return found;

        },

        setCurrentItem: function (item) {

            data.currentItem = item;

        },

        getCurrentItem: function () {

            return data.currentItem;
        },
        deleteItem: function (id) {
           //Get ids

           const ids = data.items.map(function (item) {
               return item.id;
           })


           //Get index
           const index = ids.indexOf(id);
           //Remove item
           data.items.splice(index, 1);

        },

        clearAllItems: function () {
            data.items = [];
        },
        updateItem: function (name, money) {
            money = parseInt(money);

            let found = null;

            data.items.forEach(function (item) {

                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.money = money;
                    found = item;


                }
            })

            return found;
        }
    }

}());



//UI Controller

const UICtrl = (function () {

    return {
        populateItemList: function (items) {

            let html = "";

            items.forEach(function (item) {

                html += `<li class="collection-item" id=item-${item.id}>
                <strong> ${item.name} : <em>${item.money}</em></strong>
                <a href="#" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>

                </a>
            </li>`
            });

            document.querySelector("#item-list").innerHTML = html;


        },

        clearEditState: function () {

            document.querySelector(".add-btn").style.display = "inline";

            document.querySelector(".update-btn").style.display = "none";

            document.querySelector(".delete-btn").style.display = "none";

            document.querySelector(".back-btn").style.display = "none";

        },

        showEditState: function () {

            document.querySelector(".add-btn").style.display = "none";

            document.querySelector(".update-btn").style.display = "inline";

            document.querySelector(".delete-btn").style.display = "inline";

            document.querySelector(".back-btn").style.display = "inline";

        },

        getItemInput: function () {
            return {
                name: document.querySelector("#item-name").value,
                money: document.querySelector("#item-money").value
            }
        },
        addListItem: function (item) {

            //Create li element
            const li = document.createElement("li");

            //Add class to li
            li.className = "collection-item";

            //Add ID

            li.id = `item-${item.id}`;

            //Insert Html

            li.innerHTML = `<strong> ${item.name} : <em>${item.money}</em></strong>
            <a href="#" class="secondary-content">
                <i class="fa-solid fa-pencil edit-item"></i>

            </a>`;

            //Insert item to ul
            document.querySelector(".collection").appendChild(li);



        },

        


        showTotalMoney: function (total) {
            document.querySelector(".total-money").innerText = total;
        },

        clearInputState: function () {
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";
        },
        addItemToForm: function () {

            document.querySelector("#item-name").value = ItemCtrl.getCurrentItem().name;

            document.querySelector("#item-money").value = ItemCtrl.getCurrentItem().money;
        },

        deleteListItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearItemList: function () {

            // const collection =document.querySelector("#item-list");

            // collection.innerHTML = null;

            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function (item) {
                item.remove();
            })
            
        },

        updateListItem: function (item) {

            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function (listItem) {

                const itemID = listItem.getAttribute("id");

                if (itemID === `item-${item.id}`) {

                    document.querySelector(`#${itemID}`).innerHTML = `<strong> ${item.name} : <em>${item.money}</em></strong>
                    <a href="#" class="secondary-content">
                        <i class="fa-solid fa-pencil edit-item"></i>
                    </a>`
                }

                
            })
            
        }



    }

}());

//App Controller

const App = (function () {

    const loadEventListeners = function () {

        //Add Item Event

        document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

        //Edit Icon Click
        document.querySelector("#item-list").addEventListener("click", itemEditClick);

        //Update Item Event

        document.querySelector(".update-btn").addEventListener("click", itemUpdateSubmit);

        //Delete Item Event

        document.querySelector(".delete-btn").addEventListener("click", itemDeleteSubmit);

        //Clear Event

        document.querySelector(".clear-btn").addEventListener("click", clearAllItemsClick);

        //Back Event

        document.querySelector(".back-btn").addEventListener("click", function () {
            e.preventDefault();
            UICtrl.clearEditState();
            UICtrl.clearInputState();
        });

        

    }

    //Item To ADD

    const itemAddSubmit = function (e) {

        e.preventDefault();

        //Get from input

        const input = UICtrl.getItemInput(); //Object

        //Validate

        if (input.name === "" || input.money === "") {
            alert("Please fill in all fields");

        } else {

            //Add Item

            const newItem = ItemCtrl.addItem(input.name, input.money);

            //Add Item to UI list

            UICtrl.addListItem(newItem);

            //Add total money

            const totalMoney = ItemCtrl.getTotalMoney();

            // console.log(totalMoney);

            //Add total money to UI

            UICtrl.showTotalMoney(totalMoney);

            //Store in localStorage

            StorageCtrl.storeItem(newItem);

            //Clear a ui input

            UICtrl.clearInputState();

        }
    }

    //Item to Edit

    const itemEditClick = function (e) {
        e.preventDefault();

        if (e.target.classList.contains("edit-item")) {

            //Show Button

            UICtrl.showEditState(); //Invoke showEditState

            //Get the list item id (item-0, item-1)

            const listID = e.target.parentElement.parentElement.id;

            //Break  into an array

            const listArr = listID.split("-");

            //Get the actual array

            const id = parseInt(listArr[1]);

            //Get Matching item

            const itemToEdit = ItemCtrl.getItemById(id);

            //Set current item

            ItemCtrl.setCurrentItem(itemToEdit);

            //Add item to form

            UICtrl.addItemToForm();

        }
    }

    const itemUpdateSubmit = function (e) {
        e.preventDefault();

        //Get item input

        const input = UICtrl.getItemInput();

        //Update item

        const updatedItem = ItemCtrl.updateItem(input.name, input.money);


        //Update UI

        UICtrl.updateListItem(updatedItem);


        //Get total money

        const totalMoney = ItemCtrl.getTotalMoney();

        UICtrl.showTotalMoney(totalMoney);

        UICtrl.clearEditState();

        UICtrl.clearInputState();
    

    }



    // Item to Delete
    const itemDeleteSubmit = function (e) {
        e.preventDefault();

        // Get the current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete item from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        const totalMoney = ItemCtrl.getTotalMoney();

        UICtrl.showTotalMoney(totalMoney);

        //Clear Edit state

        UICtrl.clearEditState();

        UICtrl.clearInputState();

        
    }


    const clearAllItemsClick = function (e) {
        e.preventDefault();
        //Clear all items from data structure
        ItemCtrl.clearAllItems();

        //Clear from UI
        UICtrl.clearItemList();

        const totalMoney = ItemCtrl.getTotalMoney();

        UICtrl.showTotalMoney(totalMoney);
    }






    return {
        init: function () {
            // console.log('hello');

            UICtrl.clearEditState();

            const items = ItemCtrl.getItem(); //Array

            if (items.length > 0) {
                UICtrl.populateItemList(items);

                const totalMoney = ItemCtrl.getTotalMoney();

                UICtrl.showTotalMoney(totalMoney);

            }

            loadEventListeners();
        }
    }

}());

document.addEventListener('DOMContentLoaded', function () {
    App.init();
});
