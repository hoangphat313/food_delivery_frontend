import React, { useState, useEffect } from 'react';
import { getDetailUser } from '../../api';
import ProfileEditForm from '../../components/ProfileForm/ProfileEditForm';
import defaultAvatar from "../../utils/Images/default_avatar.png";
import { toast } from 'react-toastify';
import ToastNotifier from '../../utils/ToastNotifier';
import { Container, ProfileCard, ProfileHeader, Avatar, DefaultAvatar } from "./style"

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('food-app-token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getDetailUser(token);
                setProfile(res);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy hồ sơ:', error);
                setError('Lỗi khi lấy hồ sơ. Vui lòng thử lại.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const handleUpdateSuccess = (updatedProfile) => {
        setProfile(updatedProfile);
        toast.success('Cập nhật hồ sơ thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <Container>
            <ToastNotifier />
            {loading ? (
                <p>Đang tải hồ sơ...</p>
            ) : error ? (
                <p>{error}</p>
            ) : profile ? (
                <>
                    <ProfileCard>
                        <ProfileHeader>
                            {profile.img ? (
                                <Avatar src={profile.img} alt={profile.name} />
                            ) : (
                                <DefaultAvatar src={defaultAvatar} alt="Ảnh đại diện mặc định" />
                            )}
                            <h2>{profile.name}</h2>
                            <p>{profile.email}</p>
                        </ProfileHeader>
                        <ProfileEditForm
                            currentUser={profile}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    </ProfileCard>
                </>
            ) : (
                <p>Không tìm thấy dữ liệu hồ sơ.</p>
            )}
        </Container>
    );
};

export default ProfilePage;
