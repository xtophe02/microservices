import {
  Container,
  Typography,
  TextField,
  makeStyles,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "password",
    email: "jdoe@gmail.com",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <Container maxWidth="sm">
      <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <TextField
          id="email"
          type="email"
          label="Email Address"
          variant="outlined"
          value={values.email}
          onChange={handleChange("email")}
          fullWidth
        />
        {/* <TextField
          id="password"
          type={values.showPassword ? "text" : "password"}
          label="Password"
          onChange={handleChange("password")}
          
        /> */}
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button variant="outlined" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};
