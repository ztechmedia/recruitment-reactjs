import React from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const CustomAlert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert
      style={{ marginBottom: "5px" }}
      key={alert.id}
      severity={alert.alertType}
    >
      {alert.msg}
    </Alert>
  ));

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(CustomAlert);
