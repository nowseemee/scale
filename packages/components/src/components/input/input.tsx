import { Component, Prop, Event, h, EventEmitter, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './input.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-input',
  shadow: true,
})
export class Input implements Base {
  /** (optional) Input text class */
  @Prop() customClass?: string = '';
  /** (optional) Input type */
  @Prop() type?:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label variant */
  @Prop() variant?: 'animated' | 'static' = 'animated';
  /** (optional) Input label */
  @Prop() label?: string = '';
  /** (optional) Input size */
  @Prop() size?: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input max length */
  @Prop() maxLength?: number;
  /** (optional) Input min length */
  @Prop() minLength?: number;
  /** (optional) Input placeHolder */
  @Prop() placeholder?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input counter */
  @Prop() counter?: boolean;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string;
  /** (optional) Input text event changed */
  @Event() changeEvent: EventEmitter<any>;
  @Event() focusEvent: EventEmitter<any>;
  @Event() blurEvent: EventEmitter<any>;
  @Event() keyDownEvent: EventEmitter<any>;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Input', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  handleChange(event) {
    this.value = event.target ? event.target.value : this.value;
    this.changeEvent.emit(event);
  }

  handleFocus(event) {
    this.focusEvent.emit(event);
  }

  handleBlur(event) {
    this.blurEvent.emit(event);
  }

  handleKeyDown(event) {
    this.keyDownEvent.emit(event);
  }

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          {!!this.label && this.variant === 'static' && (
            <label class="input__label">{this.label}</label>
          )}
          <input
            type={this.type}
            class={classNames('input__input', this.label && 'has-label')}
            value={this.value}
            name={this.name}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            onInput={event => this.handleChange(event)}
            onFocus={event => this.handleFocus(event)}
            onBlur={event => this.handleBlur(event)}
            onKeyDown={event => this.handleKeyDown(event)}
            placeholder={this.placeholder}
            disabled={this.disabled}
          ></input>
          {!!this.label && this.variant === 'animated' && (
            <label class="input__label">{this.label}</label>
          )}
          {(!!this.helperText || !!this.counter) && (
            <div class="input__meta">
              {!!this.helperText && (
                <div class="input__helper-text">{this.helperText}</div>
              )}
              {this.counter && (
                <div class="input__counter">
                  {!!this.value ? this.value.length : 0} / {this.maxLength}
                </div>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    const isAnimated =
      (!!this.placeholder || !!this.value) &&
      !!this.label &&
      this.variant === 'animated';
    return classNames(
      classes.input,
      this.customClass && this.customClass,
      this.type && classes[`input--type-${this.type}`],
      this.size && classes[`input--size-${this.size}`],
      this.variant && classes[`input--variant-${this.variant}`],
      this.disabled && classes[`input--disabled`],
      this.status && classes[`input--status-${this.status}`],
      isAnimated && 'animated'
    );
  }
}
