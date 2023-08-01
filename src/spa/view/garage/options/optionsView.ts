import '@src/spa/view/garage/options/options.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import { IOptionsView } from '@src/spa/view/garage/options/types';

// options wrapper properties
const OPTIONS_WRAPPER_TAG = 'div';
const OPTIONS_WRAPPER_CLASS = 'options';

// row properties
const OPTIONS_ROW_TAG = 'div';
const OPTIONS_ROW_CLASS = 'options__row';

// input properties
const INPUT_TAG = 'input';
const TEXT_INPUT_CLASS = 'options__text-input';
const COLOR_INPUT_CLASS = 'options__color-input';
const TEXT_INPUT_ATTRIBUTES = {
  type: 'text',
};
const COLOR_INPUT_ATTRIBUTES = {
  type: 'color',
  value: '#a5a2a2',
};

// buttons properties
const PRIMARY_BTN_CLASS = 'btn_primary';
const SECONDARY_BTN_CLASS = 'btn_secondary';
const CREATING_BTN_TEXT = 'create';
const UPDATING_BTN_TEXT = 'update';
const RACE_BTN_TEXT = 'race';
const RESET_BTN_TEXT = 'reset';
const GENERATE_BTN_TEXT = 'generate cars';

export default class OptionsView extends View implements IOptionsView {
  private readonly creatingTextInput: IElementCreator;
  private readonly updatingTextInput: IElementCreator;
  private readonly creatingColorInput: IElementCreator;
  private readonly updatingColorInput: IElementCreator;
  private readonly creatingBTN: IElementCreator;
  private readonly updatingBTN: IElementCreator;
  private readonly raceBTN: IElementCreator;
  private readonly resetBTN: IElementCreator;
  private readonly generateBTN: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: OPTIONS_WRAPPER_TAG,
      classNames: [OPTIONS_WRAPPER_CLASS],
    };
    super(params);
    this.creatingTextInput = this.createInput(TEXT_INPUT_ATTRIBUTES, TEXT_INPUT_CLASS);
    this.updatingTextInput = this.createInput(TEXT_INPUT_ATTRIBUTES, TEXT_INPUT_CLASS);
    this.creatingColorInput = this.createInput(COLOR_INPUT_ATTRIBUTES, COLOR_INPUT_CLASS);
    this.updatingColorInput = this.createInput(COLOR_INPUT_ATTRIBUTES, COLOR_INPUT_CLASS);
    this.creatingBTN = this.createBTN(CREATING_BTN_TEXT, SECONDARY_BTN_CLASS);
    this.updatingBTN = this.createBTN(UPDATING_BTN_TEXT, SECONDARY_BTN_CLASS);
    this.raceBTN = this.createBTN(RACE_BTN_TEXT, PRIMARY_BTN_CLASS);
    this.resetBTN = this.createBTN(RESET_BTN_TEXT, PRIMARY_BTN_CLASS);
    this.generateBTN = this.createBTN(GENERATE_BTN_TEXT, SECONDARY_BTN_CLASS);
    this.configureView();
  }

  public getCreatingTextInput(): IElementCreator {
    return this.creatingTextInput;
  }

  public getUpdatingTextInput(): IElementCreator {
    return this.updatingTextInput;
  }

  public getCreatingColorInput(): IElementCreator {
    return this.creatingColorInput;
  }

  public getUpdatingColorInput(): IElementCreator {
    return this.updatingColorInput;
  }

  public getCreatingBTN(): IElementCreator {
    return this.creatingBTN;
  }

  public getUpdatingBTN(): IElementCreator {
    return this.updatingBTN;
  }

  public getRaceBTN(): IElementCreator {
    return this.raceBTN;
  }

  public getResetBTN(): IElementCreator {
    return this.resetBTN;
  }

  public getGenerateBTN(): IElementCreator {
    return this.generateBTN;
  }

  private configureView(): void {
    const createRow: IElementCreator = this.createRow();
    const updateRow: IElementCreator = this.createRow();
    const btnRow: IElementCreator = this.createRow();

    this.resetBTN.setAttributes({ disabled: '' });

    createRow.addInnerElement(this.creatingTextInput, this.creatingColorInput, this.creatingBTN);
    updateRow.addInnerElement(this.updatingTextInput, this.updatingColorInput, this.updatingBTN);
    btnRow.addInnerElement(this.raceBTN, this.resetBTN, this.generateBTN);

    this.getViewCreator().addInnerElement(createRow, updateRow, btnRow);
  }

  private createRow(): IElementCreator {
    const rowParams: ElementCreatorParams = {
      tag: OPTIONS_ROW_TAG,
      classNames: [OPTIONS_ROW_CLASS],
    };
    const row: IElementCreator = new ElementCreator(rowParams);
    return row;
  }

  private createInput(inputAttributes: Record<string, string>, ...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: INPUT_TAG,
      classNames: classes,
      attributes: inputAttributes,
    };
    const input: IElementCreator = new ElementCreator(params);
    return input;
  }

  private createBTN(text: string, ...classes: string[]): IElementCreator {
    const params: btnParams = {
      textContent: text,
      classNames: classes,
    };
    return new ButtonView(params).getViewCreator();
  }
}
