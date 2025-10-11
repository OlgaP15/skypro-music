import classNames from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  nameFilter: string;
  activeFilter: string | null;
  onClick: () => void;
}

export default function Button({ nameFilter, activeFilter, onClick }: ButtonProps) {
  return (
    <button
      className={classNames(styles.filter__button, {
        [styles.active]: activeFilter === nameFilter,
      })}
      onClick={onClick}
    >
      {nameFilter}
    </button>
  );
}
