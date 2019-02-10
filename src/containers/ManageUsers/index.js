import React from "react";
import PropTypes from "prop-types";
import faker from "faker";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  TableFooter
} from "@material-ui/core/";
import { Create } from "@material-ui/icons/";

import CustomTableHead from "../../components/ManageUsers/CustomTableHead";
import CustomPagination from "../../components/ManageUsers/CustomPagination";
import CustomToolBar from "../../components/ManageUsers/CustomToolBar";
import history from "../../utils/history";
import RanchAdmin from "../../data/RanchAdmin";

const styles = theme => ({
  root: {
    width: "100%",
    paddingTop: theme.spacing.unit * 4
  },

  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "4px 10px 4px 10px",
    maxWidth: "70%"
  },
  rowFount: {
    fontWeight: 500
  }
});

let id = 0;
function createData(
  actions,
  status,
  name,
  // email,
  // phoneNumber,
  language,
  organization,
  assignment,
  country,
  lastLogOn,
  createdBy,
  createdOn,
  lastModifiedBy,
  lastModifiedOn
) {
  id += 1;
  return {
    id,
    actions,
    status,
    name,
    // email,
    // phoneNumber,
    language,
    organization,
    assignment,
    country,
    lastLogOn,
    createdBy,
    createdOn,
    lastModifiedBy,
    lastModifiedOn
  };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function getList() {
  let n = 0;
  const list = [];
  while (n < 50) {
    list.push(
      createData(
        <div>
          <Create
            color="disabled"
            onClick={() =>
              history.push({
                pathname: "/register",
                state: {
                  mode: "update",
                  personalInformation:
                    RanchAdmin.personaData.personalInformation
                }
              })
            }
          />
        </div>,
        1,
        faker.name.findName(),
        // faker.internet.email(),
        // faker.phone.phoneNumber(),
        "English",
        faker.company.companyName(),
        faker.address.county(),
        "United States",
        "21DEC '18",
        faker.name.findName(),
        "21DEC '18",
        faker.name.findName(),
        "21DEC '18"
      )
    );
    n++;
  }
  return list;
}

class ManageUsers extends React.Component {
  state = {
    order: "asc",
    orderBy: "calories",
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: Number(event.target.value) });
  };

  render() {
    const list = getList();
    const { classes, accessibleFeatures, persona } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <CustomToolBar
          filterTypes={accessibleFeatures.filterTypes}
          persona={persona}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={list.length}
            />
            <TableBody>
              {stableSort(list, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover key={row.id}>
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        align="inherit"
                        style={{ marginLeft: "40rem" }}
                      >
                        <Typography className={classes.rowFont}>
                          {row.actions}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        {row.status ? (
                          <Typography
                            className={classes.rowFont}
                            gutterBottom
                            color="secondary"
                          >
                            Active
                          </Typography>
                        ) : (
                          <Typography
                            className={classes.rowFont}
                            gutterBottom
                            color="primary"
                          >
                            Inactive
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="justify" className={classes.tableCell}>
                        <Typography className={classes.rowFont}>
                          {row.name}
                        </Typography>
                      </TableCell>
                      {/*<TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.email}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.phoneNumber}
                        </Typography>
                      </TableCell>*/}
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.language}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.organization}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.assignment}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.country}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.lastLogOn}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.createdBy}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.createdOn}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.lastModifiedBy}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="justify">
                        <Typography className={classes.rowFont}>
                          {row.lastModifiedOn}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={list.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={CustomPagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManageUsers);
