const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist can be converted to an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first() returns the first item in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last() returns the last item in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift() removes and returns the first item in the list', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop() removes and returns the last item in the list', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone() returns true if all items in the list are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
  });

  test('calling add() returns an error if you add an item that is not a Todo object', () => {
    expect(() => list.add(1)).toThrow();
    expect(() => list.add('hi')).toThrow();
    expect(() => list.add(new TodoList)).toThrow();
  });

  test('itemAt() returns the item at a given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(10)).toThrow();
  });

  test('markDoneAt() marks a todo at a given index as done', () => {
    expect(() => list.markDoneAt(10)).toThrow();
    
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt unmarks a todo at a given index', () => {
    expect(() => list.markUndoneAt(10)).toThrow();

    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone marks all todos in a list as done', () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes a todo at a specified index', () => {
    expect(() => list.removeAt(5)).toThrow();

    list.removeAt(1);

    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo3);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;  
    expect(list.toString()).toBe(string);
  });

  test('toString returns correct string representation of list when one item is marked done', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('toString returns correct string representation of list when all items are marked done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over every element in list', () => {
    let result = [];

    list.forEach((todo) => result.push(todo));
    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns a new TodoList with Todos filtered based on a callback', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    let doneItems = list.filter(todo => todo.isDone());

    expect(doneItems.toString()).toBe(newList.toString());
  });
});