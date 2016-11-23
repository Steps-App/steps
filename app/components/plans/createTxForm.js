import React from 'react';

//material-ui
import {TableHeader,TableRowColumn,TableRow,Table, TableBody} from 'material-ui';
import {StepsTextField} from '../material-style';


export default function(){
  let props ={id :1 };

  return(
    <div className="row">
      <div className="col-md-12">
        <form>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>IMG</TableRowColumn>
                <TableRowColumn>
                  <StepsTextField type='text' floatingLabelText="Title"/><br/>
                  <StepsTextField floatingLabelText='Description'/><br/>
                  <StepsTextField floatingLabelText="Additional Notes"/><br/>
                </TableRowColumn>
                <TableRowColumn>
                  <StepsTextField floatingLabelText="Sets" type="number"/>
                  <StepsTextField floatingLabelText="Reps" type="number"/>
                  <StepsTextField floatingLabelText="Time" type="number"/>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </div>
    </div>


  );



}
