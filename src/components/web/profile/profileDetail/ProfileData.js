import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

//material components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const ProfileData = (props) => {
  const { user } = props;
  return (
    <Grid item md={12} sm={12} xs={12}>
      <table style={{ textAlign: "left" }}>
        <tbody>
          <tr>
            <td>
              <Typography>Name</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>{user ? <Typography>{user.name}</Typography> : null}</td>
          </tr>
          <tr>
            <td>
              <Typography>Email</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>{user ? <Typography>{user.email}</Typography> : null}</td>
          </tr>
          <tr>
            <td>
              <Typography>Religion</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>{user ? <Typography>{user.religion}</Typography> : null}</td>
          </tr>
          <tr>
            <td>
              <Typography>Birth</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>
              {user ? (
                <Typography>
                  {user.birthPlace && user.birthDate
                    ? `${user.birthPlace}, ${moment(user.birthDate).format(
                        "DD MMMM YYYY"
                      )}`
                    : null}
                </Typography>
              ) : null}
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Marital Status</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>{user ? <Typography>{user.status}</Typography> : null}</td>
          </tr>
          <tr>
            <td>
              <Typography>Address</Typography>
            </td>
            <td>
              <Typography>:</Typography>
            </td>
            <td>
              {user ? (
                <Typography>
                  {user.address
                    ? `${user.address.street} Kel. ${user.address.village} Kec. ${user.address.district}
                ${user.address.city} ${user.address.zipcode}, ${user.address.province}`
                    : null}
                </Typography>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      {user && user.social ? (
        <Fragment>
          <Typography>Social Media:</Typography>
          <table>
            <tbody>
              <tr>
                <td>Facebook</td>
                <td>:</td>
                <td>
                  <Link
                    component={RouterLink}
                    to={user ? user.social.facebook : "http://facebook.com"}
                  >
                    {user ? user.social.facebook : "http://facebook.com"}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Instagram</td>
                <td>:</td>
                <td>
                  <Link
                    component={RouterLink}
                    to={user ? user.social.instagram : "http://instagram.com"}
                  >
                    {user ? user.social.instagram : "http://instagram.com"}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Twitter</td>
                <td>:</td>
                <td>
                  <Link
                    component={RouterLink}
                    to={user ? user.social.twitter : "http://twitter.com"}
                  >
                    {user ? user.social.twitter : "http://twitter.com"}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Youtube</td>
                <td>:</td>
                <td>
                  <Link
                    component={RouterLink}
                    to={user ? user.social.youtube : "http://youtube.com"}
                  >
                    {user ? user.social.youtube : "http://youtube.com"}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Linkedin</td>
                <td>:</td>
                <td>
                  <Link
                    component={RouterLink}
                    to={user ? user.social.linkedin : "http://linkedin.com"}
                  >
                    {user ? user.social.linkedin : "http://linkedin.com"}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ) : null}
    </Grid>
  );
};

export default ProfileData;
