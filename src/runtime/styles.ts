import * as d from '@declarations';
import { BUILD } from '@build-conditionals';
import { doc, rootAppliedStyles, styles } from '@platform';


export const attachStyles = (elm: d.HostElement, hostRef: d.HostRef, styleId?: string, styleElm?: HTMLStyleElement, styleContainerNode?: HTMLElement, appliedStyles?: d.AppliedStyleMap, dataStyles?: NodeListOf<Element>) => {

  if (BUILD.mode) {
    if (!styles.has(styleId = elm.tagName + '#' + hostRef.modeName)) {
      styleId = elm.tagName;
    }
  } else {
    styleId = elm.tagName;
  }

  if (styles.has(styleId)) {
    if (BUILD.shadowDom && elm.shadowRoot) {
      // we already know we're in a shadow dom
      // so shadow root is the container for these styles
      styleContainerNode = elm.shadowRoot as any;

    } else {
      // climb up the dom and see if we're in a shadow dom
      styleContainerNode = (elm as any).getRootNode();
      styleContainerNode = (styleContainerNode as any).host || (styleContainerNode as any).head;
    }

    appliedStyles = rootAppliedStyles.get(styleContainerNode);
    if (!appliedStyles) {
      rootAppliedStyles.set(styleContainerNode, appliedStyles = new Set());
    }

    if (!appliedStyles.has(styleId)) {
      dataStyles = styleContainerNode.querySelectorAll('[data-styles],[charset]');

      styleElm = doc.createElement('style');
      styleElm.innerHTML = styles.get(styleId);

      styleContainerNode.insertBefore(
        styleElm,
        (dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling) || styleContainerNode.firstChild
      );

      appliedStyles.add(styleId);
    }
  }
};


export const getElementScopeId = (scopeId: string, isHostElement?: boolean) => {
  return scopeId + (isHostElement ? '-h' : '-s');
};