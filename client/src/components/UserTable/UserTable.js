import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionButtons from "../ActionButtons/ActionButtons";
import {ActionButtonsStyle} from "./UserTable.style";
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';


class UserTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
            selectedRows: 'none',
            selectedRowsDict: {},

            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: true,

            disableDelete: true,
      };
  }
  // as of material-ui issue https://github.com/mui-org/material-ui/issues/3734
  // onRowSelection has problems with rerendering and keeping state of selections
  // in table, thus Implementing it here.

  componentDidUpdate(prevProps, prevState){
      if(prevProps.tableData.length != this.props.tableData.length){
        let result = {};
        let arrSize = this.props.tableData.length;
          for(var i = 0; i < arrSize;i++){
            result[i] = false;
          }
        this.setState({
          selectedRows: "none",
          selectedRowsDict: result,
          disableDelete: true,
        });
      }
  }

  onRowSelection(val){
    let selectedRowsDict = this.mapSelectedRows(val);
    let disableDelete = (val === "none") ? true : (typeof(val) === "object" && val.length === 0 ? true : false)
    this.setState({
        selectedRows: val,
        selectedRowsDict: selectedRowsDict,
        disableDelete: disableDelete,
    });
  }

  mapSelectedRows(val){
    let result = {};
    if( typeof val === "string"){
      let arrSize = this.props.tableData.length;
      if( val === "none") {
        for(var i = 0; i < arrSize;i++){
          result[i] = false;
        }
        return result;
      }
      else if( val === "all") {
        for(var i = 0; i < arrSize;i++){
          result[i] = true;
        }
        return result;
      }
    }
    val.forEach((a) => {
      result[a] = true;
    });
  return result;
  }

  modifyActions(actions, val){
    return actions.map((a) => {
        return Object.assign({}, a, {onClick: a.onClick.bind(this, val)})
    })
  }

    render() {
      let theme = this.props.muiTheme;
      theme.tableHeaderColumn.textColor = theme.palette.textColor;
      let actions = this.props.rowButtons;
        return (
                <Table
                  height={this.props.height}
                  fixedHeader={this.state.fixedHeader}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                  className="UserTable"
                  onRowSelection={this.onRowSelection.bind(this)}
                >
                  <TableHeader
                     displaySelectAll={this.state.enableSelectAll}
                     adjustForCheckbox={this.state.showCheckboxes}
                     enableSelectAll={this.state.enableSelectAll}
                   >
                     <TableRow
                     style={{backgroundColor: theme.palette.primary1Color,}}
                     >
                       <TableHeaderColumn className="headerID" tooltip="The ID">#</TableHeaderColumn>
                       <TableHeaderColumn className="headerName" tooltip="Users first name">Name</TableHeaderColumn>
                       <TableHeaderColumn className="headerSurname" tooltip="Users last name">Surname</TableHeaderColumn>
                       <TableHeaderColumn className="headerEmail" tooltip="Users e-mail address">E-mail address</TableHeaderColumn>
                       <TableHeaderColumn className="headerMore" tooltip="more..."> </TableHeaderColumn>
                     </TableRow>
                   </TableHeader>
                   <TableBody
                     displayRowCheckbox={this.state.showCheckboxes}
                     deselectOnClickaway={this.state.deselectOnClickaway}
                     showRowHover={this.state.showRowHover}
                     stripedRows={this.state.stripedRows}
                   >
                     {this.props.tableData.map( (row, index) => {
                       let sRD = this.state.selectedRowsDict;
                       let selected = index in sRD ? sRD[index] : false
                       return (
                         <TableRow key={index} selected={selected} >
                           <TableRowColumn className={"index_"+String(index)}>{index}</TableRowColumn>
                           <TableRowColumn className={"name_"+String(index)}>{row.name}</TableRowColumn>
                           <TableRowColumn className={"surname_"+String(index)}>{row.surname}</TableRowColumn>
                           <TableRowColumn className={"email_"+String(index)}>{row.email}</TableRowColumn>
                           <TableRowColumn className={"moreButton_"+String(index)}>
                            <ActionButtonsStyle>
                              <ActionButtons actions={this.modifyActions(actions, row)}/>
                            </ActionButtonsStyle>
                           </TableRowColumn>
                         </TableRow>
                       )}
                     )}
                   </TableBody>
                   <TableFooter
                     adjustForCheckbox={this.state.showCheckboxes}
                   >
                     <TableRow>
                       <TableRowColumn colSpan="5" style={{textAlign: 'right'}}>
                      <RaisedButton
                        primary={true}
                        label="DELETE"
                        labelPosition="after"
                        icon={<ActionDelete/>}
                        onClick={()=>this.props.onDelete(this.state.selectedRows)}
                        disabled={this.state.disableDelete}
                      />
                       </TableRowColumn>
                     </TableRow>
                   </TableFooter>
                   </Table>
        );
    }
}


UserTable.propTypes = {
  title: PropTypes.string,
};
UserTable.defaultProps = {};

export default muiThemeable()(UserTable);
