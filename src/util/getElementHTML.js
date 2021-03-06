import invariant from 'invariant';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import splitReactElement from './splitReactElement';

function hasChildren(element) {
  return React.isValidElement(element) && React.Children.count(element.props.children) > 0;
}

export default function getElementHTML(element, text = null) {
  if (element === undefined || element === null) {
    return element;
  }

  if (typeof element === 'string') {
    return element;
  }

  if (React.isValidElement(element)) {
    if (hasChildren(element)) {
      return ReactDOMServer.renderToStaticMarkup(element);
    }

    const tags = splitReactElement(element);

    if (text !== null) {
      const {start, end} = tags;
      return start + text + end;
    }

    return tags;
  }

  invariant(
    element.hasOwnProperty('start') && element.hasOwnProperty('end'),
    'convertToHTML: received conversion data without either an HTML string, ReactElement or an object with start/end tags'
  );

  if (text !== null) {
    const {start, end} = element;
    return start + text + end;
  }

  return element;
}
