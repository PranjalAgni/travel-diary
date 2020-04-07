As the requirements for JavaScript single-page applications have become increasingly complicated, our code must manage more state than ever before.

Redux is used mostly for application state management. To summarize it, Redux maintains the state of an entire application in a single immutable state tree (object), which can’t be changed directly.
3 principles of redux

Redux
1- Single source of truth
The state of your whole application is stored in an object tree within a single store.

2- State is read-only
The only way to change the state is to emit an action, an object describing what happened.

3- Pure functions are used to changed Redux Store.
To specify how the state tree is transformed by actions, you write pure reducers.

Basic Concepts
Actions
Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

Actions only describe what happened, but don't describe how the application's state changes.

Action Creators - Which are utility function to create actions

Reducers
Reducers specify how the application's state changes in response to actions sent to the store.

reducers are functions (pure) that take the current state of the application and an action and then return a new state.

Every reducer is responsible for its own part of the app’s state, and the state parameter is different for every reducer. The combineReducers() utility makes the file structure much easier to maintain.

Store
Store is the object that holds the application state and provides a few helper methods to access the state, dispatch actions and register listeners. The entire state is represented by a single store. Any action returns a new state via reducers. That makes Redux very simple and predictable.

The store has the following responsibilities:

- Holds application state;
- Allows access to state via getState();
- Allows state to be updated via dispatch(action);
- Registers listeners via subscribe(listener);
- Handles unregistering of listeners via the function returned by subscribe(listener).

Redux is a tiny library, but its contracts and APIs are carefully chosen to spawn an ecosystem of tools and extensions, and the community has created a wide variety of helpful addons, libraries, and tools. You don't need to use any of these addons to use Redux, but they can help make it easier to implement features and solve problems in your application.
