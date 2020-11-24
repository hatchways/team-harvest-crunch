<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Container,
    Paper,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    Snackbar
} from "@material-ui/core";
=======
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper, Grid, TextField, InputAdornment, FormControl, InputLabel, OutlinedInput, Snackbar } from "@material-ui/core";
>>>>>>> 18b02a0630920725907afb07b586d8446cd7f999
import MuiAlert from "@material-ui/lab/Alert";
import S3 from "aws-s3";
import AuthContext from "../context/authContext";

const useStyles = makeStyles(theme => ({
    rootHeader: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    rootPaper: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: "28%",
            height: theme.spacing(16),
            marginTop: theme.spacing(4)
        }
    },
    rootForm: {
        "& > *": {
            margin: theme.spacing(1)
        },
        marginTop: theme.spacing(30)
    },
    rootTitle: {
        marginTop: theme.spacing(17)
    },
    uploadContainer: {
        marginTop: theme.spacing(8)
    },
    rootSnackbar: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2)
        }
    }
}));

const typeOfProduct = [
    {
        value: "Cake",
        label: "Cake"
    },
    {
        value: "Cupcake",
        label: "Cupcake"
    },
    {
        value: "Macarons",
        label: "Macarons"
    },
    {
        value: "Cookies",
        label: "Cookies"
    },
    {
        value: "Confections",
        label: "Confections"
    }
];

export default function CreateProduct() {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [productType, setProductType] = useState("Cake");
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    let config = {
        bucketName: "harvestcrunch-bakedgoods",
        region: "us-east-2",
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        dirName: user._id
    };
    let S3Client = new S3(config);

    useEffect(() => {
        config.dirName = user._id;
        S3Client = new S3(config);
        setIsUserLoaded(true);
    }, [user._id]);

    const handlePhotoButton = event => {
        const photoFile = event.target.files[0];
        const filename = photoFile.name.split(".")[0];
        S3Client.uploadFile(photoFile, filename)
            .then(data => {
                files.push(data.location);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const submitProduct = () => {
        fetch("/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                title: title,
                description: description,
                price: amount,
                productType: productType,
                user_id: user._id,
                photos: files
            })
        })
            .then(res => {
                if (res.status === 200) {
                    setSuccessOpen(true);
                } else if (res.status === 400) {
                    setErrorOpen(true);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

<<<<<<< HEAD
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccessOpen(false);
        setErrorOpen(false);
    };
    return (
        <div>
            <Container>
                <div className={classes.rootSnackbar}>
                    <Snackbar
                        open={successOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success">
                            Product Created!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={errorOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error">
                            Product Already Exists!
                        </Alert>
                    </Snackbar>
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <h1 className={classes.rootTitle}>
                            Upload new product
                        </h1>
                        <div className={classes.rootPaper}>
                            {["1", "2", "3", "4", "5", "6"].map(num => (
                                <Paper key={num} elevation={3}>
                                    <input
                                        id={num}
                                        type="file"
                                        onChange={handlePhotoButton}
                                        disabled={!isUserLoaded}
                                    />
                                </Paper>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <form className={classes.rootForm}>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                variant="outlined"
                                fullWidth={true}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                fullWidth={true}
                                rows={4}
                                multiline
                                onChange={e => setDescription(e.target.value)}
                            />
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            Amount
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Amount"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            }
                                            onChange={e =>
                                                setAmount(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        id="outlined-select-currency-native"
                                        select
                                        fullWidth
                                        label="Type of Product"
                                        SelectProps={{
                                            native: true
                                        }}
                                        variant="outlined"
                                        onChange={e =>
                                            setProductType(e.target.value)
                                        }
                                    >
                                        {typeOfProduct.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
=======
    setSuccessOpen(false);
    setErrorOpen(false);
  };
  return (
    <div>
      <Container>
        <div className={classes.rootSnackbar}>
          <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Product Created!
            </Alert>
          </Snackbar>
          <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Product Already Exists!
            </Alert>
          </Snackbar>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <h1 className={classes.rootTitle}>Upload new product</h1>
            <div className={classes.rootPaper}>
              {["1", "2", "3", "4", "5", "6"].map(num => (
                <Paper elevation={3}>
                  <input id={num} type="file" onChange={handlePhotoButton} disabled={!isUserLoaded}/>
                </Paper>
              ))}
            </div>
          </Grid>
          <Grid item xs={6}>
            <form className={classes.rootForm}>
              <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth onChange={e => setTitle(e.target.value)} />
              <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth rows={4} multiline onChange={e => setDescription(e.target.value)} />
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      label="Amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </FormControl>
>>>>>>> 18b02a0630920725907afb07b586d8446cd7f999
                </Grid>
                <Grid
                    className={classes.uploadContainer}
                    container
                    justify="center"
                >
                    <Grid item xs={4}>
                        <Button
                            variant="outlined"
                            fullWidth={true}
                            size="large"
                            onClick={submitProduct}
                            disabled={!isUserLoaded}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
<<<<<<< HEAD
            </Container>
        </div>
    );
}
=======
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid className={classes.uploadContainer} container justify="center">
          <Grid item xs={4}>
            <Button variant="outlined" fullWidth size="large" onClick={submitProduct} disabled={!isUserLoaded}>Upload</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
>>>>>>> 18b02a0630920725907afb07b586d8446cd7f999
