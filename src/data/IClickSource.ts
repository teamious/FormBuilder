export type IClickSource = React.ReactElement<IClickSourceProps> | React.ReactText;

export interface IClickSourceProps {
    onClick: React.MouseEventHandler<HTMLElement>;
    className: string;
}