import '@src/spa/view/button/button.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import { btnParams } from '@src/spa/view/button/types';
import View from '@src/spa/view/view';

// button properties
const BTN_TAG = 'button';
const BTN_CLASS_NAME = 'btn';
const BTN_ATTRIBUTES: Record<string, string> = { type: 'button' };

export default class ButtonView extends View {
  public constructor(properties: btnParams) {
    const params: ElementCreatorParams = {
      tag: BTN_TAG,
      classNames: [BTN_CLASS_NAME, ...properties.classNames],
      attributes: BTN_ATTRIBUTES,
      textContent: properties.textContent,
    };
    super(params);
  }
}
