import MyCustomField from './MyCustomField';
import MyCustomFieldEditor from './MyCustomFieldEditor';
import { FieldRegistry } from 'form-builder'

const registry: FieldRegistry = {
    MyCustomField: {
        render: MyCustomField,
        editor: MyCustomFieldEditor,
    }
}