// BasketStore.js
import { makeAutoObservable } from 'mobx';

class BasketStore {
  items = [];

  constructor() {
    makeAutoObservable(this);

    // Восстанавливаем состояние корзины при создании объекта
    this.loadBasketItems();
  }

  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  
    this.saveBasketItems();
  }

  decreaseQuantity(itemId) {
    const item = this.items.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveBasketItems();
    }
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveBasketItems();
  }

  setItemQuantity(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveBasketItems();
    }
  }

  // Загрузка состояния корзины из localStorage
  loadBasketItems() {
    const savedItems = localStorage.getItem('basketItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  }

  // Сохранение состояния корзины в localStorage
  saveBasketItems() {
    localStorage.setItem('basketItems', JSON.stringify(this.items));
  }
}

const basketStoreInstance = new BasketStore(); // создаем экземпляр класса

export { BasketStore, basketStoreInstance }; // экспортируем класс и экземпляр
