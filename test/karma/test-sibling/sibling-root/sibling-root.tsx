import { Component } from '../../../../dist';

@Component({
  tag: 'sibling-root',
  styles: `
    :host {
      display: block;
      background: yellow;
      color: maroon;
      margin: 20px;
      padding: 20px;
    }
    section {
      background: blue;
      color: white;
    }
    article {
      background: maroon;
      color: white;
    }
  `,
  scoped: true
})
export class SiblingRoot {

  componentWillLoad() {
    return new Promise(resolve => {
      setTimeout(resolve, 50);
    });
  }

  render() {
    return (
      <div>
        <section>
          sibling inner dom
        </section>
        <article>
          <slot/>
        </article>
      </div>
    );
  }
}
