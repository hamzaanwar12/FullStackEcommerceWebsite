import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import signUpSchema from "./schema/index"
import { useFormik } from 'formik';
import Form from './Form';
import Home from "./Home";
import Login from "./Login"; // Import the Login component
import "./App.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
