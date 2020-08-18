import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as modalActions from "../../../store/actions/modal";

//material components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";

//uic components
import Spinner from "../Spinner/Spinner";

//table components
import EnhancedTableHead from "./TableHead";
import EnhancedTableToolbar from "./TableToolbar";
import TableAction from "./TableAction/TableAction";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const light = useSelector((state) => state.layout.light);
  const theme = useTheme();
  const {
    headCells,
    loading,
    rows,
    totalDoc,
    onFetchTable,
    onDeleteTable,
    title,
    defaultFilterKey,
    actions,
    multipleDetele,
  } = props;
  const [filterKey, setFilterKey] = useState(defaultFilterKey);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, multipleDetele) => {
    if (multipleDetele) {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const onFilterKeyChange = (event) => {
    setFilterKey(event.target.value);
  };

  const onFilterChange = (text) => {
    setEnteredFilter(text);
  };

  const onDeleteHandler = useCallback(() => {
    onDeleteTable(selected);
    dispatch(modalActions.setModalContent(null));
    setSelected([]);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteConfirmationHandler = () => {
    let modal = (
      <Fragment>
        <h3>Delete?</h3>
        <p>Are you sure want to delete?</p>
        <div className={classes.btnContainer}>
          <Button
            color="secondary"
            onClick={() => dispatch(modalActions.setModalContent(null))}
          >
            No
          </Button>
          <Button color="primary" onClick={onDeleteHandler}>
            Yes
          </Button>
        </div>
      </Fragment>
    );
    dispatch(modalActions.setModalContent(modal));
  };

  const onFetchSearch = useCallback(() => {
    const qPage = page + 1;

    const query =
      enteredFilter.length > 0
        ? `limit=${rowsPerPage}&page=${qPage}&${filterKey}[regex]=${enteredFilter}`
        : `limit=${rowsPerPage}&page=${qPage}`;

    onFetchTable(query);
  }, [rowsPerPage, page, enteredFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFetchSearch();
  }, [onFetchSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  let tableBody;

  if (rows && rows.length > 0) {
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, totalDoc - page * rowsPerPage);

    tableBody = (
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              key={row._id}
              style={
                isItemSelected
                  ? {
                      backgroundColor: light
                        ? lighten(theme.palette.primary.light, 0.85)
                        : theme.palette.primary.dark,
                    }
                  : null
              }
            >
              {multipleDetele ? (
                <TableCell
                  padding="checkbox"
                  role="checkbox"
                  onClick={(event) =>
                    handleClick(event, row._id, multipleDetele)
                  }
                >
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>
              ) : null}

              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                onClick={(event) => handleClick(event, row._id, multipleDetele)}
              >
                {row[headCells[0].id]}
              </TableCell>

              {headCells
                .filter((cell, i) => i > 0)
                .map((cell) => {
                  let data = row[cell.id];
                  if (cell.middleware) {
                    data = cell.middleware(data);
                  }

                  return (
                    <TableCell
                      key={cell.id}
                      align="left"
                      onClick={(event) =>
                        handleClick(event, row._id, multipleDetele)
                      }
                    >
                      {data}
                    </TableCell>
                  );
                })}

              {actions ? (
                <TableCell align="left">
                  {actions.map((action, i) => (
                    <TableAction key={i} _id={row._id} {...action} />
                  ))}
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 33 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        title={title}
        filterKey={filterKey}
        headCells={headCells}
        enteredFilter={enteredFilter}
        onFilterKeyChange={onFilterKeyChange}
        onFilterChange={onFilterChange}
        onDeleteConfirm={deleteConfirmationHandler}
      />

      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows ? rows.length : 0}
            multipleDetele={multipleDetele}
          />
          {tableBody}
        </Table>
      </TableContainer>

      {loading && !rows ? <Spinner /> : null}
      {rows && rows.length === 0 ? (
        <div className={classes.empty}>Data is empty!</div>
      ) : null}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalDoc}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  empty: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
}));

export default EnhancedTable;
