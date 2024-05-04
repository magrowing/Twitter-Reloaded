import { ReactNode } from 'react';

type ButtonProps = {
  btnType?: string;
  className?: string;
  onClick: () => void;
  children: ReactNode;
};

export default function Button({
  btnType,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
      {btnType && <span>{btnType}</span>}
    </button>
  );
}
