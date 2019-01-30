import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {InputGroup, InputGroupText, InputGroupAddon, Input, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUndo, faCheck, faTrashAlt} from '@fortawesome/free-solid-svg-icons'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: "",
            list: []
        };

        this.handleNewTodoInputChange = this.handleNewTodoInputChange.bind(this);
        this.handleNewTodoInputKeyPress = this.handleNewTodoInputKeyPress.bind(this);
    }

    handleNewTodoInputChange(event) {
        this.setState({newTodo: event.target.value});
    }

    handleNewTodoInputKeyPress(event) {
        if(event.key === 'Enter') {
            this.addNew();
        }
    }

    addNew = () => {
        let list = this.state.list;

        list.push({
            id: new Date().getTime().toString(),
            text: this.state.newTodo,
            done: false
        });

        this.setState({
            list: list,
            newTodo: ""
        })
    }

    deleteTodo = (id) => {
        let list = this.state.list;
        let index = list.findIndex(el => el.id === id);
        if (index > -1) {
            list.splice(index, 1);
        }
        this.setState({
            list: list
        })
    }

    toggleProp = (id, prop) => {
        let list = this.state.list;
        let el = list.find(el => el.id === id);
        el[prop] = !el[prop];
        this.setState({
            list: list
        })
    }

    getByProp = (prop) => {
        let list = this.state.list;
        return list.filter(x => x[prop] === true);
    }

    render() {
        const listItems = this.state.list.map((item, index) => {
            let classNames = ["item"];
            if (item.done) {
                classNames.push("done");
            }
            classNames = classNames.join(" ");

            let doneIcon = faCheck;
            if(item.done) {
                doneIcon = faUndo;
            }
            return (<ListGroupItem key={item.id}>
                <table className={classNames}>
                    <tbody>
                    <tr>
                        <td className="text">{index+1}. {item.text}</td>
                        <td className="actions">
                            <a href="javascript:;" onClick={(e) => this.toggleProp(item.id, 'done')}><FontAwesomeIcon
                                icon={doneIcon}/></a>
                            <a href="javascript:;" onClick={(e) => this.deleteTodo(item.id)}><FontAwesomeIcon
                                icon={faTrashAlt}/></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </ListGroupItem>)
        });

        const doneItems = this.getByProp("done");

        let doneItemsText = ("");
        if (doneItems.length > 0) {
            doneItemsText = doneItems.length + " task/s completed";
        }

        let addBtn = ("");

        if (this.state.newTodo) {
            addBtn = (<InputGroupAddon addonType="append">
                <Button onClick={this.addNew}>Add</Button>
            </InputGroupAddon>);
        }

        let subheaderText = "Your list is empty";

        if(this.state.list.length > 0) {
            subheaderText = "You have " + this.state.list.length + " task/s in your list"
        }

        return (
            <div className="App">
                <div className="todo">
                    <p className="subheader-text">{subheaderText}</p>
                    <div className="todo-list">
                        <ListGroup>
                            <ListGroupItem key={0}>
                                <InputGroup>
                                    <Input placeholder="What to do?" value={this.state.newTodo}
                                           onKeyPress={this.handleNewTodoInputKeyPress}
                                           onChange={this.handleNewTodoInputChange}/>
                                    {addBtn}
                                </InputGroup>
                            </ListGroupItem>
                            {listItems}
                        </ListGroup>
                    </div>
                    <p className="footer-text">{doneItemsText}</p>
                </div>
            </div>
        );
    }
}

export default App;