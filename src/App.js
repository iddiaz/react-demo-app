import React, { Component } from 'react'
import TodoList from './todoList'
import lscache from 'ls-cache'

export default class App extends Component {
  constructor (...args) {
    super(...args)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {items: [], text: ''}
  }

  handleChange (e) {
    this.setState({text: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    var newItem = {
      text: this.state.text,
      id: Date.now()
    }

    //setState puede recibir un objeto o una funcion y la funcion recive un parámetro que es el estado previo, entonces la funcion lo que tendrá que devolver es el nuevo estado que va a tenar
    // this.setState({items: [1,2,3,..]})
    
    this.setState((prevState) => {
      //guardamos en localstorage los elementos de la lista, y lo hacemos en el setState porque queremos que los guarde cada vez que se actualiza el estado evidentemente
      const items = prevState.items.concat(newItem)
      lscache.set('todo-items', items)
      return {
        items: items,
        text: ''
      }
    })
  }
// Trabajando cn LocalStorage
// cuando el compoente se ha montado
  componentDidMount(){
    // cogemos los todo-items o si no hay nada un [] porque si no hay nada LocalStorage nos devuvle null y no queremos eso...
    const items = lscache.get('todo-items') || []
    // console.log('componentDidMount, items: ',items );
    //una vez que lo tengamos le cambiamos el estado que trae
    this.setState({items: items})
  }

  shouldComponentDidUpdate(){}

  componentWillUnmount(){}

// Vamos a usar una libreria de pamela fox que se llama lscache qye nos ayuda a manejar local storage
  render () {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    )
  }
}





