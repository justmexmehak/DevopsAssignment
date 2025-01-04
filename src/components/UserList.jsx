import React, { Component } from "react";
import axios from 'axios';
import './styles/Form.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class UserList extends Component {
    state = {
        users: [],
        showModal: false,
        currentUser: null
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await axios.get('https://mehak23.pythonanywhere.com/api/list-app-users/');
            this.setState({ users: response.data });
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        }
    };

    handleDelete = async (userEmail) => {
        try {
            await axios.delete(`https://mehak23.pythonanywhere.com/api/delete-app-user/${userEmail}/`);
            this.fetchUsers();
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    handleEdit = (user) => {
        this.setState({ showModal: true, currentUser: user });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, currentUser: null });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentUser: { ...prevState.currentUser, [name]: value }
        }));
    };

    handleSave = async () => {
        const { currentUser } = this.state;
        try {
            await axios.put(`https://mehak23.pythonanywhere.com/api/update-app-user/${currentUser.email}/`, currentUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.fetchUsers();
            this.handleCloseModal();
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    render() {
        const { users, showModal, currentUser } = this.state;

        return (
            <div className = "users">
                {users.map(user => (
                    <div key={user.email} className="user">
                        <span>{user.full_name}</span>
                        <span className="icons">
                            <i className="fas fa-edit edit" onClick={() => this.handleEdit(user)}></i>
                            <i className="fas fa-trash-alt delete" onClick={() => this.handleDelete(user.email)} ></i>
                        </span>
                    </div>
                ))}
            {showModal && currentUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.handleCloseModal}>&times;</span>
                        <h2>Edit User</h2>
                        <form>
                            <label>
                                Full Name:
                                <input type="text" name="full_name" value={currentUser.full_name} onChange={this.handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={currentUser.email} onChange={this.handleChange} />
                            </label>
                            <label>
                                Age:
                                <input type="number" name="age" value={currentUser.age} onChange={this.handleChange} />
                            </label>
                            <label>
                                Gender:
                                <select name="gender" value={currentUser.gender} onChange={this.handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                            <label>
                                    Address:
                                    <input type="text" name="address" value={currentUser.address} onChange={this.handleChange} />
                                </label>
                                <button type="button" onClick={this.handleSave}>Save</button>
                            </form>
                        </div>
                    </div>
                )}  
                </div>
            
        );
    }
}

export default UserList;