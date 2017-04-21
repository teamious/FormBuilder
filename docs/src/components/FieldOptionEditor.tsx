import store from '../state/store';
import { connectFieldOptionEditor } from '../../../src/state/connectFieldOptionEditor';
import { FieldOptionEditor } from 'react-dynamic-formbuilder';

export default connectFieldOptionEditor(store)(FieldOptionEditor);