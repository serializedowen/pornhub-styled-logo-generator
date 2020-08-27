import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NativeFormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField, Paper, makeStyles, IconButton } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import RendererTypes from "src/renderers/rendererTypes";
import GetAppIcon from "@material-ui/icons/GetApp";

type FormProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  generateType: string;
  setGenerateType: React.Dispatch<React.SetStateAction<string>>;
  splitIndex: number;
  setsplitIndex: React.Dispatch<React.SetStateAction<number>>;
  exportMethod: () => void;
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
  flexDirection: "column",
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
  exportMethod,
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
        <span>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={generateType}
            onChange={handleChange}
          >
            <FormControlLabel
              value={RendererTypes.TYPE_SVG}
              control={<Radio />}
              label="SVG"
            />
            <FormControlLabel
              value={RendererTypes.TYPE_CANVAS}
              control={<Radio />}
              label="PNG"
            />
          </RadioGroup>
        </span>
      </FormControl>
      <FormControl>
        <span>
          <IconButton
            disabled={content.length === 0 || !generateType}
            color="secondary"
            component="span"
            onClick={exportMethod}
          >
            <GetAppIcon></GetAppIcon>
          </IconButton>
        </span>
      </FormControl>
    </Paper>
  );
}
