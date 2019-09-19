// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('Integration | Component | channel/container', function(hooks) {
//   setupRenderingTest(hooks);

//   test('it renders', async function(assert) {
//     this.set('team', {
//       id: 'javascript',
//     });
//     // Template block usage:

//     await render(hbs`
//       <Channel::Container
//         @team={{this.team}}
//         @channelId="funny"
//         as |messages|
//       >
//         <ul>
//           {{#each messages as |m|}}
//             <li>{{m.body}}</li>
//           {{/each}}
//         </ul>
//       </Channel::Container>
//     `);

//     await new Promise(res => setTimeout(res, 1000));
//     assert.equal(this.element.textContent.trim(), 'template block text');
//   });
// });
