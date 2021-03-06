import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Component } from 'react';

export interface Props {
  attrs: any;
  checked?: boolean;
  component: any;
  fieldType?: string;
  name: string;
  onBlur?: any;
  onChange?: any;
  parent?: any;
  value?: string | number | boolean;
}

export default class Field extends Component<Props, {}> {
  public static contextTypes = {
    formik: PropTypes.object
  };

  constructor(public props: Props, public context: any) {
    super(props, context);
  }

  public render() {
    const { formik: { setFieldValue, handleChange, handleBlur, touched, errors } } = this.context;
    const { component, parent, attrs, fieldType, name, value } = this.props;
    const { onChange, onBlur, type } = attrs;

    const input = {
      ...attrs,
      onChange:
        parent && parent.name
          ? e =>
              setFieldValue(parent.name, {
                ...parent.value,
                [name]: e.target.value
              })
          : onChange ? onChange : handleChange,
      onBlur: onBlur ? onBlur : handleBlur,
      type: type || (fieldType === 'input' ? 'text' : fieldType),
      name,
      value: value || ''
    };

    const meta = {
      touched: touched[name],
      error: errors[name]
    };

    return React.createElement(component, {
      input,
      meta
    });
  }
}
