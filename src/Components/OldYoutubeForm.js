import React from 'react'
import {useFormik} from "formik"
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

const validate = values => {
    //values.name values.email values.channel
    //errors.name errors.email erros.channel
    let errors ={}

    if(!values.name){
        errors.name = "Required"
    }

    if(!values.email){
        errors.email = "Required"
    }

    if(!values.channel){
        errors.channel = "Required"
    }

    return errors
}

//need to pass in an obect with all the form fields
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    channel: Yup.string().required("Required")
})

function OldYoutubeForm() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        // validate
    })

    //console.log("Form values", formik.values)
    //console.log("Form errors", formik.errors)
    console.log("Visited", formik.touched)

    //2.formik.values contains all the form values
    //formik.handleChange fires when there is a change

    //3.formik.handleSubmit is a helper method that handles submission

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <label htmlFor="name">Name</label>
                <Field 
                    type="text" 
                    id="name" 
                    name="name" 
                    onChange={formik.handleChange}
                    // onBlur keep track if the field is visited in formik.touched
                    onBlur={formik.handleBlur} 
                    value={formik.values.name}
                />
                {/* if formik error and touched exist render it */}
                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>: null}
            </div>

            <div className='form-control'>
                <label htmlFor="email">E-mail</label>
                <Field 
                    type="email" 
                    id="email" 
                    name="email" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.email} 
                />
                {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div>: null}
            </div>

            <div className='form-control'>
                <label htmlFor="channel">Channel</label>
                <Field 
                    type="text" 
                    id="channel" 
                    name="channel" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.channel}
                />
                {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div>: null}
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default OldYoutubeForm