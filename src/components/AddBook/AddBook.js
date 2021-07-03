import React, {Component} from 'react';
import axios from "axios";
import {uuid} from 'uuidv4';
import {Redirect} from "react-router";

class AddBook extends Component {
    state = {
        id: this.props.location.state ? this.props.location.state.id : uuid(),
        name: this.props.location.state ? this.props.location.state.name : '',
        author: this.props.location.state ? this.props.location.state.author : '',
        category: this.props.location.state ? this.props.location.state.category : '',
        isbn: this.props.location.state ? this.props.location.state.isbn : '',
        redirect: false
    }
    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault()
        let {id,name,author,category,isbn} = this.state
        if (!this.props.location.state?.funcComponent) {
            await axios.post('http://localhost:3000/books', {id,name,author,category,isbn})
            this.setState({
                id: uuid(),
                name: '',
                author: '',
                category: '',
                isbn: '',
                redirect: !this.state.redirect
            })
            alert('Книга Создана')
        } else {
            await axios.patch(`http://localhost:3000/books/${this.state.id}`, {id,name,author,category,isbn})
            this.setState({
                id: uuid(),
                name: '',
                author: '',
                category: '',
                isbn: '',
                redirect: !this.state.redirect
            })
            alert('Книга отредачена')
        }
    }


    render() {
        return (
            <>
                <h1 className='text-red-500 font-bold py-3'>
                    {this.props.location.state ? `${this.props.location.state.title_page} - ${this.props.location.state.name}` : 'Add your book to dashboard'}
                </h1>
                {this.state.redirect ? <Redirect
                    to={{
                        pathname: "/",
                    }}
                /> : <form action="" onSubmit={this.onSubmit} className='flex flex-col w-11/12 lg:w-5/12'>
                    <input className='my-1 border border-solid border-black px-1 lg:py-1'
                           required type="text" placeholder='Book Title'
                           name='name' onChange={this.onHandleChange}
                           value={this.state.name}
                    />
                    <input className='my-1 border border-solid border-black px-1 lg:py-1'
                           required type="text" placeholder='AUTHOR' name='author' onChange={this.onHandleChange}
                           value={this.state.author}/>
                    <input className='my-1 border border-solid border-black px-1 lg:py-1'
                           required type="number" max='9999999' placeholder='ISBN' name='isbn'
                           onChange={this.onHandleChange}
                           value={this.state.isbn}/>
                    <select className='my-1 border border-solid border-black px-1 lg:py-1'
                            required name='category' onChange={this.onHandleChange}>
                        <option disabled selected value="Выберите категорию">Выберите категорию</option>
                        <option value="Поезия">Поезия</option>
                        <option value="Роман">Роман</option>
                        <option value="Фэнтези">Фэнтези</option>
                        <option value="Драма">Драма</option>
                        <option value="Детективы">Детективы</option>
                    </select>
                    <button
                        className='my-1 bg-red-500 border border-solid border-black px-1'>{this.props.location.state?.funcComponent ? 'EDIT' : 'ADD'}</button>
                </form>}

            </>
        );
    }
}

export default AddBook;