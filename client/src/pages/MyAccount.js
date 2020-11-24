import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Container,
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    TextField,
    Snackbar
} from "@material-ui/core";
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
        marginTop: theme.spacing(25)
    },
    rootTitle: {
        marginTop: theme.spacing(7)
    },
    coverPhoto: {
        height: 350,
        width: "100%",
        objectFit: "cover"
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

export default function MyAccount() {
    const classes = useStyles();
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [URL, setURL] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [file, setFile] = useState({});
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    let s3fileURL = null;
    let config = {
        s3: {
            bucketName: "harvestcrunch-bakedgoods",
            region: "us-east-2",
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
            dirName: user._id
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
    let S3Client = new S3(config.s3);

    useEffect(() => {
        config.dirName = user._id;
        S3Client = new S3(config.s3);
        setShopName(user.shopName);
        setShopDescription(user.shopDescription);
        setURL(user.shopCoverPic);
        setIsUserLoaded(true);
    }, [user._id]);

    const submitUpdate = async () => {
        if (Object.keys(file).length > 0 && file.constructor === Object) {
            const filename = file.name.split(".")[0];
            try {
                const data = await S3Client.uploadFile(file, filename);
                s3fileURL = data.location;
            } catch (err) {
                console.log(err);
                return;
            }
        }

        try {
            const res = await axios.put(
                "http://localhost:3001/user/shop",
                { shopName, shopDescription, shopCoverPic: s3fileURL || URL },
                config.headers
            );
            setSuccessOpen(true);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrorOpen(true);
                console.log(err.response.data.msg);
                return { error: err.response.data.msg };
            }
        }
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
    };

    const onDrop = useCallback(files => {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const binaryStr = reader.result;
                setURL(binaryStr);
            };
            reader.readAsDataURL(file);
            setFile(file);
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

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
                            Shop Profile Updated!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={errorOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error">
                            Please Try Again!
                        </Alert>
                    </Snackbar>
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <h1 className={classes.rootTitle}>
                            Update My Shop Profile
                        </h1>

                        <Card {...getRootProps()}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.coverPhoto}
                                    image={URL}
                                    title="Cover Photo"
                                />
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop the files now ...</p>
                                ) : (
                                    <p>
                                        Drag 'n' drop some files here, or click
                                        to select files
                                    </p>
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <form className={classes.rootForm}>
                            <TextField
                                id="outlined-basic"
                                label="Shop-Name"
                                value={shopName}
                                variant="outlined"
                                fullWidth={true}
                                onChange={e => setShopName(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                value={shopDescription}
                                variant="outlined"
                                fullWidth={true}
                                rows={4}
                                multiline
                                onChange={e =>
                                    setShopDescription(e.target.value)
                                }
                            />
                        </form>
                    </Grid>
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
                            onClick={submitUpdate}
                            disabled={!isUserLoaded}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
