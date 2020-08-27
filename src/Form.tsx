import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NativeFormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField, Button, Paper, makeStyles } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

type FormProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  generateType: string;
  setGenerateType: React.Dispatch<React.SetStateAction<string>>;
  splitIndex: number;
  setsplitIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useStyles = makeStyles({
  form: {
    margin: "20px",
    padding: "20px",
  },
});

const FormControl = styled(NativeFormControl)({
  textAlign: "center",
  display: "flex",
  padding: "1em",
  justifyContent: "center",
});

export default function Form({
  generateType,
  setGenerateType,
  content,
  setContent,
  splitIndex,
  setsplitIndex,
}: FormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenerateType((event.target as HTMLInputElement).value);
  };

  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent((event.target as HTMLInputElement).value);
    setsplitIndex(
      Math.floor((event.target as HTMLInputElement).value.length / 2)
    );
  };

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.form}>
      <FormControl>
        <FormLabel component="legend">文字</FormLabel>
        <TextField
          value={content}
          onChange={handleChangeContent}
          label="请输入文字"
        />
      </FormControl>

      <FormControl>
        <FormLabel component="legend">类型</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={generateType}
          onChange={handleChange}
        >
          <FormControlLabel value="svg" control={<Radio />} label="SVG" />
          <FormControlLabel value="png" control={<Radio />} label="PNG" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <Button>Generate</Button>
      </FormControl>
    </Paper>
  );
}
