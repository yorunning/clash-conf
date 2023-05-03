"use client";
import Header from "./components/header";
import Operator from "./components/operator";
import Footer from "./components/footer";
import { Grid } from "@geist-ui/core";

export default function Home() {
  return (
    <div className="homepage">
      <Grid.Container direction="column" wrap="nowrap">
        <Grid sm>
          <Header />
        </Grid>
        <Grid sm>
          <Operator />
        </Grid>
        <Grid sm>
          <Footer />
        </Grid>
      </Grid.Container>
    </div>
  );
}
