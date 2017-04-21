import store from '../state/store';
import { connectFormBuilder } from '../../../src/state/connectFormBuilder';
import { FormBuilder } from 'react-dynamic-formbuilder';

export default connectFormBuilder(store)(FormBuilder);