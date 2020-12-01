import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Joi from "joi-browser";
import AuthContext from "../context/authContext";

const Register = props => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
    }, [isAuthenticated, props.history]);

    const schema = {
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).label("Password")
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(user, schema, options);
        if (!error) return false;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    const validateProperty = ({ id, value }) => {
        const obj = { [id]: value };
        const schemaObj = { [id]: schema[id] };
        const { error } = Joi.validate(obj, schemaObj);
        return error ? error.details[0].message : null;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = validate();
        setErrors({ errors: errors || {} });
        if (errors) return;
        const backendErr = await register(user);
        backendErr && setErrors(backendErr);
    };
    const handleChange = ({ currentTarget }) => {
        const newErrors = { ...errors };
        const errorMessage = validateProperty(currentTarget);
        if (errorMessage) newErrors[currentTarget.id] = errorMessage;
        else delete newErrors[currentTarget.id];
        setErrors(newErrors);

        setUser({ ...user, [currentTarget.id]: currentTarget.value });
    };
    const addFormName = formName => {
        return (
            <Grid>
                <Typography
                    style={{ textAlign: "center", margin: 15 }}
                    component="h1"
                    variant="inherit"
                >
                    {formName}
                </Typography>
            </Grid>
        );
    };

    const addInputField = (id, label, placeholder, type = "text") => {
        return (
            <Grid item>
                <TextField
                    id={id}
                    label={label}
                    type={type}
                    style={{ margin: 8 }}
                    fullWidth={true}
                    placeholder={placeholder}
                    value={user[id]}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="outlined"
                />
            </Grid>
        );
    };
    const showError = TextField => {
        return (
            <div>
                <Alert severity="error">{errors[TextField]}</Alert>
            </div>
        );
    };

    const addButton = desc => {
        return (
            <Button
                variant="contained"
                style={{ margin: 15 }}
                color="primary"
                type="submit"
                disabled={validate() ? true : false}
            >
                {desc}
            </Button>
        );
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3}>
                {addFormName("Sign up")}
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        alignItems="center"
                        direction="column"
                        spacing={1}
                    >
                        {errors["backendErr"] && showError("backendErr")}
                        {addInputField(
                            "name",
                            "First name",
                            "Please enter first name"
                        )}
                        {errors["name"] && showError("name")}

                        {addInputField(
                            "email",
                            "Email",
                            "Please enter email id"
                        )}
                        {errors["email"] && showError("email")}

                        {addInputField(
                            "password",
                            "Password",
                            "Please enter password",
                            "password"
                        )}
                        {errors["password"] && showError("password")}
                        {addButton("SIGN UP")}
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
