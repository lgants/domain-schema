import DomainSchema, { Schema } from '@domain-schema/core';
import * as React from 'react';
import renderer from 'react-test-renderer';
import DomainReactForms, { FieldTypes } from '../';

describe('DomainFormik', () => {
  it('should generate simple form', () => {
    const schema = new DomainSchema(
      class extends Schema {
        public __ = { name: 'User' };
        public id = DomainSchema.Int;
        public buttons = {
          type: DomainReactForms.FormButtons,
          submit: {
            label: 'Submit'
          }
        };
        public username = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            label: 'Username',
            placeholder: 'name'
          },
          defaultValue: 'John'
        };
        public email = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'email',
            label: 'Email'
          }
        };
        public pass = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'password',
            label: 'Email'
          }
        };
        public isActive = {
          type: String,
          fieldType: FieldTypes.checkbox,
          input: {
            label: 'Is Active'
          },
          defaultValue: true
        };
      }
    );
    const form = new DomainReactForms(schema);
    const FormComponent = form.generateForm(() => null);
    const component = renderer.create(<FormComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should generate complex form', () => {
    class Profile extends Schema {
      public __ = { name: 'Profile' };
      public buttons = {
        type: DomainReactForms.FormButtons,
        submit: {
          label: 'Submit'
        }
      };
      public firstName = {
        type: String,
        fieldType: FieldTypes.input,
        input: {
          label: 'First Name'
        },
        required: {
          value: true,
          msg: 'Required First Name'
        }
      };
      public lastName = {
        type: String,
        fieldType: FieldTypes.input,
        input: {
          label: 'Last Name'
        },
        required: true
      };
    }
    const schema = new DomainSchema(
      class User extends Schema {
        public __ = { name: 'User' };
        public id = DomainSchema.Int;
        public buttons = {
          type: DomainReactForms.FormButtons,
          submit: {
            label: 'Submit'
          }
        };
        public username = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'text',
            name: 'name',
            label: 'Username'
          },
          defaultValue: 'User',
          required: true,
          validators: [
            value => {
              return value.length > 3 ? undefined : 'Must Be more than 3 characters';
            }
          ]
        };
        public email = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'email',
            label: 'Email',
            placeholder: 'User email'
          },
          required: true,
          email: true
        };
        public profile = {
          type: Profile
        };
        public password = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'password',
            label: 'Password'
          },
          required: true,
          min: 5
        };
        public passwordConfirmation = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            type: 'password',
            label: 'Password Confirmation'
          },
          matches: 'password'
        };
      }
    );
    const userForm = new DomainReactForms(schema);
    const FormComponent = userForm.generateForm(() => null);
    const component = renderer.create(<FormComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should generate form with custom field', () => {
    const MyComponent = props => {
      return (
        <div>
          <input name={props.name} placeholder={props.label} value={props.value} className={props.className} />
        </div>
      );
    };
    const schema = new DomainSchema(
      class User extends Schema {
        public __ = { name: 'User' };
        public id = DomainSchema.Int;
        public buttons = {
          type: DomainReactForms.FormButtons,
          submit: {
            label: 'Submit'
          }
        };
        public username = {
          type: String,
          fieldType: FieldTypes.input,
          input: {
            inputType: 'text',
            name: 'name',
            label: 'Username'
          },
          defaultValue: 'User'
        };
        public userfield = {
          type: String,
          fieldType: FieldTypes.custom,
          component: MyComponent,
          input: {
            name: 'myfield',
            label: 'User Field',
            className: 'my-awesome-field'
          },
          defaultValue: 'my field'
        };
      }
    );
    const userForm = new DomainReactForms(schema);
    const FormComponent = userForm.generateForm(() => null);
    const component = renderer.create(<FormComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});