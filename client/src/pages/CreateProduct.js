import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper, Grid, TextField, InputAdornment, FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import '../App.css';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rootPaper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
      marginTop: theme.spacing(4),
    },
  },
  rootForm: {
    '& > *': {
      margin: theme.spacing(1),
    },
    marginTop: theme.spacing(17),
  },
  marginTop136: {
    marginTop: theme.spacing(17),
  },
  marginTop64: {
    marginTop: theme.spacing(8),
  }
}));

const typeOfProduct = [
  {
    value: 'Cake',
    label: 'Cake',
  },
  {
    value: 'Cupcake',
    label: 'Cupcake',
  },
  {
    value: 'Macarons',
    label: 'Macarons',
  },
  {
    value: 'Cookies',
    label: 'Cookies',
  },
  {
    value: 'Confections',
    label: 'Confections',
  },
];

export default function CreateProduct() {
  const classes = useStyles();

  return (
    <div>
        <Container>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <h1 className={classes.marginTop136}>Upload new product</h1>

                <div className={classes.rootPaper}>
                  <Paper elevation={3} />
                  <Paper elevation={3} />
                  <Paper elevation={3} />
                </div>
                <div className={classes.rootPaper}>
                  <Paper elevation={3} />
                  <Paper elevation={3} />
                  <Paper elevation={3} />
                </div>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.rootForm}>
                  <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth />
                  <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth rows={4} multiline/>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          label="Amount"
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
                          native: true,
                        }}
                        variant="outlined"
                      >
                        {typeOfProduct.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <Grid className={classes.marginTop64} container justify="center">
              <Grid item xs={4}>
                <Button variant="outlined" fullWidth size="large">Upload</Button>
              </Grid>
            </Grid>
        </Container>
    </div>
  );
}