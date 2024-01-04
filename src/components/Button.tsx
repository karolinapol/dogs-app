import classnames from 'classnames';

interface ButtonProps {
  type: 'button' | 'reset' | 'submit';
  color: 'yellow' | 'red' | 'blue';
  onClick?: () => void;
  text: string;
  additionalClasses?: string;
  isDisabled?: boolean;
  hasFixedWidth?: boolean;
  width?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = ({
  type = 'button',
  color = 'yellow',
  onClick,
  text,
  additionalClasses,
  isDisabled = false,
  hasFixedWidth = false,
  width = 'sm',
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      className={classnames(
        'button',
        hasFixedWidth && `button--${width}`,
        !isDisabled ? `button--${color}` : 'button--disabled',
        additionalClasses,
      )}
      type={type}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
