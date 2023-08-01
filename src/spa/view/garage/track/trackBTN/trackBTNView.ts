import '@src/spa/view/garage/track/trackBTN/trackBTN.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';

// button properties
const BTN_TAG = 'button';
const BTN_CLASS_NAME = 'track-btn';
const BTN_ATTRIBUTES: Record<string, string> = { type: 'button' };

export default class TrackBTNView extends View {
  public constructor(btnName: string) {
    const params: ElementCreatorParams = {
      tag: BTN_TAG,
      classNames: [BTN_CLASS_NAME],
      attributes: BTN_ATTRIBUTES,
      textContent: btnName,
    };
    super(params);
  }
}
