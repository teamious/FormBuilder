import store from '../state/store';
import { connectFieldSelector } from '../../../src/state/connectFieldSelector';
import { FieldSelector } from 'react-dynamic-formbuilder';

export default connectFieldSelector(store)(FieldSelector);