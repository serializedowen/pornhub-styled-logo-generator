import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NativeFormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
  TextField,
  Paper,
  makeStyles,
  IconButton,
  Input,
  Button,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import RendererTypes from "src/renderers/rendererTypes";
import GetAppIcon from "@material-ui/icons/GetApp";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
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
  numberInput: {
    maxWidth: "150px",
    "& .MuiInput-input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& .MuiInput-input[type=number]": {
      MozAppearance: "textfield",
    },
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
        <FormLabel component="legend">分隔</FormLabel>
        <Tooltip title="文字分隔点" TransitionComponent={Zoom}>
          <Input
            className={classes.numberInput}
            value={splitIndex}
            type="number"
            inputMode="numeric"
            inputProps={{
              style: {},
              min: 0,
              max: content.length,
            }}
            onInput={(event) =>
              setsplitIndex(Number((event.target as HTMLInputElement).value))
            }
            startAdornment={
              <IconButton
                disabled={splitIndex <= 0}
                onClick={() => {
                  if (splitIndex - 1 >= 0) setsplitIndex((ind) => ind - 1);
                }}
              >
                <ArrowBackIos></ArrowBackIos>
              </IconButton>
            }
            endAdornment={
              <IconButton
                disabled={splitIndex >= content.length}
                onClick={() => {
                  if (splitIndex + 1 <= content.length)
                    setsplitIndex((ind) => ind + 1);
                }}
              >
                <ArrowForwardIos></ArrowForwardIos>
              </IconButton>
            }
          />
        </Tooltip>
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
        <Tooltip title="下载" TransitionComponent={Fade} placement="top">
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
        </Tooltip>
      </FormControl>
    </Paper>
  );
}
