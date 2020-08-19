import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as usersActions from "../../../../store/actions/users";

//material components
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//ui components
import Spinner from "../../../ui/Spinner/Spinner";
import Image from "../../../../assets/images/pdf.png";

export default function EducationList() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const user = useSelector((state) => state.users.user);

  const fetchMe = useCallback(() => {
    dispatch(usersActions.fetchMe());
  }, [dispatch]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  let list = <Spinner />;

  if (!loading && user && user.resume) {
    list = (
      <Grid item md={3} sm={3} xs={12}>
        <Card>
          <CardActionArea>
            <CardContent style={{ textAlign: "center" }}>
              <img
                src={Image}
                alt="Pdf"
                style={{
                  width: "auto",
                  height: 200,
                }}
              />
            </CardContent>
          </CardActionArea>

          <CardActions>
            <Button
              size="small"
              variant="outlined"
              color="default"
              onClick={() => usersActions.downloadResume(user.resume)}
            >
              Download
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  if (!loading && user && !user.resume) {
    list = <Typography>Resume still empty!</Typography>;
  }

  return list;
}
