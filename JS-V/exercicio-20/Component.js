/* Create a new groupo of class in javascript to help in interac with the DOM.

You should create, at least, 4 different classes:
    1. A class for a generic DOM element(hint: use the name "Component"as the name "Element" may conflict with the browser implementation). This class must have a private attribute to store the reference to the DOM element and an anccessor method to read the value of this attribute. It must also have a build method to create the element that must be called onde in the constructor, but it must also have a render method to add the element to the page that can be called by the instance at any time.

    2. This class must have a private attribute to store the reference to the DOM element and anccessor method to read the value of this attribute.

    3. It must also have a build method to creat the element that must be called once on the constructor, but it must also be possible to call it again through the instance.

    4. It must also have a render method to add the element to the page that can be called by the instance at any time.

    5. A specific class for the input elements, with must be a subclass of the Component class.

    6. A specific class fot the label elements, which must be a subclass of the Component class and in its constructor it must be possible to indicate as the first parameter what its text content will be.
*/

export class Component {
  #element = null;

  constructor(tag, parent, options) {
    this.tag = tag;
    this.parent = parent;
    this.options = options;
    this.build();
  }

  getElement() {
    return this.#element;
  }

  build() {
    this.#element = document.createElement(this.tag);
    Object.assign(this.#element, this.options);
    return this;
  }

  render() {
    if (this.parent instanceof Component) {
      this.parent.getElement().append(this.#element);
    } else {
      document.querySelector(this.parent).append(this.#element);
    }
  }
}
