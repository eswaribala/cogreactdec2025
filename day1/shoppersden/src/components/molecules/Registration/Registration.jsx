import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Registration.css';

function Registration() {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Must be at least 3 characters' )
      .max(25, 'Must be 25 characters or less')
      .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('Required'),
    lastName: Yup.string()
      .min(3, 'Must be at least 3 characters' )
      .max(20, 'Must be 20 characters or less')
      .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('Required'),
    username: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .max(10, 'Must be 10 characters or less')
      .matches(/^[A-Za-z0-9_]+$/, 'Only alphanumeric characters and underscores are allowed')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character')
      .required('Required'),
    dob: Yup.date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in the format YYYY-MM-DD')
      .required('Required'),
    mobileNo: Yup.number()
      .typeError('Must be a number')
      .min(1000000000, 'Must be at least 10 digits')
      .max(9999999999, 'Must be at most 10 digits')
      .required('Required'),
  });

  const formik=useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      dob: '',
      mobileNo: 0,

    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('Form data', values);
    },
  });


}

export default Registration;
