import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from "./style"
import { updateProfile } from '../../api';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/reducers/UserSlice';

const ProfileEditForm = ({ currentUser, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        img: currentUser.img,
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('food-app-token');
            const updatedUser = await updateProfile(token, formData);
            onUpdateSuccess(updatedUser);
            dispatch(updateUser(updatedUser)); // Cập nhật người dùng trong Redux store
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="name">Name:</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email:</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="img">Avatar URL:</Label>
                <Input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit">Update Profile</Button>
        </Form>
    );
};

export default ProfileEditForm;
