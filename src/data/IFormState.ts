// The FormStatus is to represent FormInput status
export interface IFormState {
    [id: string]: IFieldState;
}

export interface IFieldState {
    error: string,
}

export interface INestedFieldState extends IFieldState {
    nestedStatus: Array<IFormState>;
}

export function isFormError(formStatus: IFormState) {
    const ids = Object.keys(formStatus)
    for (let id of ids) {
        let fieldStatus = formStatus[id];
        if (fieldStatus.error) {
            return true;
        }
    };

    return false;
}