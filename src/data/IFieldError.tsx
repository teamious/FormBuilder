export interface IFieldError {
    error: boolean;
    errorMsg: string;
    details?: IFormError[];
};

export interface IFormError {
    [key: string]: IFieldError;
    length: any;
}