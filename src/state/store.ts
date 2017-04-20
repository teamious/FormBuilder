import { IFieldContext, IField, FieldRegistry } from '../data';

export interface ISubscriber {
    (): void
}

export interface FieldEditingHandler {
    (field: IField): void;
}

// createStore is a helper function for initializing
// the store.
export function createStore(props: IStoreProps) {
    return new Store(props);
}

export interface IStore {
    // subscribe pushes the subscriber into a list and is called
    // via notify() until unsubscribed.
    subscribe(subscriber: ISubscriber): void;

    // unsubscribe removes the subscriber.
    unsubscribe(subscriber: ISubscriber): void;

    // getFields returns the list of fields that is being developed.
    getFields(): IField[];

    // getEditingField returns the field that is selected for editing.
    getEditingField(): IField;

    // getEditingContext returns a structure that contains the fields
    // that are parent to the editing field.
    getEditingContext(): IFieldContext;

    // getRegistry returns the field registry.
    getRegistry(): FieldRegistry;

    // onChangeFields will change the internal state of the fields
    // any notify subscribers.
    onChangeFields(fields: IField[]): void;

    // onFieldEditing takes in the field and context selected for editing
    // and also keeps a reference to the done callback.
    onFieldEditing(field: IField, context: IFieldContext, done: FieldEditingHandler): void;

    // onFieldChanged should be called whenever the option editor has updated
    // a field. It will notify subscribers.
    onFieldChanged(field: IField): void;
}

export class Store implements IStore {
    // done is the callback that should be called once
    // the option editor has modified a field
    private done: FieldEditingHandler;

    // subscribers is a list of functions to call
    // when a change has been made to the state.
    private subscribers: ISubscriber[] = [];

    // registry is a field registry that can be consumed
    // by any components that need to lookup by type.
    private registry: FieldRegistry;

    // fields contains a list of fields for representing
    // the form.
    private fields: IField[] = [];

    // editingField is the field selected for editing.
    private editingField: IField = null;

    // editingContext holds list of fields the editingFields
    // are apart of.
    private editingContext: IFieldContext = {
        fields: []
    };

    constructor(props: IStoreProps) {
        const { registry } = props;
        this.registry = registry;
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
    }

    public getFields(): IField[] {
        return this.fields;
    }

    public getEditingField(): IField {
        return this.editingField;
    }

    public subscribe(subscriber: ISubscriber): void {
        this.subscribers.push(subscriber);
    }

    public unsubscribe(subscriber: ISubscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index >= 0) {
            this.subscribers.splice(index, 1);
        }
    }

    public getEditingContext(): IFieldContext {
        return this.editingContext;
    }

    public getRegistry(): FieldRegistry {
        return this.registry;
    }

    public onChangeFields(fields: IField[]): void {
        this.fields = fields;
        this.notify();
    }

    public onFieldEditing(field: IField, context: IFieldContext, done: FieldEditingHandler) {
        this.editingContext = context;
        this.editingField = field;
        this.done = done;
        this.notify();
    }

    public onFieldChanged(field: IField): void {
        this.editingField = field;
        this.done(field);
    }

    private notify(): void {
        this.subscribers.forEach(notify => notify());
    }
}

export interface IStoreProps {
    registry: FieldRegistry;
}