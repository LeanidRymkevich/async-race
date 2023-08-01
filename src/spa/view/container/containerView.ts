import '@src/spa/view/container/container.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';

// container properties
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAME = 'container';

export default class ContainerView extends View {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: [CONTAINER_CLASS_NAME],
    };
    super(params);
  }
}
