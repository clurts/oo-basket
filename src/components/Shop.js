import React, { Component } from 'react';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [
                {
                    id: 1,
                    name: "Appelsin",
                    price: 4.00,
                    origin: "Grækenland",
                    count: 1
                },
                {
                    id: 2,
                    name: "Østershatte",
                    price: 10.00,
                    origin: "Danmark",
                    count: 1
                },
                {
                    id: 3,
                    name: "Æble",
                    price: 2.50,
                    origin: "Danmark", 
                    count:1
                }
            ],
            basket: []
        }
    }

    addToBasket(basketItem) {
        let resetItems = this.state.items.map((item) => {
            if(basketItem.id === item.id) {
                return {...item, count: 1}
            }
            else return item;
        })
        let newBasket = [...this.state.basket, basketItem]
        let total = newBasket.reduce((prev, current) => {return prev + current.count}, 0)

        this.setState({
            ...this.state,
            basket: [...newBasket],
            items: [...resetItems],
            totalItems: total,
        })
        
    }

    incrementCount(id) {
        let updatedItems = this.state.items.map((item) => {
            if(item.id === id) {
                return {...item, count: item.count + 1}
            }
            else return item
        })
        console.log(updatedItems)
        this.setState({
            ...this.state,
            items: [...updatedItems]
        })
    }

    decrementCount(id) {
        let updatedItems = this.state.items.map((item) => {
            if(item.id === id && item.count > 1) {
                return {...item, count: item.count - 1}
            }
            else return item
        })
        
        this.setState({
            ...this.state,
            items: [...updatedItems]
        })
    }

   
    render() { 
        return ( 
            <>
                <h1>Velkommen til butikken!</h1>

                <h2>Vi kan i dag byde på følgende varer:</h2>

                {this.state.items.map((item) => {
                    return (<article key={item.id}>
                        <h3>{item.name}</h3>
                        <span>Antal: {item.count} 
                            <button onClick={()=> this.incrementCount(item.id)}>+</button>
                            <button onClick={()=> this.decrementCount(item.id)}>-</button>
                        </span>
                        <p>Kr. {item.price.toFixed(2)}</p>
                        <button onClick={() => {
                                this.addToBasket({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                count: item.count
                            });
                        }}>Læg i kurv</button>
                    </article>)
                }
                )}

            </>
         );
    }
}
 
export default Shop;