import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await axios.post(
        "https://api-shop-uy38.onrender.com/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      localStorage.setItem("token", res.data.token);
      setStatus({ success: "Login successful!" });
      navigate("/");
    } catch (err) {
      setStatus({ error: "❌ Invalid email or password!" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto shadow p-4 rounded bg-light">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  <div className="form-group my-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group my-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {status?.error && (
                    <div className="text-danger text-center my-2">{status.error}</div>
                  )}
                  {status?.success && (
                    <div className="text-success text-center my-2">{status.success}</div>
                  )}

                  <div className="text-center my-3">
                    <button
                      className="btn btn-dark w-100"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  <div className="text-center">
                    <small>
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-underline text-info"
                      >
                        Register
                      </Link>
                    </small>
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

export default Login;
