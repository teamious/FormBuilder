// The FormStatus is to represent FormInput status
export interface IFormState {
    [id: string]: IFieldState;
}

export interface IFieldState {
    error: any,
}

export interface INestedFieldState extends IFieldState {
    nestedStatus: Array<IFormState>;
}

export function isFormError(formStatus: IFormState) {
    if (!formStatus) {
        return false;
    }

    const ids = Object.keys(formStatus)
    for (let id of ids) {
        let fieldStatus = formStatus[id];
        if (fieldStatus && fieldStatus.error) {
            return true;
        }
    };

    return false;
}