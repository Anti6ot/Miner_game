import { useSelector } from "react-redux";
import { getTabRecords } from "../store/tabRecord";

const Raiting = () => {
  // получаем таблицу игроков
  const tabs = useSelector(getTabRecords());

  return (
    <div>
      <p>Raiting</p>
      <table>
        <thead>
          <tr>
            <td>Имя</td>
            <td>Очки</td>
          </tr>
        </thead>
        <tbody>
          {tabs ? (
            <tr>
              <td>{tabs.name}</td>
              <td>{tabs.points}</td>
            </tr>
          ) : (
            <tr>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Raiting;
