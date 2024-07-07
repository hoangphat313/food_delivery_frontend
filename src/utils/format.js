export const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
export const calculateDiscount = (org, mrp) => {
    return ((mrp - org) / mrp) * 100;
};
