//React/Redux
import React from 'react';
import {connect} from 'react-redux';

//material-ui
import { FontIcon } from 'material-ui';
import { StepsActionButton } from '../material-style';
import InfoItem from '../widgets/InfoItem';
import { textDark, errorText } from '../colors';
import { formatTime } from '../../utils';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const TreatmentsList =  ({ treatments, removeTreatment }) => {
  console.log(treatments)
  return (
    <div id="treatments-list">
    {
      !treatments.length ?
      <p>There are currently no treatments in your plan</p> :
      treatments.map((treatment, idx) => (
        <div className="treatment" key={idx}>
          <div className="treatment-number">#{idx + 1}</div>
          <img src={treatment.exercise.img_url} className="img-responsive"/>
          <div className="treatment-info">
            <div className="treatment-header">
              <h3>{treatment.exercise.title}</h3>
              {
                // Only show remove button if passed down
                removeTreatment ?
                  <StepsActionButton mini={true}
                    backgroundColor={ errorText }
                    onTouchTap={ () => removeTreatment(idx) } >
                    <FontIcon className={'material-icons'}>clear</FontIcon>
                  </StepsActionButton> : null
              }
            </div>
            <div className="treatment-fields">
              <InfoItem icon="all_inclusive" label="Sets" iconColor={ textDark }
                content={ treatment.sets } />
              <InfoItem icon="layers" label="Reps" iconColor={ textDark }
                content={ treatment.reps } />
            </div>
            <div className="treatment-fields">
              <InfoItem icon="alarm" label="Time" iconColor={ textDark }
                content={ formatTime(treatment.time_per_exercise) } />
              <InfoItem icon="fitness_center" label="Resistance" iconColor={ textDark }
                content={ treatment.resistance } />
            </div>
            <InfoItem icon="description" label="Description" iconColor={ textDark }
              content={ treatment.exercise.description } />
            <InfoItem icon="speaker_notes" label="Notes" iconColor={ textDark }
              content={ treatment.notes ? treatment.notes : 'No notes specified' } />
          </div>
        </div>
      ))
    }
    </div>
  );
}

// Map exercises onto treatments if needed
const mapStateToProps = ({ exercises }, { treatments }) => ({
  treatments: treatments.map(treatment => {
    if (!treatment.exercise && treatment.exercise_id)
      treatment.exercise = exercises.find(exercise => exercise.id === treatment.exercise_id);
    return treatment;
  })
});

export default connect(mapStateToProps)(TreatmentsList);
