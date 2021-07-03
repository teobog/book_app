import React, {Component} from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AddBook from "./AddBook/AddBook"


class App extends Component {
    render() {
        return (
            <div className='flex flex-col md:w-5/6 md:mx-auto md:mt-5 lg:w-7/12'>
            <div className='flex flex-col items-center bg-blue-400 py-2 md:rounded-lg'>
                <h1 className='text-red-500 font-bold py-1'>Book Wishlist App</h1>
                <ul className='flex font-bold items-center w-full justify-around'>
                    <NavLink to='/add_book' className='text-red-500 bg-blue-500 hover:bg-blue-700 hover:text-white text-center font-bold w-28 h-6 rounded focus:outline-none focus:shadow-outline' activeClassName="bg-blue-700">Add Book</NavLink>
                    <NavLink exact to='/' className='text-red-500 bg-blue-500 hover:bg-blue-700 hover:text-white text-center font-bold w-28 h-6 rounded focus:outline-none focus:shadow-outline' activeClassName="bg-blue-700">Dashboard</NavLink>
                </ul>
                <Switch>
                    <Route exact path="/add_book" component={AddBook} />
                    <Route exact path="/" component={Dashboard}/>
                </Switch>
            </div>
            </div>
        );
    }
}

export default App;
