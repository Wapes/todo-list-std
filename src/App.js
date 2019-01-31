import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {InputGroup, InputGroupText, InputGroupAddon, Input, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUndo, faCheck, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons'


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
        let newTodo = this.state.newTodo;

        if(newTodo && newTodo.trim()) {
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

    getCompleted = (prop) => {
        let list = this.state.list;
        return list.filter(x => x[prop] === true);
    }

    clearCompletedTasks = () => {
        let list = this.state.list;
        let result = list.filter(x => x.done === false);
        this.setState({
            list: result
        })
    }

    clearAll = () => {
        if(window.confirm("Сигурни ли сте, че искате да изтриете всички задачи?")) {
            this.setState({
                list: [],
                newTodo: ""
            })
        }
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

        const doneItems = this.getCompleted("done");

        let doneItemsText = ("");
        let doneItemsLengthText = "приключени задачи";
        if(doneItems.length === 1) {
            doneItemsLengthText = "приключена задача";
        }

        if (doneItems.length > 0) {
            doneItemsText = (<span>
                {doneItems.length} {doneItemsLengthText}
                <a onClick={this.clearCompletedTasks} className="float-right" href="javascript:;">Изчисти приключените</a>
            </span>);
        }

        let addBtn = ("");

        if (this.state.newTodo && this.state.newTodo.trim()) {
            addBtn = (<InputGroupAddon addonType="append">
                <Button onClick={this.addNew}><FontAwesomeIcon
                    icon={faPlus}/></Button>
            </InputGroupAddon>);
        }

        let subheaderText = "Списъкът ви е празен";
        let itemsLengthText = "задачи";
        if(this.state.list.length === 1) {
            itemsLengthText = "задача";
        }
        if(this.state.list.length > 0) {
            subheaderText = (<span>
                Вие имате {this.state.list.length} {itemsLengthText} в списъка си
                <a onClick={this.clearAll} className="float-right" href="javascript:;">Изчисти всички</a>
            </span>)
        }

        return (
            <div className="App">
                <div className="todo">
                    <p className="subheader-text">{subheaderText}</p>
                    <div className="todo-list">
                        <ListGroup>
                            <ListGroupItem key={0}>
                                <InputGroup size="lg">
                                    <Input placeholder="Какви задачи имате?" value={this.state.newTodo}
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
