import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SimpleTable extends Component {
  render() {
  console.log(this.props, "and here")

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Entries</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  );
}
}

export default (SimpleTable);
