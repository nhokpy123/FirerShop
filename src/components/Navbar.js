import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload); // payload should contain email or username
            } catch (e) {
                console.error('Invalid token:', e);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">FirerShop</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>

                    <div className="buttons text-center d-flex align-items-center">
                        {user ? (
                            <>
                                {/* Username Dropdown */}
                                <div className="dropdown me-2">
                                <button
                                    className="btn btn-outline-dark rounded-pill d-flex align-items-center px-3 py-1 dropdown-toggle"
                                    type="button"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-user-circle me-2"></i>
                                    {user.username || user.email}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-sm rounded" aria-labelledby="userDropdown">
                                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fa fa-sign-out-alt me-2"></i>Logout</button></li>
                                </ul>
                                </div>


                                {/* Cart button stays visible */}
                                <NavLink to="/cart" className="btn btn-outline-dark rounded-pill d-flex align-items-center px-3 py-1">
                                    <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark rounded-pill d-flex align-items-center px-3 py-1 m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark rounded-pill d-flex align-items-center px-3 py-1 m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
