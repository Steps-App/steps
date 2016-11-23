//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//material-ui
import {TableHeader,TableRowColumn,TableRow,Table, TableBody, FloatingActionButton} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove'
import {StepsTextField} from '../material-style';

export default (props) => {

  const { exercises, treatments, removeTreatment } = props

  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableBody displayRowCheckbox={false}>

            {treatments.map((treatment, idx) => {
              let exercise = exercises.filter(exercise => exercise.id === treatment.exercise_id)[0]
              return (
                <TableRow>
                  <TableRowColumn>
                    <img src={exercise.img_url} className="img-responsive"/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <p>{exercise.title} </p><br/>
                    <p>{exercise.description} </p><br/>
                    <p>{treatment.notes} </p><br/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <p>{treatment.sets} </p><br/>
                    <p>{treatment.reps} </p><br/>
                    <p>{treatment.time_per_exercise} </p><br/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton onClick={() => removeTreatment({idx})}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </div>
    </div>
  )
}
