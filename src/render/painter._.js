// // canvasWrapper.spec.js


// const {assert, expect} = require('chai');
// const CanvasWrapper = require('./canvasWrapper.js');

// describe(`CanvasWrapper test suite`, () => {
//   it(`testIntantiate_CanvasElement를인자로_초기화하면_객체가생성된다.`, () => {
//     // assert.throws(() => {
//       const canvas = document.createElement('canvas');
//       const wrapper = new CanvasWrapper(canvas);
//       assert.ok(wrapper);
//     // });
//   });
//   it(`testIntantiate_Canvas가아닌인자로_초기화하면_에러가발생한다.`, () => {
//     assert.throws(() => {
//       const div = document.createElement('div');
//       const wrapper = new CanvasWrapper(div);
//     });
//   });
//   it(`testIntantiate_인자없이_초기화하면_에러가발생한다`, () => {
//     assert.throws(() => {
//       const wrapper = new CanvasWrapper();
//     });
//   });
// });