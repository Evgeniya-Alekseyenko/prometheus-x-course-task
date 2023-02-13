import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { useModal } from 'react-hooks-use-modal';

import styles from './SpecificBook.module.scss';

const SpecificBook = ({
    title,
    author,
    image,
    price,
    shortDescription,
    description,
}) => {
    const book = useLocation().state;

    const [inputValue, setInputValue] = useState(1);
    const [totalPrice, setTotalPrice] = useState(book.price);
    const [inputError, setInputError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (inputValue > 0 && inputValue <= 42) {
            setTotalPrice(inputValue * book.price);
            setInputError('');
        } else {
            setInputError('You can enter more than 1 and less than 42');
            setInputValue('');
        }
    }, [inputValue, book.price]);

    const onAddToCart = () => {
        if (inputValue) {
            const cart =
                localStorage.getItem('cart') == null
                    ? []
                    : JSON.parse(localStorage.getItem('cart'));
            for (let cartItemIndex in cart) {
                if (cart[cartItemIndex].id === book.id) {
                    cart[cartItemIndex].image = book.image;
                    cart[cartItemIndex].title = book.title;
                    cart[cartItemIndex].price = book.price;
                    cart[cartItemIndex].count =
                        cart[cartItemIndex].count + inputValue;
                    cart[cartItemIndex].total =
                        Math.round(
                            cart[cartItemIndex].count * book.price * 100
                        ) / 100;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    return;
                }
            }
            const cartBook = {
                id: book.id,
                image: book.image,
                title: book.title,
                price: book.price,
                count: inputValue,
                total: Math.round(inputValue * book.price * 100) / 100,
            };
            cart.push(cartBook);
            localStorage.setItem('cart', JSON.stringify(cart));
            navigate('/booklist');
        }
    };

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false,
    });

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__column}>
                    <img
                        className={styles.book_cover}
                        src={
                            book.image
                                ? book.image
                                : 'https://via.placeholder.com/250x328.png?text=No+Image'
                        }
                        alt="book's foto"
                    />
                </div>
                <div className={styles.wrapper__column}>
                    <h2>
                        Book name:
                        <span className={styles.book_value}>{book.title}</span>
                    </h2>
                    <h2>
                        Book author:
                        <span className={styles.book_value}>{book.author}</span>
                    </h2>
                    <p>
                        <span className={styles.tags}>Short description:</span>
                        {book.shortDescription}
                    </p>
                </div>
                <div className={styles.wrapper__column}>
                    <div className={styles.column_price}>
                        <h3 className={styles.count}>
                            Price:
                            <span className={styles.book_value} id='price'>
                                {book.price}
                            </span>
                        </h3>
                        {inputError && (
                            <div style={{ color: 'red' }}>{inputError}</div>
                        )}
                        <label className={styles.count}>Count: </label>
                        <input
                            value={inputValue}
                            onChange={(e) =>
                                setInputValue(Math.round(e.target.value))
                            }
                            type='number'
                            name='count'
                            className={styles.input_count}
                        />
                        <div className={styles.count}>
                            Total price:
                            <span className={styles.book_value} id='totalPrice'>
                                {totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className={styles.btn_box}>
                            <button
                                type='submit'
                                className={styles.btn}
                                onClick={onAddToCart}
                            >
                                Add to cart
                            </button>
                        </div>
                        <Link to='/booklist'>
                            <div>
                                <button type='submit' className={styles.btn}>
                                    Back to book list
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.description_book}>
                <div className={styles.description}>
                    {isOpen
                        ? 'Read more about the book'
                        : 'More about the book'}
                </div>
                ▶
                <button onClick={open} className={styles.btn}>
                    OPEN
                </button>
                <Modal>
                    <div className={styles.modal}>
                        <h1>{book.title}</h1>
                        <p>{book.description}</p>
                        <div>
                            <button onClick={close} className={styles.btn}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default SpecificBook;
