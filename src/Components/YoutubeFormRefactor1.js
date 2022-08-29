import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik"
import Grid from '@material-ui/core/Grid'
import * as Yup from "yup"
import TextError from './TextError'


const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    // nested object
    social: {
        facebook: "",
        twitter: ""
    },
    //array
    phoneNumbers: ["", ""],
    phNumbers: [""]
}

const onSubmit = values => {
    console.log("Form values", values)
}

//onChange, onBlur, and submit cause validation to run
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    channel: Yup.string().required("Required"),
    comments: Yup.string().required("Required")
})

//Field Level Validation
const validateComments = value => {
    let error
    if (!value) {
        error = "Required"
    }
    return error
}
function YoutubeFormRefactor1() {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            //do not run validation on change event
            validationOnChange={false}
            validationOnBlur={false}>

            {
                formik => {
                    console.log("Formik Props", formik)
                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor="name">Name</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                />
                                {/* Accepts a name prop and renders the error message if field is visited and error exist   */}
                                {/* custom component */}
                                <ErrorMessage name="name" component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="email">E-mail</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                                <ErrorMessage name="email">
                                    {
                                        (errorMsg) => <div className="error">{errorMsg}</div>
                                    }
                                </ErrorMessage>
                            </div>

                            <div className='form-control'>
                                <label htmlFor="channel">Channel</label>
                                <Field
                                    type="text"
                                    id="channel"
                                    name="channel"
                                />
                                <ErrorMessage name="channel" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="comments">Comments</label>
                                <Field
                                    as="textarea"
                                    id="comments"
                                    name="comments"
                                    //field level validation
                                    validate={validateComments}
                                />
                                <ErrorMessage name="comments" component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="address">Address</label>
                                {/* fast field blocks render unless you change this field */}
                                <FastField name="address">
                                    {
                                        (props) => {
                                            //console.log("Field Render")
                                            const { field, meta } = props
                                            //The three props are field, form, and meta
                                            //console.log("Render Props", props)
                                            //neeed {...field} to hook the input
                                            return (
                                                <div>
                                                    <input type="text" id="address" {...field} />
                                                    {meta.touched && meta.error ? (<div>{meta.error}</div>) : null}
                                                </div>
                                            )
                                        }
                                    }
                                </FastField>
                            </div>

                            <div className='form-control'>
                                <label htmlFor="facebook">Facebook profile</label>
                                <Field
                                    type="text"
                                    id="facebook"
                                    // name attribute must be the object's properties
                                    name="social.facebook"
                                />
                            </div>


                            <div className='form-control'>
                                <label htmlFor="twitter">Twitter profile</label>
                                <Field
                                    type="text"
                                    id="twitter"
                                    name="social.twitter"
                                />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="primaryPh">Primary Phone Number</label>
                                <Field
                                    type="text"
                                    id="primaryPh"
                                    name="phoneNumbers[0]"
                                />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="secondaryPh">Secondary Phone Number</label>
                                <Field
                                    type="text"
                                    id="secondaryPh"
                                    name="phoneNumbers[1]"
                                />
                            </div>

                            <div className='form-control'>
                                <label>List of Phone Number</label>
                                <FieldArray name="phNumbers">
                                    {
                                        (fieldArrayProps) => {
                                            //console.log("FieldArray Props", fieldArrayProps)
                                            //contains push remove and form
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { phNumbers } = values
                                            //console.log("Form errors", form.errors)

                                            return (
                                                <div>
                                                    {phNumbers.map((phNumber, index) => (
                                                        <div key={index}>
                                                            <Field name={`phNumbers[${index}]`} />
                                                            {/* Remove the index */}
                                                            {
                                                                index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null
                                                            }

                                                            {/* push an empty value into the array */}
                                                            <button type="button" onClick={() => push("")}>+</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    }
                                </FieldArray>
                            </div>
                            {/* error only displays if touched and changed */}
                            <button 
                                type="button" 
                                onClick={() => formik.validateField("comments")}>
                                Validate comments
                            </button>

                            <button 
                                type="button" 
                                onClick={() => formik.validateForm()}>
                                Validate all
                            </button>

                            <button 
                                type="button" 
                                onClick={() => formik.setFieldTouched("comments")}>
                                Visit comments
                            </button>

                            <button 
                                type="button" 
                                onClick={() => formik.setTouched({
                                    // need to specify which field to touch
                                    name:true,
                                    email:true,
                                    channel:true,
                                    comments:true
                                })}>
                                Visit fields
                            </button>

                            <Grid container>
                                <Grid item xs={12} sm={12}>
                                    <Field
                                        custom={{ variant: 'outlined', fullWidth: true, }}
                                        name='averagePrice'
                                        label='Average Price'
                                        type="date"
                                        defaultValue={new Yup.date()}
                                    />
                                </Grid>
                            </Grid>
                            
                                

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            }

        </Formik>
    )
}

export default YoutubeFormRefactor1