import Exercise from '../db/models/exercise';
import db from '../db';

//Unit testing libraries
import chai from 'chai';
import {expect} from 'chai';
chai.use(require('chai-as-promised'));
chai.should();


describe('Exercise',()=>{

/* Inputs for testing */
  const good_Entry = {
    title : "Wrist Strength",
    description : "Flex and extend all fingers, while making a complete fist for 30 seconds. Next, open and close your fingers do 2 sets of each for a total of a minute.  Flex your wrist and hold in maximum flex for 30 seconds with the elbow straight but not locked.Extend your wrist with the elbow straight for 30 seconds. Do 2 sets for a total of 2 minutes. These initial three stretching exercises will prepare you for the more complex and more intense weight-bearing exercises to optimize muscular development and the strength of the forearm.",
    img_url :'http://google.com/image.jpg',
    vid_url : 'http://google.com/image.jpg'
  };

  const null_Title = {
    title : '',
    description : 'Some type of description',
    img_url : 'http://google.com/image.jpg',
    vid_url: ''
  };

  const invalid_video = {
    title : 'Wrist Strength',
    description : 'Do this and do that and do this and do that and do this and do that and do this and do that.',
    img_url : 'http://google.com/image.jpg',
    vid_url : 'video/test.jpeg'
  };

  const invalid_photo = {
    title : '',
    description : 'Do this and do that do this and do that do this and do that and dont forget that that that.',
    img_url : 'somephoto.jpeg',
    vid_url : 'http://google.com/image.jpg'
  };


  before('wait for the db', () => db.didSync);
  after('clear db',() => db.didSync);

  describe('Checks validations of the Exercise', () =>{

    it('Successfully creates a user', () => {
      Exercise.create(good_Entry)
    .then(exercise => expect(exercise).to.be.deep.contain({title : "Wrist Strength",
        description : "Flex and extend all fingers, while making a complete fist for 30 seconds. Next, open and close your fingers do 2 sets of each for a total of a minute.  Flex your wrist and hold in maximum flex for 30 seconds with the elbow straight but not locked.Extend your wrist with the elbow straight for 30 seconds. Do 2 sets for a total of 2 minutes. These initial three stretching exercises will prepare you for the more complex and more intense weight-bearing exercises to optimize muscular development and the strength of the forearm.",
        img_url :'http://google.com/image.jpg',
        vid_url : 'http://google.com/image.jpg'}
      ))
      .catch(err => console.log(err));
    });

    it('Fails with invalid title', () => (
       Exercise.create(null_Title).should.be.rejected
    ));

    it('Fails with invalid imgURL', () => (
      Exercise.create(invalid_photo).should.be.rejected
    ));

    it('Fails with invalid videoURL', () => (
      Exercise.create(invalid_video).should.be.rejected
    ));

  });
});
