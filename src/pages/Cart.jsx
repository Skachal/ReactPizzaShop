import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Импортируем хук useNavigate
import { CartContext } from '../App';

export default function Cart() {
    const navigate = useNavigate();  // Инициализируем хук useNavigate
    const { totalPrice, setTotalPrice } = useContext(CartContext);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Сырный цепленок',
            price: 770,
            quantity: 2,
            type: 'Тонкое',
            size: 26,
            imageUrl: '/mini_pizza.png',
        },
        // Другие элементы корзины могут быть добавлены сюда
    ]);

    const handleIncreaseQuantity = (item) => {
        const updatedItems = cartItems.map(cartItem =>
            cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCartItems(updatedItems);
        setTotalPrice(totalPrice + item.price);
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            const updatedItems = cartItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
            setCartItems(updatedItems);
            setTotalPrice(totalPrice - item.price);
        }
    };

    const handleRemoveItem = (item) => {
        const updatedItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedItems);
        setTotalPrice(totalPrice - (item.price * item.quantity));
    };

    const handleClearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    };

    return (
        <>
            <div className="w-full flex items-center justify-center mt-10">
                <div className="grid grid-rows gap-3 w-8/12">

                    <div className="flex items-center justify-between border-b p-3">
                        <div className="flex items-center gap-2">
                            <img src="/logo_drawer.png" alt="" />
                            <h1 className="text-3xl font-bold">Корзина</h1>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleClearCart}>
                            <img src="/logo2_drawer.svg" alt="" />
                            <p className="text-gray-300">Очистить корзину</p>
                        </div>
                    </div>

                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b p-3">
                            <div className="flex items-center gap-3">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="grid grid-cols">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-gray-400">{item.type}, {item.size}см.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src="/Minus.png" alt="Уменьшить" className="cursor-pointer" onClick={() => handleDecreaseQuantity(item)} />
                                <span className="font-bold text-xl">{item.quantity}</span>
                                <img src="/Plus.png" alt="Увеличить" className="cursor-pointer" onClick={() => handleIncreaseQuantity(item)} />
                            </div>
                            <p className="font-bold text-xl">{item.price * item.quantity} тенге</p>
                            <img src="/exit.png" alt="Удалить" className="cursor-pointer" onClick={() => handleRemoveItem(item)} />
                        </div>
                    ))}

                    <div className="flex items-center justify-between">
                        <p>Всего пицц: <span className="font-bold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.</span></p>
                        <p>Сумма заказа: <span className="font-bold text-orange-500">{totalPrice} тенге.</span></p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div
                            className="px-5 py-3 rounded-full border flex items-center gap-2 cursor-pointer"
                            onClick={() => navigate(-1)}  // Используем navigate(-1) для возврата назад
                        >
                            <img src="/arrow_left.svg" alt="Вернуться назад" />
                            <p className="font-bold text-gray-300">Вернуться назад</p>
                        </div>
                        <div className="bg-orange-500 px-5 py-3 rounded-full cursor-pointer">
                            <p className="text-white font-bold">Оплатить сейчас</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
