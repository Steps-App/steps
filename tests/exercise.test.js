import Exercise from '../db/models/exercise';
import db from '../db';

//Unit testing libraries
import chai from 'chai';
chai.use(require('chai-as-promised'));
chai.should();

describe('Exercise',()=>{

/* Inputs for testing */
  const goodEntry = {
    title : "Wrist Strength",
    description : "Flex and extend all fingers, while making a complete fist for 30 seconds. Next, open and close your fingers do 2 sets of each for a total of a minute.  Flex your wrist and hold in maximum flex for 30 seconds with the elbow straight but not locked.Extend your wrist with the elbow straight for 30 seconds. Do 2 sets for a total of 2 minutes. These initial three stretching exercises will prepare you for the more complex and more intense weight-bearing exercises to optimize muscular development and the strength of the forearm.",
    imgURL :'http://google.com/image.jpg',
    vidURL : 'http://google.com/image.jpg'
  };

  const nullTitle = {
    title : '',
    description : 'Some type of description',
    imgURL : 'http://google.com/image.jpg',
    vidURL : ''
  };

  const invalidVideo = {
    title : 'Wrist Strength',
    description : 'Do this and do that and do this and do that and do this and do that and do this and do that.',
    imgURL : 'http://google.com/image.jpg',
    vidURL : 'video/test.jpeg'
  };

  const invalidPhoto = {
    title : '',
    description : 'Do this and do that do this and do that do this and do that and dont forget that that that.',
    imgURL : 'somephoto.jpeg',
    vidURL : 'http://google.com/image.jpg'
  };


  before('wait for the db', () => db.didSync);

  describe('Checks validations of the Exercise', () =>{
    it('Successfully creates a user', () => {
      return Exercise.create(goodEntry).should.be.fulfilled;
    });

    it('Fails with invalid title', () => (
      Exercise.create(nullTitle).should.be.rejected)
    );

    it('Fails with invalid imgURL', () => (
      Exercise.create(invalidPhoto).should.be.rejected)
    );

    it('Fails with invalid videoURL', () => (
      Exercise.create(invalidVideo).should.be.rejected)
    );

  });
});
