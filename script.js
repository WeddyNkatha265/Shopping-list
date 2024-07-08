document.addEventListener("DOMContentLoaded", () => {
  const itemInput = document.getElementById("itemInput");
  const addItemButton = document.getElementById("addItemButton");
  const clearListButton = document.getElementById("clearListButton");
  const shoppingList = document.getElementById("shoppingList");
  let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

  const renderList = () => {
    shoppingList.innerHTML = "";
    itemsArray.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.className = item.purchased ? "purchased" : "";
      li.addEventListener("click", () => togglePurchased(index));
      li.addEventListener("dblclick", () => editItem(index));
      shoppingList.appendChild(li);
    });
  };

  const addItem = () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
      itemsArray.push({ name: itemName, purchased: false });
      itemInput.value = "";
      updateLocalStorage();
      renderList();
    }
  };

  const togglePurchased = (index) => {
    itemsArray[index].purchased = !itemsArray[index].purchased;
    updateLocalStorage();
    renderList();
  };

  const editItem = (index) => {
    const newName = prompt("Edit item name:", itemsArray[index].name);
    if (newName !== null && newName.trim() !== "") {
      itemsArray[index].name = newName.trim();
      updateLocalStorage();
      renderList();
    }
  };

  const clearList = () => {
    itemsArray = [];
    updateLocalStorage();
    renderList();
  };

  const updateLocalStorage = () => {
    localStorage.setItem("items", JSON.stringify(itemsArray));
  };

  addItemButton.addEventListener("click", addItem);
  clearListButton.addEventListener("click", clearList);
  renderList();
});
