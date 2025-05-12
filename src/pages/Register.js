import React from 'react';
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string().min(3, 'Username must be at least 3 characters').required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Required'),
    });

    const handleRegister = async (values, { setSubmitting, setStatus }) => {
        try {
            await axios.post('https://api-shop-uy38.onrender.com/api/auth/register', {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            setStatus('Registration successful!');
            navigate('/login');
        } catch (err) {
            setStatus('Registration failed. Email may already exist.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 ">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto shadow p-4 rounded bg-light">
                        <Formik
                            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleRegister}
                        >
                            {({ isSubmitting, status }) => (
                                <Form>
                                    <div className="form my-3">
                                        <label htmlFor="username">Username</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Enter your name"
                                        />
                                        <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <div className="form my-3">
                                        <label htmlFor="email">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="name@example.com"
                                        />
                                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <div className="form my-3">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <div className="form my-3">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <div className="my-3">
                                        <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                                    </div>

                                    <div className="text-center">
                                        <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                        {status && (
                                            <p style={{ color: status.includes('successful') ? 'green' : 'red' }}>
                                                {status}
                                            </p>
                                        )}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
