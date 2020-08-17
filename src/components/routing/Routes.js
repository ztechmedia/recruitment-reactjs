import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//layout (hoc)
import Admin from "../../hoc/layouts/Admin";
import Auth from "../../hoc/layouts/Auth";
import Web from "../../hoc/layouts/Web";

//auth containers
import Home from "../../containers/Home";
import Login from "../../containers/auth/Login";
import Register from "../../containers/auth/Register";
import ReqToken from "../../containers/auth/ReqToken";
import ResetPassword from "../../containers/auth/ResetPassword";

//admin containers
import Dashboard from "../../containers/admin/Dashboard";
import UserAdmin from "../../containers/admin/user/Admin/Admin";
import AddUserAdmin from "../../containers/admin/user/Admin/AddForm";
import EditUserAdmin from "../../containers/admin/user/Admin/EditForm";
import UserMember from "../../containers/admin/user/Member/Member";
import AddMember from "../../containers/admin/user/Member/AddForm";
import EditMember from "../../containers/admin/user/Member/EditForm";
import ChangePassword from "../../containers/admin/ChangePassword";
import Categories from "../../containers/admin/categories/Categories";
import AddCategories from "../../containers/admin/categories/AddForm";
import EditCategories from "../../containers/admin/categories/EditForm";
import Jobs from "../../containers/admin/jobs/Jobs";
import AddJobs from "../../containers/admin/jobs/AddForm";
import EditJobs from "../../containers/admin/jobs/EditForm";
import JobApplicants from "../../containers/admin/jobs/JobApplicants";
import Hires from "../../containers/admin/jobs/hires/Hires";
import HireDetail from "../../containers/admin/jobs/hires/HireDetail";

//web containers
import Profile from "../../containers/web/profile/Profile";
import MyJob from "../../containers/web/MyJob";
import SearchJobs from "../../containers/web/SearchJobs";
import DetailJobs from "../../containers/web/DetailJobs";

//routing components
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../../containers/NotFound";

const Routes = (props) => {
  const { user, isAuthenticated } = props;
  let routes;

  if (isAuthenticated) {
    if (user.role === "admin") {
      routes = (
        <Admin>
          <Switch>
            <PrivateRoute
              exact
              path="/dashboard"
              authorize="admin"
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/master/admin"
              authorize="admin"
              component={UserAdmin}
            />
            <PrivateRoute
              exact
              path="/master/admin/create"
              authorize="admin"
              component={AddUserAdmin}
            />
            <PrivateRoute
              exact
              path="/master/admin/:userId/edit"
              authorize="admin"
              component={EditUserAdmin}
            />
            <PrivateRoute
              exact
              path="/master/members"
              authorize="admin"
              component={UserMember}
            />
            <PrivateRoute
              exact
              path="/master/members/create"
              authorize="admin"
              component={AddMember}
            />
            <PrivateRoute
              exact
              path="/master/members/:userId/edit"
              authorize="admin"
              component={EditMember}
            />
            <PrivateRoute
              exact
              path="/master/categories"
              authorize="admin"
              component={Categories}
            />
            <PrivateRoute
              exact
              path="/master/categories/create"
              authorize="admin"
              component={AddCategories}
            />
            <PrivateRoute
              exact
              path="/master/categories/:catId/edit"
              authorize="admin"
              component={EditCategories}
            />
            <PrivateRoute
              exact
              path="/jobs/joblist"
              authorize="admin"
              component={Jobs}
            />
            <PrivateRoute
              exact
              path="/jobs/joblist/create"
              authorize="admin"
              component={AddJobs}
            />
            <PrivateRoute
              exact
              path="/jobs/joblist/:jobId/edit"
              authorize="admin"
              component={EditJobs}
            />
            <PrivateRoute
              exact
              path="/jobs/joblist/:jobId/applicants"
              authorize="admin"
              component={JobApplicants}
            />
            <PrivateRoute
              exact
              path="/jobs/hires"
              authorize="admin"
              component={Hires}
            />
            <PrivateRoute
              exact
              path="/jobs/hires/:hireId/detail"
              authorize="admin"
              component={HireDetail}
            />
            <PrivateRoute
              exact
              path="/change-password"
              authorize="admin"
              component={ChangePassword}
            />
            <PrivateRoute
              exact
              path="/"
              authorize="admin"
              component={Dashboard}
            />
            <Route component={NotFound} />
          </Switch>
        </Admin>
      );
    } else {
      routes = (
        <Web>
          <Switch>
            <PrivateRoute
              exact
              path="/my-job"
              authorize="member"
              component={MyJob}
            />
            <PrivateRoute
              path="/profile"
              authorize="member"
              component={Profile}
            />
            <PrivateRoute
              exact
              path="/search-jobs"
              authorize="member"
              component={SearchJobs}
            />
            <PrivateRoute
              exact
              path="/search-jobs/:jobId"
              authorize="member"
              component={DetailJobs}
            />
            <Route exact path="/">
              <Redirect to="/profile/education/list" />
            </Route>
            <Route exact path="/profile">
              <Redirect to="/profile/education/list" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Web>
      );
    }
  } else {
    routes = (
      <Switch>
        <PublicRoute
          exact
          path="/register"
          layout={Auth}
          component={Register}
        />
        <PublicRoute
          exact
          path="/forgot-password"
          layout={Auth}
          component={ReqToken}
        />
        <PublicRoute
          exact
          path="/reset-password/:resetToken"
          layout={Auth}
          component={ResetPassword}
        />
        <PublicRoute
          exact
          path="/search-jobs"
          layout={Web}
          authorize="member"
          component={SearchJobs}
        />
        <PublicRoute
          exact
          path="/search-jobs/:jobId"
          layout={Web}
          authorize="member"
          component={DetailJobs}
        />
        <PublicRoute exact path="/login" layout={Auth} component={Login} />
        <PublicRoute exact path="/" layout={Web} component={Home} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return routes;
};

export default Routes;
