import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useCreateTask from "../hooks/useActionTask";
import CreateTask from "../components/CreateTask";

// Mock the useCreateTask hook
jest.mock("../hooks/useActionTask");

describe("CreateTask Component", () => {
  const mockUseCreateTask = {
    title: "Test Task",
    setTitle: jest.fn(),
    description: "Test Description",
    setDescription: jest.fn(),
    assignedTo: "User1",
    setAssignedTo: jest.fn(),
    dueDate: "2024-10-10",
    setDueDate: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
    userOptions: (
      <>
        <option value="User1">User1</option>
        <option value="User2">User2</option>
      </>
    ),
  };

  beforeEach(() => {
    (useCreateTask as jest.Mock).mockReturnValue(mockUseCreateTask);
  });

  it("renders the form with initial values", () => {
    render(<CreateTask isOpen={true} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } />);

    // Verify that the form fields are rendered with the correct initial values
    expect(screen.getByPlaceholderText("Enter task title")).toHaveValue("Test Task");
    expect(screen.getByPlaceholderText("Enter task description")).toHaveValue(
      "Test Description"
    );
    
    const select = screen.getByLabelText(/Assign To/i, { selector: 'select' });
    expect(select).toHaveValue("User1");

    expect(screen.getByDisplayValue("2024-10-10")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
  });

  it("updates the title when typed into the title input", () => {
    render(<CreateTask isOpen={true} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } />);

    const titleInput = screen.getByPlaceholderText("Enter task title");
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });

    // Verify that setTitle was called with the correct value
    expect(mockUseCreateTask.setTitle).toHaveBeenCalledWith("Updated Task");
  });

  it("updates the description when typed into the description input", () => {
    render(<CreateTask isOpen={true} onClose={() => {}} />);

    const descriptionInput = screen.getByPlaceholderText("Enter task description");
    fireEvent.change(descriptionInput, { target: { value: "Updated Description" } });

    // Verify that setDescription was called with the correct value
    expect(mockUseCreateTask.setDescription).toHaveBeenCalledWith(
      "Updated Description"
    );
  });

  it("updates the assignedTo value when selecting a new user", () => {
    render(<CreateTask isOpen={true} onClose={() => {}} />);

    const selectInput = screen.getByLabelText(/Assign To/i, { selector: 'select' });
    fireEvent.change(selectInput, { target: { value: "User2" } });

    // Verify that setAssignedTo was called with the correct value
    expect(mockUseCreateTask.setAssignedTo).toHaveBeenCalledWith("User2");
  });

 });
