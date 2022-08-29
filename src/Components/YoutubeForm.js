import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"

//1.The initial value of the form
const initialValues = {
    name:"",
    email:"",
    channel:""
}

//4.console.log after submission
const onSubmit = values => {
    console.log("Form values", values)
}

//need to pass in an obect with all the form fields
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    channel: Yup.string().required("Required")
})

function YoutubeForm() {
    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema
    //     // validate
    // })

    //console.log("Form values", formik.values)
    //console.log("Form errors", formik.errors)
    //console.log("Visited", formik.touched)

    //2.formik.values contains all the form values
    //formik.handleChange fires when there is a change

    //3.formik.handleSubmit is a helper method that handles submission

  return (
    // code refactoring for the formik component
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {/* remove onSubmit prop from the Form */}
        <Form>
            <div className='form-control'>
                <label htmlFor="name">Name</label>
                {/* change all input to Field, then remove the getFieldProps */}
                <Field 
                // the Field Component does three things
                // 1. hook up inputs to top level formik component
                // 2. Use name attribute to match up formik state
                // 3. field will render
                    type="text" 
                    id="name" 
                    name="name" 
                    // onBlur keep track if the field is visited in formik.touched
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur} 
                    // value={formik.values.name}
                    //  OnChange, onBlur, and value on every field => shorten it down
                    //formik.getFieldProps = onChange + onBlur, + value
                    // {...formik.getFieldProps("name")}
                />
                {/* if formik error and touched exist render it */}
                {/* {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>: null} */}
                <ErrorMessage name="name"/>
            </div>

            <div className='form-control'>
                <label htmlFor="email">E-mail</label>
                <Field 
                    type="email" 
                    id="email" 
                    name="email" 
                    // onChange={formik.handleChange} 
                    // onBlur={formik.handleBlur} 
                    // value={formik.values.email} 
                    // {...formik.getFieldProps("email")}
                />
                {/* {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div>: null} */}
                <ErrorMessage name="email"/>
            </div>

            <div className='form-control'>
                <label htmlFor="channel">Channel</label>
                <Field 
                    type="text" 
                    id="channel" 
                    name="channel" 
                    // onChange={formik.handleChange} 
                    // onBlur={formik.handleBlur} 
                    // value={formik.values.channel}
                    // {...formik.getFieldProps("channel")}
                />
                {/* {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div>: null} */}
                <ErrorMessage name="channel"/>
            </div>
            <Grid container>
                    <Grid item xs={12} sm={12}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='averagePrice'
                        label='Average Price'
                        type="number"
                        defaultValue={0}
                        component={TextField}
                      />
                  </Grid>
            </Grid>

            <button type="submit">Submit</button>
        </Form>
    </Formik>
  )
}

export default YoutubeForm