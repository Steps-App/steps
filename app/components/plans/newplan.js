import React from 'react';
import {DropDownMenu, MenuItem} from 'material-ui';
import {connect} from 'react-redux';


const initialState =

class newPlan extends React.Component{
  constructor(props){
    console.log(props);
    super(props);

    this.state={
      patient : {},
      duration : null,
      injury : null,
      notes : null,
      exercises : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.sumbitHandler = this.submitHandler.bind(this);
  }



  handleChange(field, value){


  }

  sumbitHandler(evt)

  render(){
      let treatments = <MenuItem value={this.props.exercise.id} />;


    return(
      <div className='Row' id='container'>

        <section className='col-md-8'>
          <div className='row'>
            <span className='col-xs-12 col-md-8'>
              <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              >
                <MenuItem value={1} primaryText=" 1 Week"/>
                <MenuItem value={2} primaryText=" 2 Week"/>
                <MenuItem value={3} primaryText=" 3 Week"/>
                <MenuItem value={4} primaryText=" 4 Week"/>
                <MenuItem value={5} primaryText=" 5 Week"/>
                <MenuItem value={6} primaryText=" 6 Week"/>
              </DropDownMenu>

            </span>


          </div>
          {treatments}
        </section>

        <section className='col-md-4'>


        </section>
      </div>
    );
  }




}


//========Container =============== Temporary

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(newPlan);
