// // console.log('something funny');
// const chai = require('chai');
// const expect = chai.expect;
// const spies = require('chai-spies');
// chai.use(spies);
//
// describe('2+2 should be 4', function () {
//
//   beforeEach(function (done) {
//     setTimeout(function(){
//       // console.log('timeout');
//       done();
//     }, 10);
//   });
//
//   it('should be 4', function () {
//     // if(2+2 !== 4){
//     //   throw new Error( '')
//     // }
//     // console.log('first test');
//     expect(2 + 2).to.be.equal(4);
//   });
//
//   it('forEach calls a funtion on each element in an array', function () {
//     let arr = [1,2,3,4,5];
//     function add(x) {
//       return 5 + x;
//     }
//     add = chai.spy(add);
//     arr.forEach(add);
//
//     expect(add).to.have.been.called.exactly(5);
//
//   });
// });
