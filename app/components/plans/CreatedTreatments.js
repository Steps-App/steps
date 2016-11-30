//React/Redux
import React from 'react';
import {connect} from 'react-redux';
//material-ui
import {TableHeader,TableRowColumn,TableRow,Table, TableBody, FloatingActionButton} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {StepsTextField} from '../material-style';

export default (props) => {

  const { exercises, treatments, removeTreatment } = props;
  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableBody displayRowCheckbox={false}>

            {treatments.map((treatment, idx) => {
              let exercise = exercises.filter(exercise => exercise.id === treatment.exercise_id)[0];
              return (
                <TableRow key={idx}>
                  <TableRowColumn>
                    <img src={exercise.img_url} className="img-responsive"/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <h4>Title</h4>
                      <p>{exercise.title} </p><br/>
                    <h>Description</h>
                      <p>{exercise.description} </p><br/>
                    <h>Additional Notes</h>
                      <p>{treatment.notes} </p><br/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <h4>Sets</h4>
                      <p>{treatment.sets} </p><br/>
                    <h4>Reps</h4>
                      <p>{treatment.reps} </p><br/>
                    <h4>Resistance</h4>
                      <p>{`${treatment.resistance}`} </p><br/>
                    <h4>Time</h4>
                      <p>{`${treatment.time_per_exercise} min per exercise`} </p><br/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton onClick={()=>{removeTreatment(idx);}} >
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
