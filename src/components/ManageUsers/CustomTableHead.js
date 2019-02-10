import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from "@material-ui/core/";

const styles = theme => ({
  row: {
    backgroundColor: "#fafafa"
  },

  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "80%",
    padding: "4px 10px 4px 10px"
  },
  headFont: {
    fontWeight: 550
  }
});

const rows = [
  {
    id: "action",
    numeric: false,
    label: "ACTION"
  },
  {
    id: "status",
    numeric: false,
    label: "STATUS"
  },
  {
    id: "name",
    numeric: false,
    label: "NAME"
  },
  // {
  //   id: "email",
  //   numeric: false,
  //   label: "EMAIL"
  // },
  // {
  //   id: "phoneNumber",
  //   numeric: false,
  //   label: "PHONE NUMBER"
  // },
  {
    id: "language",
    numeric: false,
    label: "LANGUAGE"
  },
  {
    id: "organization",
    numeric: false,
    label: "ORGANIZATION"
  },
  {
    id: "assignment",
    numeric: false,
    label: "ASSIGNMENT"
  },
  {
    id: "country",
    numeric: false,
    label: "COUNTRY"
  },
  {
    id: "lastLogOn",
    numeric: false,
    label: "LAST LOG ON"
  },
  {
    id: "createdBy",
    numeric: false,
    label: "CREATED BY"
  },
  {
    id: "createdOn",
    numeric: false,
    label: "CREATED ON"
  },
  {
    id: "lastModifiedBy",
    numeric: false,
    label: "LAST MODIFIED BY"
  },
  {
    id: "lastModifiedOn",
    numeric: false,
    label: "LAST MODIFIED ON"
  }
];

class CustomTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.row}>
          {rows.map(
            row => (
              <TableCell
                className={classes.tableCell}
                align="justify"
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={row.id === "name" ? { paddingLeft: 0 } : null}
                      className={classes.headFont}
                    >
                      {row.label}
                    </Typography>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

CustomTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTableHead);
