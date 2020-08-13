import React, { useState, useEffect } from "react";

//material components
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { lighten, makeStyles } from "@material-ui/core/styles";

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const {
    numSelected,
    title,
    onFilterChange,
    onFilterKeyChange,
    onDeleteConfirm,
    enteredFilter,
    headCells,
    filterKey,
  } = props;

  const [search, setSearch] = useState(enteredFilter);

  const searchChangeHandler = (e) => {
    e.preventDefault();
    onFilterChange(search);
  };

  useEffect(() => {
    if (search.length === 0) {
      onFilterChange("");
    }
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onDeleteConfirm}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div className={classes.search}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterKey}
              onChange={onFilterKeyChange}
            >
              {headCells
                .filter((cell) => cell.id !== "createdAt")
                .map((cell) => (
                  <MenuItem key={cell.id} value={cell.id}>
                    {cell.id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div className={classes.divider}></div>
          <form>
            <InputBase
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${title}`}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={(e) => searchChangeHandler(e)}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </div>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    width: "100%",
  },
  search: {
    display: "flex",
    width: "75%",
    justifyContent: "space-around",
    border: "1px solid #ccc",
    alignItems: "center",
    borderRadius: 10,
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  divider: {
    border: "1px solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
    height: "5vh",
  },
}));

export default EnhancedTableToolbar;
