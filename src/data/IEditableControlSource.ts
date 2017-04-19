export type IEditableControlSource = React.ReactElement<IEditableControlSourceProps> | React.ReactText;

export interface IEditableControlSourceProps {
    onClick: React.MouseEventHandler<HTMLElement>;
    className: string;
}