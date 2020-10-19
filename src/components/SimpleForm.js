import React from 'react'
import {Formik, Form, Field, ErrorMessage, FastField, FieldArray} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    social: {
        facebook: "",
        instagram: ""
    },
    phoneNumbers:["",""],
    phNumbers: [""]
}

const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values)
    onSubmitProps.resetForm()
}


const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required"),
    channel: Yup.string().required("Required"),
})

const validateComments = value =>{
    let error
    if (!value){
        error = "Required"
    }
    return error
}

function SimpleForm() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
            //validateOnMount
            >
            {formik => {
                console.log("Formik props", formik)
                return(
            
            <Form>
                <div className="form-control">
                    <label htmlFor='name'>Name</label>
                    <Field type="text" id="name" name="name"/>
                    <ErrorMessage name="name" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor='email'>E-mail</label>
                    <Field type="email" id="email" name="email"/>
                    <ErrorMessage name="email">
                    {
                        (errorMsg) => <div className="error">{errorMsg}</div>
                    }
                    </ErrorMessage>
                </div>
                
                <div className="form-control">
                    <label htmlFor='channel'>Channel</label>
                    <Field type="text" id="channel" name="channel"/>
                    <ErrorMessage name="channel" component={TextError}/>
                </div>             

                <div className="form-control">                
                    <label htmlFor='facebook'>Facebook Profile</label>
                    <Field type="text" id="facebook" name="social.facebook"/>
                </div>      

                <div className="form-control">                
                    <label htmlFor='instagram'>Instagram Profile</label>
                    <Field type="text" id="instagram" name="social.instagram"/>
                </div>      
                
                <div className="form-control">                
                    <label htmlFor='primaryPh'>Primary Phone Number</label>
                    <Field type="text" id="primaryPh" name="phoneNumbers[0]"/>
                </div>      

                <div className="form-control">                
                    <label htmlFor='secondaryPh'>Secondary Phone Number</label>
                    <Field type="text" id="secondaryPh" name="phoneNumbers[1]"/>
                </div>      

                <div className="form-control">                
                    <label>List of Phone Numbers</label>
                    <FieldArray name="phNumbers">
                        {
                            (FieldArrayProps) => {
                                const {push, remove, form} = FieldArrayProps
                                const {values} = form
                                const {phNumbers} = values
                                return(
                                <div>
                                {
                                    phNumbers.map((phNumbers, index) => (
                                        <div key={index}>
                                        <Field type="text" name={`phNumbers[${index}]`} />
                                        </div>
                                ))}
                                </div>
                            )
                        }}
                    </FieldArray>
                </div>      

                <div className="form-control">                
                    <label htmlFor='comments'>Comments</label>
                    <Field as="textarea" id="comments" name="comments" validate={validateComments}/>
                    <ErrorMessage name="comments" component={TextError} />
                </div>           

                <button type="submit" disabled={!(formik.isValid)} >Submit</button>
                <button type="reset">Reset</button>
            </Form>
                )}}
        </Formik>
    )
}

export default SimpleForm
