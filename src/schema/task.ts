export interface TaskStoreType {
  requestPending: boolean;
  tasksInfo: TaskInfoType[];

}
export interface TaskInfoType {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "high" | "medium";
  assignedTo: string;
  dueDate: string;
}

export interface AddTaskActionType {
  type: string;
  payload: {
    task: TaskInfoType;
    successCallback: () => void;
  };
}

export interface UpdateTaskActionType {
  type: string;
  payload: {
    task: TaskInfoType;
  };
}

export interface FilterTaskStatusActionType {
  type: string;
  payload: {
    status:"all" | "pending" | "in-progress" | "completed";
  };
  successCallback?: () => void;
  }

  export interface HeaderProps {
    isAuthenticated: boolean;
    className?: string;
  
  }
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    editId?: number;
  }
  
  export interface TaskItemProps {
    task: TaskInfoType;
    onEditClick: (id:number) => void;
  }
  export interface ActionTaskProps {
    onClose: () => void;
    editId?: number;
  }
