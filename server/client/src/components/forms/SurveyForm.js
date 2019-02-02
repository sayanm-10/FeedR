import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

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
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
