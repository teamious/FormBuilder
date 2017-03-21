import * as data from '../data'

export default class FormBuilderEvent {
    // fieldEditing is called when the user want to edit field options.
    fieldEditing: (field: data.IField, done: (field: data.IField) => void) => void;
}