export interface ElementCreatorParams {
  tag: string;
  classNames?: string[];
  attributes?: Record<string, string>;
  textContent?: string;
  listenersParams?: listenerParam[];
}

export interface listenerParam {
  event: string;
  callback: EventListenerOrEventListenerObject;
}

export interface IElementCreator {
  getElement(): HTMLElement;
  clearInnerHTML(): void;
  addInnerElement(...elements: (HTMLElement | IElementCreator)[]): void;
  setClasses(classNames: string[] | undefined): void;
  removeClasses(...classNames: string[]): void;
  setAttributes(attributes: Record<string, string> | undefined): void;
  removeAttribute(attribute: string): void;
  setTextContent(textContent: string | undefined): void;
  setListeners(listenersParams: listenerParam[] | undefined): void;
  removeListeners(...listenersParams: listenerParam[]): void;
}
