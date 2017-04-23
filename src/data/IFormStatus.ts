// The FormStatus is to represent FormInput status
export interface IFormStatus {
    [id: string]: IFieldStatus;
}

export interface IFieldStatus {
    error: string,
}

export interface INestedFieldStatus extends IFieldStatus {
    nestedStatus: Array<IFormStatus>;
}

export function isFormError(formStatus: IFormStatus) {
    Object.keys(formStatus).forEach((id: string) => {
        let fieldStatus = formStatus[id];
        if (fieldStatus.error) {
            return true;
        }
    });

    return false;
}