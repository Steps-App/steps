//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//material-ui
import {TableHeader,TableRowColumn,TableRow,Table, TableBody, FloatingActionButton, SelectField, MenuItem} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {StepsTextField} from '../material-style';

export default (props) => {

  const { exercise, treatment, addTreatment, resistanceOnChange, treatmentHandler } = props;

  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableBody selectable={false} displayRowCheckbox={false}>
            <TableRow selectable={false}>
              <TableRowColumn>
                <img src={exercise.img_url} className="img-responsive"/>
              </TableRowColumn>
              <TableRowColumn>
                <StepsTextField
                  disabled={true}
                  value={exercise.title}
                  floatingLabelText="Exercise" /><br/>
                <StepsTextField disabled={true}
                  value={exercise.description}
                  floatingLabelText='Description'
                  multiLine={true}
                  rows={2}
                  rowsMax={4}/><br/>
                <StepsTextField
                  floatingLabelFixed={true}
                  floatingLabelText="Notes for Patient"
                  value={treatment.notes}
                  onChange={(env) => treatmentHandler('notes', env.target.value)}/>
                 <br/>
              </TableRowColumn>
              <TableRowColumn>
                <StepsTextField
                  floatingLabelFixed={true}
                  floatingLabelText="Sets"
                  type="number"
                  value={treatment.sets}
                  onChange={(env) => treatmentHandler('sets', env.target.value)}/>
                <br/>
                <StepsTextField
                  floatingLabelFixed={true}
                  floatingLabelText="Reps" type="number"
                  value={treatment.reps}
                  onChange={(env) => treatmentHandler('reps', env.target.value)}/><br/>
                <SelectField
                  floatingLabelFixed={true}
                  floatingLabelText="Resistance"
                  value={treatment.resistance}
                  onChange={resistanceOnChange}
                >
                  <MenuItem value='weighted' primaryText='weighted'/>
                  <MenuItem value='none' primaryText='none' />
                </SelectField><br/>
                <StepsTextField
                  floatingLabelFixed={true}
                  floatingLabelText="Minutes"
                  type="number"
                  value={treatment.time_per_exercise}
                  onChange={(env) => treatmentHandler('time_per_exercise', env.target.value)}/>
                <br/>
              </TableRowColumn>
              <TableRowColumn>
                <FloatingActionButton onClick={() => addTreatment()}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
