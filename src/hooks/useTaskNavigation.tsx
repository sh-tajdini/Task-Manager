import { useNavigate } from "react-router-dom";

const useTaskNavigation = () => {
  const navigate = useNavigate();

  const goToEditTask = (taskId: number) => {
    navigate(`/edit-task/${taskId}`);
  };

  return { goToEditTask };
};

export default useTaskNavigation;
