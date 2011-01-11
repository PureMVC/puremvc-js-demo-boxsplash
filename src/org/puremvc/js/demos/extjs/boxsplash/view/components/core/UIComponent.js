/**
 * @lends Boxsplash.view.components.core.UIComponent.prototype
 */
Ext.namespace('Boxsplash.view.components.core');
Boxsplash.view.components.core.UIComponent = Ext.extend(Ext.util.Observable, {
  /**
   * <code>true</code> if the component has
   * been initialized, <code>false</code> otherwise.
   * @type Boolean
   */
  initialized: false,

  /**
   * The <code>Ext.Element</code> used as
   * the subject of this UIComponent instance.
   * @type Ext.Element
   */
  element: null,

  /**
   * @class A wrapper class whose primary goal is to encourage the addition
   * of elements to the DOM in a top-down fashion.
   *
   * @extends Ext.util.Observable
   *
   * @param {String|Ext.Element} element String or Ext.Element to become the subject
   * of the instance.<p>If a string is passed, an element ID is assumed first.
   * If the element ID is not found in the DOM, a tag name is assumed and
   * Ext core will attempt to create that Ext.Element.</p><p>If an Ext.Element is
   * passed in, it is left as-is.</p>
   * @param {Object} config The Object containing the default configuration properties
   * to use to pre-configure the event handling mechanism of Ext.util.Observable.
   * @param {Object} styles The Object containing CSS stylesheet properties to use to
   * style the underlying Ext.Element.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @see Boxsplash.view.components.Box
   * @see Boxsplash.view.components.ControlPanel
   * @see Boxsplash.view.components.Shell
   * @see Boxsplash.view.components.WorldSpace
   *
   * @constructs
   */
  constructor: function(element /* String/Ext.Element */, config /* Object */, styles /* Object */) {
    if (element) {
      this.element = Boxsplash.view.components.core.UIComponent.buildElement(element, styles);
    }
    if (config) {
      if (config.events) {
        this.addEvents(config.events);
      }
      if (config.listeners) {
        this.listeners = config.listeners;
      }
      Boxsplash.view.components.core.UIComponent.superclass.constructor.call(this, config);
    }
    else {
      Boxsplash.view.components.core.UIComponent.superclass.constructor.call(this);
    }
  },

  /**
   * Used in the creation of children used in this component.
   * Override this method to create new <code>UIComponent</code>s or 'grab'
   * existing DOM nodes.
   */
  initializeChildren: function(){},

  /**
   * Called after <code>initializeChildren()</code>.
   * Override this method for additional processing
   * or adding event listeners to children.
   */
  childrenInitialized: function(){},

  /**
   * Called after <code>childrenInitialized()</code>.
   * Override this method to perform any final processing
   * before the child is considered initialized.
   */
  initializationComplete: function(){
    this.initialized = true;
  },

  /**
   * Adds the given component as an immediate child to this <code>UIComponent</code> instance
   * and invokes the three entry point methods to manage the children of the given component.
   * @param {Boxsplash.view.components.core.UIComponent} child The child component to append.
   *
   * @return this object - can be used for method/property chaining.
   * @type Boxsplash.view.components.core.UIComponent
   */
  addChild: function(child /* UIComponent */) {
    this.element.appendChild(child.element);

    // Initialize children
    child.initializeChildren();
    child.childrenInitialized();
    child.initializationComplete();

    return this;
  }
});

Ext.apply(Boxsplash.view.components.core.UIComponent, {
  /**
   * Convenience method for creating and configuring an Ext.Element instance.
   *
   * @param element {String|Ext.Element|Object} The String id of an element in the DOM,
   * an instance of Ext.Element, or the Object containing the default configuration properties
   * that describe a DOM element to use to set up the underlying Ext.Element.
   * @param {Object} styles The Object containing CSS stylesheet properties to use to
   * style the underlying Ext.Element.
   *
   * @memberof Boxsplash.view.components.core.UIComponent
   */
  buildElement: function(element /* String|Ext.Element|Object */, styles /* Object */) {
    var el = null;
    if (element) {
      if (Ext.isString(element) || Ext.isElement(element)){
        el = Ext.get(element);
        if (el) {
          el = new Ext.Element(el, true);
        }
      }
      else if (Ext.isObject(element)) {
        el = new Ext.Element(Ext.DomHelper.createDom(element));
      }
      if (styles) {
        if (Ext.isObject(styles)) {
          Ext.DomHelper.applyStyles(el.dom, styles);
        }
      }
    }
    return el;
  },

  /**
   * Convenience method for creating a simple instance of UIComponent without the details
   * of preconfiguring the event handling mechanism of Ext.util.Observable.
   *
   * @param element {String|Ext.Element|Object} The String id of an element in the DOM,
   * an instance of Ext.Element, or the Object containing the default configuration properties
   * that describe a DOM element to use to set up the underlying Ext.Element.
   * @param {Object} styles The Object containing CSS stylesheet properties to use to
   * style the underlying Ext.Element.
   *
   * @memberof Boxsplash.view.components.core.UIComponent
   */
  buildComponent: function(element, styles) {
    var el = Boxsplash.view.components.core.UIComponent.buildElement(element, styles);
    var component = new Boxsplash.view.components.core.UIComponent(el);
    return component;
  }
});