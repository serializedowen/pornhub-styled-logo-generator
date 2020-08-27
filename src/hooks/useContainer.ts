import { styled } from "@material-ui/core";

const Container = styled("div")({
  position: "relative",
});

const Renderer = styled("div")({
  position: "absolute",
});

export default function useContainer() {
  return { Container, Renderer };
}
