import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
    {name: "title", label: "Survey Title"},
    {name: "subject", label: "Subject Line"},
    {name: "body", label: "Email Body"},
    {name: "recipients", label: "Recipient List"}
];

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({name, label}) => {
            return <Field component={SurveyField} type="text" name={name} label={label} key={name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <button type="submit" className="btn-flat right white-text teal">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">clear</i>
                    </Link>
                </form>
            </div>
        );
    }
}

const validateForm = values => {
    const errors = {};

    const invalidEmails = validateEmails(values.recipients || '');

    if (invalidEmails && invalidEmails.length) {

        errors.recipients = invalidEmails.includes("") ?
                            "Recipient list contains extra commas"
                            : `These emails are invalid: ${invalidEmails}`;
    }

    FIELDS.forEach(({name, label}) => {
       if (!values[name]) {
           errors[name] = `${label} is required.`
       }
    });

    return errors;
};

export default reduxForm({
    validate: validateForm,
    form: 'surveyForm'
})(SurveyForm);
