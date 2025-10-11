import styles from "./filterItem.module.css";

interface FilterItemProps {
  title: string;
  list: string[];
  onClose: () => void;
}

export default function FilterItem({ title, list }: FilterItemProps) {

  const getYearOptions = () => {
    return ["По умолчанию", "Сначала новые", "Сначала старые"];
  };

  const displayList = title === "Годы" ? getYearOptions() : list;

  return (
    <div className={styles.filter__popup}>
      <div className={styles.filter__listContainer}>
        <ul className={styles.filter__list}>
          {displayList.map((item) => (
            <li key={item} className={styles.filter__item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}