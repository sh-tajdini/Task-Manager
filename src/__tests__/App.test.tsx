import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
let store: any;

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App Component', () => {
  test('renders Login when not authenticated', () => {
    // Set up the store with isLoggedIn: false (user not authenticated)
    store = mockStore({
      user: { isLoggedIn: false },
      task: { tasksInfo: [] }, // Ensure tasksInfo is defined
    });

    renderApp();

    // Assert that the Login component is rendered
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).toBeNull();
    expect(screen.queryByTestId('task-list')).toBeNull();
  });

  test('renders Sidebar and TaskList when authenticated', () => {
    // Set up the store with isLoggedIn: true (user authenticated)
    store = mockStore({
      user: { isLoggedIn: true },
      task: { tasksInfo: [{ id: 1, title: 'Test Task' }] }, // Mock tasksInfo with a test task
    });

    renderApp();

    // Assert that the Sidebar and TaskList are rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
    expect(screen.queryByTestId('login')).toBeNull();
  });

  test('renders CreateTask modal when create task button is clicked', () => {
    // Set up the store with isLoggedIn: true (user authenticated)
    store = mockStore({
      user: { isLoggedIn: true },
      task: { tasksInfo: [] }, // Ensure tasksInfo is defined
    });

    renderApp();

    // Click the create task button
    const createTaskButton = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(createTaskButton);

    // Assert that the CreateTask modal is rendered
    expect(screen.getByTestId('create-task-modal')).toBeInTheDocument();
  });

  test('renders Header component', () => {
    // Set up the store with isLoggedIn: true (user authenticated)
    store = mockStore({
      user: { isLoggedIn: true },
      task: { tasksInfo: [] }, // Ensure tasksInfo is defined
    });

    renderApp();

    // Assert that the Header component is rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});