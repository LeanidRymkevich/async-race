import '@src/spa/view/modal/modal.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { IModalView, modalParams } from '@src/spa/view/modal/types';

// modal properties
const MODAL_TAG = 'p';
const MODAL_CLASS_NAME = 'winner';

export default class ModalView extends View implements IModalView {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: MODAL_TAG,
      classNames: [MODAL_CLASS_NAME],
    };
    super(params);
  }

  public setModalText(params: modalParams): void {
    this.getViewCreator().setTextContent(`${params.carName} wins in ${params.time} seconds!`);
  }
}
