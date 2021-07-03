import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router";

class Dashboard extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        axios.get('http://localhost:3000/books')
            .then(result => this.setState({books: result.data}))
    }

    deleteBook = async (value) => {
        await axios.delete(`http://localhost:3000/books/${value.id}`)
        axios.get('http://localhost:3000/books').then(result => this.setState({books: result.data}))
    }
    editBook = (value) => {
        console.log(value)
        this.setState({
            redirect: !this.state.redirect,
            value: value
        })
    }

    render() {
        return (
            <>
                <h1 className='text-red-500 font-bold py-2'>DASHBOARD PAGE</h1>
                {this.state.redirect ? <Redirect
                        to={{
                            pathname: "/add_book",
                            state: {
                                ...this.state.value,
                                title_page: 'Отредактировать книгу',
                                funcComponent: 'edit'
                            }
                        }}
                    /> :
                    <table className='table-fixed w-80 smm:w-3/4'>
                        <thead className='font-bold'>
                        <tr className='text-xs'>
                            <td className='w-22 md:w-24 lg:py-4 md:text-sm  border border-solid border-black text-center'>TITLE</td>
                            <td className='w-16 md:w-14 lg:py-4 md:text-sm  border border-solid border-black text-center'>AUTHOR</td>
                            <td className='w-19 md:w-16 lg:py-4 md:text-sm  border border-solid border-black text-center'>CATEGORY</td>
                            <td className='w-14 md:w-12 lg:py-4 md:text-sm  border border-solid border-black text-center'>ISBN</td>
                            <td className='w-12 md:w-12 lg:py-4 md:text-sm  border border-solid border-black text-center lg:text-lg'>📝</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books?.map(el => (
                            <tr key={el.id}
                                className='text-xs lg:text-base  w-5 text-sm border-b border-l border-r border-solid border-black'>
                                <td className='w-5 lg:py-1  text-center'>{el.name}</td>
                                <td className='w-5 lg:py-1 text-center'>{el.author}</td>
                                <td className='w-5 lg:py-1 text-center'>{el.category}</td>
                                <td className='w-5 lg:py-1 text-center'>{el.isbn}</td>
                                <td className='w-5 lg:py-1  text-center lg:flex lg:flex-col lg:w-28 lg:justify-center lg:items-center'>
                                    <button
                                        className='w-10 text-center border border-solid border-black rounded bg-green-500 lg:w-20'
                                        onClick={() => this.editBook(el)}>
                                        ✏️
                                    </button>
                                    <button
                                        className='w-10 text-center border border-solid border-black rounded bg-green-500 my-1 lg:w-20'
                                        onClick={() => this.deleteBook(el)}>🗑
                                    </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                }
            </>
        );
    }
}

export default Dashboard;