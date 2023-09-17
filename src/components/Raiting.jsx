import localStorageService from "../services/localStorage.service";

const Raiting = () => {
  const userName = localStorageService.getUserName();
  const userPoints = localStorageService.getUserPoints();
  return (
    <div>
      <p>Raiting</p>
      {userName}
      {userPoints}
    </div>
  );
};

export default Raiting;
