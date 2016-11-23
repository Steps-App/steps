//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//material-ui
import {TableHeader,TableRowColumn,TableRow,Table, TableBody, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add'
import {StepsTextField} from '../material-style';

export default (props) => {

  const { exercise, treatment, addTreatment, notesOnChange, treatmentHandler } = props

  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>
                <img src={exercise.img_url} className="img-responsive"/>
              </TableRowColumn>
              <TableRowColumn>
                <StepsTextField disabled={true} value={exercise.title} floatingLabelText="Exercise" /><br/>
                <StepsTextField disabled={true} value={exercise.description} floatingLabelText='Description' multiLine={true} rows={2} rowsMax={4}/><br/>
                <StepsTextField floatingLabelText="Notes for Patient" value={treatment.notes} onChange={notesOnChange}/><br/>
              </TableRowColumn>
              <TableRowColumn>
                <StepsTextField floatingLabelText="Sets" type="number" value={treatment.sets} onChange={() => treatmentHandler('sets', treatment.sets)}/><br/>
                <StepsTextField floatingLabelText="Reps" type="number" value={treatment.reps} onChange={() => treatmentHandler('reps', treatment.reps)}/><br/>
                <StepsTextField floatingLabelText="Minutes" type="number" value={treatment.time_per_exercise} onChange={() => treatmentHandler('time_per_exercise', treatment.time_per_exercise)}/><br/>
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
  )
}
